-- ============================================
-- 법무법인 성진 홈페이지 Supabase 스키마
-- 모든 테이블에 kmm59_ 접두사 적용
-- Supabase SQL Editor에서 실행하세요
-- ============================================

-- 1. 문의 (Inquiries)
CREATE TABLE IF NOT EXISTS kmm59_inquiries (
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

CREATE INDEX IF NOT EXISTS idx_kmm59_inquiries_site_id ON kmm59_inquiries(site_id);
CREATE INDEX IF NOT EXISTS idx_kmm59_inquiries_created_at ON kmm59_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kmm59_inquiries_is_read ON kmm59_inquiries(is_read);

ALTER TABLE kmm59_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kmm59_inquiries_insert"
  ON kmm59_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "kmm59_inquiries_select"
  ON kmm59_inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "kmm59_inquiries_update"
  ON kmm59_inquiries FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "kmm59_inquiries_delete"
  ON kmm59_inquiries FOR DELETE
  TO authenticated
  USING (true);


-- ============================================
-- 2차 구현용 테이블
-- ============================================

-- 2. 구성원 (Members)
CREATE TABLE IF NOT EXISTS kmm59_members (
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

CREATE INDEX IF NOT EXISTS idx_kmm59_members_site_id ON kmm59_members(site_id);

ALTER TABLE kmm59_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kmm59_members_public_read"
  ON kmm59_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "kmm59_members_admin_all"
  ON kmm59_members FOR ALL
  TO authenticated
  USING (true);


-- 3. 업무분야 (Practice Areas)
CREATE TABLE IF NOT EXISTS kmm59_practice_areas (
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

CREATE INDEX IF NOT EXISTS idx_kmm59_practice_areas_site_id ON kmm59_practice_areas(site_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_kmm59_practice_areas_slug ON kmm59_practice_areas(site_id, slug);

ALTER TABLE kmm59_practice_areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kmm59_practice_areas_public_read"
  ON kmm59_practice_areas FOR SELECT
  USING (is_active = true);

CREATE POLICY "kmm59_practice_areas_admin_all"
  ON kmm59_practice_areas FOR ALL
  TO authenticated
  USING (true);


-- 4. 성공사례 (Cases)
CREATE TABLE IF NOT EXISTS kmm59_cases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  title text NOT NULL,
  area_id uuid REFERENCES kmm59_practice_areas(id) ON DELETE SET NULL,
  area_name text,
  member_id uuid REFERENCES kmm59_members(id) ON DELETE SET NULL,
  member_name text,
  result_summary text,
  overview text,
  result text,
  thumbnail_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kmm59_cases_site_id ON kmm59_cases(site_id);

ALTER TABLE kmm59_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kmm59_cases_public_read"
  ON kmm59_cases FOR SELECT
  USING (is_published = true);

CREATE POLICY "kmm59_cases_admin_all"
  ON kmm59_cases FOR ALL
  TO authenticated
  USING (true);


-- 5. 의뢰인 후기 (Reviews)
CREATE TABLE IF NOT EXISTS kmm59_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id uuid NOT NULL,
  author_name text NOT NULL,
  rating int DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  area_id uuid REFERENCES kmm59_practice_areas(id) ON DELETE SET NULL,
  area_name text,
  member_id uuid REFERENCES kmm59_members(id) ON DELETE SET NULL,
  member_name text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_kmm59_reviews_site_id ON kmm59_reviews(site_id);

ALTER TABLE kmm59_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kmm59_reviews_public_read"
  ON kmm59_reviews FOR SELECT
  USING (is_published = true);

CREATE POLICY "kmm59_reviews_admin_all"
  ON kmm59_reviews FOR ALL
  TO authenticated
  USING (true);


-- 6. 사이트 설정 (Site Settings)
CREATE TABLE IF NOT EXISTS kmm59_site_settings (
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

ALTER TABLE kmm59_site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "kmm59_site_settings_public_read"
  ON kmm59_site_settings FOR SELECT
  USING (true);

CREATE POLICY "kmm59_site_settings_admin_all"
  ON kmm59_site_settings FOR ALL
  TO authenticated
  USING (true);


-- ============================================
-- 관리자 계정 생성
-- Supabase Dashboard > Authentication > Users > Add user
-- Email: admin@seongjin.law
-- Password: (원하는 비밀번호)
-- ============================================

-- ============================================
-- Storage 버킷 (이미지 업로드용, 2차 구현)
-- ============================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('kmm59-images', 'kmm59-images', true);
