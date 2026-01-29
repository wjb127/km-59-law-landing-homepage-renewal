-- ============================================
-- 법무법인 성진 홈페이지 Supabase 스키마
-- Supabase SQL Editor에서 실행하세요
-- ============================================

-- 1. rls_inquiries 테이블 (이미 존재하면 스킵)
-- 공유 테이블이므로 site_id로 구분
CREATE TABLE IF NOT EXISTS rls_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  name text,
  email text,
  phone text,
  parent_phone text,
  message text,
  lead_type text DEFAULT 'consultation',
  status text DEFAULT 'pending',
  is_read boolean DEFAULT false,
  custom_fields jsonb,
  utm_source text,
  created_at timestamptz DEFAULT now()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_rls_inquiries_site_id ON rls_inquiries(site_id);
CREATE INDEX IF NOT EXISTS idx_rls_inquiries_created_at ON rls_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rls_inquiries_is_read ON rls_inquiries(is_read);

-- RLS 활성화
ALTER TABLE rls_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 비인증 사용자도 INSERT 가능 (상담 신청)
CREATE POLICY IF NOT EXISTS "Anyone can insert inquiries"
  ON rls_inquiries FOR INSERT
  WITH CHECK (true);

-- RLS 정책: 인증된 사용자만 SELECT 가능
CREATE POLICY IF NOT EXISTS "Authenticated users can select inquiries"
  ON rls_inquiries FOR SELECT
  TO authenticated
  USING (true);

-- RLS 정책: 인증된 사용자만 UPDATE 가능
CREATE POLICY IF NOT EXISTS "Authenticated users can update inquiries"
  ON rls_inquiries FOR UPDATE
  TO authenticated
  USING (true);

-- RLS 정책: 인증된 사용자만 DELETE 가능
CREATE POLICY IF NOT EXISTS "Authenticated users can delete inquiries"
  ON rls_inquiries FOR DELETE
  TO authenticated
  USING (true);


-- ============================================
-- 2차 구현용 테이블 (필요시 실행)
-- ============================================

-- 2. 구성원 (Members)
CREATE TABLE IF NOT EXISTS members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  name text NOT NULL,
  position text NOT NULL,
  photo_url text,
  specialties text[] DEFAULT '{}',
  education text,
  career text,
  achievements text,
  email text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_members_site_id ON members(site_id);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read active members"
  ON members FOR SELECT
  USING (is_active = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage members"
  ON members FOR ALL
  TO authenticated
  USING (true);


-- 3. 업무분야 (Practice Areas)
CREATE TABLE IF NOT EXISTS practice_areas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  icon text,
  description text,
  content text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_practice_areas_site_id ON practice_areas(site_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_practice_areas_slug ON practice_areas(site_id, slug);

ALTER TABLE practice_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read active practice areas"
  ON practice_areas FOR SELECT
  USING (is_active = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage practice areas"
  ON practice_areas FOR ALL
  TO authenticated
  USING (true);


-- 4. 성공사례 (Cases)
CREATE TABLE IF NOT EXISTS cases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  title text NOT NULL,
  area_id uuid REFERENCES practice_areas(id) ON DELETE SET NULL,
  area_name text,
  member_id uuid REFERENCES members(id) ON DELETE SET NULL,
  member_name text,
  result_summary text,
  overview text,
  result text,
  thumbnail_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cases_site_id ON cases(site_id);

ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read published cases"
  ON cases FOR SELECT
  USING (is_published = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage cases"
  ON cases FOR ALL
  TO authenticated
  USING (true);


-- 5. 의뢰인 후기 (Reviews)
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  author_name text NOT NULL,
  rating int DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  area_id uuid REFERENCES practice_areas(id) ON DELETE SET NULL,
  area_name text,
  member_id uuid REFERENCES members(id) ON DELETE SET NULL,
  member_name text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_site_id ON reviews(site_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read published reviews"
  ON reviews FOR SELECT
  USING (is_published = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (true);


-- 6. 사이트 설정 (Site Settings)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL UNIQUE,
  name text DEFAULT '법무법인 성진',
  phone text,
  fax text,
  email text,
  address text,
  address_detail text,
  business_hours text,
  kakao_link text,
  hero_title text,
  hero_subtitle text,
  hero_image_url text,
  stats_consultations int DEFAULT 0,
  stats_cases int DEFAULT 0,
  stats_lawyers int DEFAULT 0,
  stats_years int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Anyone can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true);


-- ============================================
-- 관리자 계정 생성 (Supabase Auth)
-- Supabase Dashboard > Authentication > Users 에서 생성하거나,
-- 아래 SQL 사용 (비밀번호는 대시보드에서 변경 권장)
-- ============================================
-- 참고: Supabase Auth 유저는 SQL이 아닌 대시보드에서 생성하는 것을 권장합니다.
-- Dashboard > Authentication > Users > Add user
-- Email: admin@seongjin.law
-- Password: (원하는 비밀번호)


-- ============================================
-- Storage 버킷 (이미지 업로드용, 2차 구현)
-- ============================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('site-images', 'site-images', true);
