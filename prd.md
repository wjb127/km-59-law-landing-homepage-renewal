# 법무법인 성진 홈페이지 리뉴얼 PRD

## 1. 프로젝트 개요

### 1.1 프로젝트명
법무법인 성진 공식 웹사이트 리뉴얼

### 1.2 예산
**77만원** (MVP 수준)

### 1.3 목표
- 레퍼런스 사이트(법무법인 신결)의 핵심 기능만 벤치마킹
- 모바일/PC 반응형 웹 구현
- Supabase Studio를 활용한 간편 콘텐츠 관리

### 1.4 타겟 유저
- 법률적 도움이 필요한 잠재 의뢰인

### 1.5 참고 사이트
- https://법무법인신결.com/

---

## 2. 기술 스택

| 구분 | 기술 |
|------|------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **UI** | shadcn/ui |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Storage** | Supabase Storage |
| **Deployment** | Vercel |
| **Map** | 카카오맵 API |

---

## 3. 사이트맵 (간소화)

```
사용자 페이지
├── 메인 (/)
├── 법인 소개 (/about)
├── 구성원 (/members)
│   └── 변호사 상세 (/members/[id])
├── 업무분야 (/practice)
│   └── 분야 상세 (/practice/[slug])
├── 성공사례 (/cases)
│   └── 사례 상세 (/cases/[id])
├── 의뢰인 후기 (/reviews)
├── 상담신청 (/consultation)
└── 오시는 길 (/location)

관리자
└── Supabase Studio (별도 개발 X)
```

> **관리자 페이지**: 별도 개발 없이 **Supabase Studio**에서 직접 데이터 관리
> (테이블 CRUD, 이미지 업로드 모두 가능)

---

## 4. 디자인 가이드라인

### 4.1 컬러
| 용도 | HEX |
|------|-----|
| 메인 (네이비) | `#1a365d` |
| 포인트 (골드) | `#d69e2e` |
| 배경 | `#ffffff` |
| 텍스트 | `#1a202c` |

### 4.2 폰트
- **Pretendard** (본문)
- 웹폰트 CDN 사용

---

## 5. 페이지별 기능 (MVP)

### 5.1 메인 페이지 (/)

| 섹션 | 설명 |
|------|------|
| 히어로 | 배경 이미지 + 슬로건 + CTA 버튼 |
| 핵심 수치 | 누적 상담, 사례 수 (카운팅 애니메이션) |
| 구성원 | 대표 변호사 3-4명 카드 |
| 업무분야 | 아이콘 + 분야명 그리드 (4-6개) |
| 성공사례 | 최신 3-4건 카드 |
| 후기 | 최신 3-4건 슬라이더 |
| 상담폼 | 간편 상담 신청 (이름, 연락처, 내용) |
| 퀵버튼 | 전화/카카오톡 Floating 버튼 |

### 5.2 법인 소개 (/about)
- 법인 비전/철학 텍스트
- 사무실 이미지 1-2장

### 5.3 구성원 (/members)
- 변호사 카드 그리드 (사진, 이름, 직위, 전문분야)
- 상세 페이지: 학력, 경력, 주요 실적

### 5.4 업무분야 (/practice)
- 분야 카드 그리드
- 상세 페이지: 분야 설명 + 관련 사례 링크

### 5.5 성공사례 (/cases)
- 카드 목록 (분야 태그, 제목, 결과)
- 분야별 필터 (탭 형식)
- 상세 페이지: 사건 개요, 결과

### 5.6 의뢰인 후기 (/reviews)
- 후기 카드 목록
- 별점, 내용, 담당 변호사
- (변호사별 필터는 쿼리스트링으로 간단 구현)

### 5.7 상담신청 (/consultation)
- 폼: 이름, 연락처, 분야 선택, 내용, 개인정보 동의
- 제출 시 Supabase에 저장
- 완료 메시지 표시

### 5.8 오시는 길 (/location)
- 카카오맵 임베드
- 주소, 전화번호, 영업시간
- 교통편 안내 텍스트

---

## 6. 관리 방식

### Supabase Studio 활용 (별도 관리자 페이지 개발 X)

| 관리 항목 | 방법 |
|----------|------|
| 변호사 추가/수정 | Supabase Table Editor |
| 성공사례 등록 | Supabase Table Editor |
| 후기 등록 | Supabase Table Editor |
| 이미지 업로드 | Supabase Storage |
| 상담 내역 확인 | Supabase Table Editor |
| 사이트 설정 | settings 테이블에서 JSON 수정 |

> **장점**: 개발 비용 절감, Supabase 무료 플랜으로 충분
> **사용법**: 간단한 매뉴얼 문서 제공

---

## 7. 데이터베이스 스키마

### 7.1 members (구성원)
```sql
create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,  -- 대표변호사, 소속변호사
  photo_url text,
  specialties text[],      -- 전문분야 배열
  education text,          -- 학력
  career text,             -- 경력
  achievements text,       -- 주요 실적
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

### 7.2 practice_areas (업무분야)
```sql
create table practice_areas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  icon text,               -- 아이콘 이름 or URL
  description text,
  content text,            -- 상세 내용
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);
```

### 7.3 cases (성공사례)
```sql
create table cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  area_id uuid references practice_areas(id),
  member_id uuid references members(id),
  result_summary text,     -- 무죄 판결, 합의 성사 등
  overview text,           -- 사건 개요
  result text,             -- 결과 상세
  thumbnail_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);
```

### 7.4 reviews (후기)
```sql
create table reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  rating int check (rating >= 1 and rating <= 5),
  content text not null,
  area_id uuid references practice_areas(id),
  member_id uuid references members(id),
  is_published boolean default true,
  created_at timestamptz default now()
);
```

### 7.5 consultations (상담 신청)
```sql
create table consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  area text,
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);
```

### 7.6 settings (사이트 설정)
```sql
create table settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- 초기 데이터 예시
insert into settings (key, value) values
('site_info', '{"name": "법무법인 성진", "phone": "02-XXX-XXXX", "address": "서울시...", "kakao_link": "https://..."}'),
('hero', '{"title": "당신의 권리를 지켜드립니다", "subtitle": "...", "image_url": "..."}'),
('stats', '{"consultations": 5000, "cases": 1000, "lawyers": 5, "years": 15}');
```

---

## 8. 주요 기능 구현

### 8.1 카운팅 애니메이션
```tsx
// Intersection Observer + 숫자 애니메이션
// framer-motion 또는 간단한 커스텀 훅으로 구현
```

### 8.2 퀵 버튼 (Floating)
```tsx
// 우측 하단 고정 버튼
// 전화 연결, 카카오톡 채널 링크
```

### 8.3 반응형
- Tailwind CSS 브레이크포인트 활용
- Mobile First 접근

### 8.4 SEO
- Next.js Metadata API 활용
- 페이지별 동적 메타 태그
- sitemap.xml, robots.txt 자동 생성

---

## 9. 제외 기능 (예산 절감)

| 기능 | 대안 |
|------|------|
| ~~관리자 페이지 개발~~ | Supabase Studio 사용 |
| ~~방문자 통계~~ | Google Analytics 무료 연동 |
| ~~이메일/문자 알림~~ | Supabase에서 직접 확인 |
| ~~팝업 관리~~ | 필요시 코드에서 하드코딩 |
| ~~WYSIWYG 에디터~~ | 일반 텍스트 또는 마크다운 |
| ~~드래그앤드롭 정렬~~ | display_order 숫자로 수동 관리 |
| ~~엑셀 다운로드~~ | Supabase에서 CSV 내보내기 |
| ~~FAQ 페이지~~ | 필요시 추후 추가 |
| ~~뉴스/공지사항~~ | 필요시 추후 추가 |

---

## 10. 폴더 구조

```
src/
├── app/
│   ├── page.tsx                 # 메인
│   ├── about/page.tsx           # 법인 소개
│   ├── members/
│   │   ├── page.tsx             # 목록
│   │   └── [id]/page.tsx        # 상세
│   ├── practice/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── cases/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── reviews/page.tsx
│   ├── consultation/page.tsx
│   ├── location/page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingButtons.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── MembersSection.tsx
│   │   ├── PracticeSection.tsx
│   │   ├── CasesSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   └── ConsultationForm.tsx
│   └── ui/                      # shadcn/ui 컴포넌트
├── lib/
│   ├── supabase.ts              # Supabase 클라이언트
│   └── utils.ts
└── types/
    └── index.ts                 # 타입 정의
```

---

## 11. 개발 일정

| 단계 | 기간 | 내용 |
|------|------|------|
| 환경 설정 | 1일 | Next.js, Supabase, Vercel 세팅 |
| DB 구축 | 1일 | 테이블 생성, 초기 데이터 |
| 메인 페이지 | 2일 | 히어로, 섹션들, 상담폼 |
| 서브 페이지 | 3일 | 구성원, 업무분야, 성공사례, 후기 |
| 기타 페이지 | 1일 | 법인소개, 오시는길, 상담신청 |
| 반응형/SEO | 1일 | 모바일 최적화, 메타태그 |
| 테스트/배포 | 1일 | 버그 수정, Vercel 배포 |
| **총** | **10일** | |

---

## 12. 체크리스트

### 필수
- [ ] 메인 페이지 (히어로, 수치 애니메이션, 섹션들)
- [ ] 구성원 목록/상세
- [ ] 업무분야 목록/상세
- [ ] 성공사례 목록/상세 + 분야 필터
- [ ] 후기 목록 (변호사별 필터)
- [ ] 상담 신청 폼
- [ ] 오시는 길 (카카오맵)
- [ ] 퀵버튼 (전화, 카카오톡)
- [ ] 반응형 (PC/모바일)
- [ ] SEO 기본 설정

### 선택 (여유 시)
- [ ] 페이지 전환 애니메이션
- [ ] 이미지 최적화 (blur placeholder)
- [ ] 다크모드

---

## 13. 납품물

1. **소스코드** - GitHub 저장소
2. **배포된 사이트** - Vercel URL + 커스텀 도메인 연결
3. **Supabase 관리 매뉴얼** - 콘텐츠 추가/수정 방법 문서 (1-2페이지)

---

## 14. 비용 구조

| 항목 | 비용 |
|------|------|
| 개발비 | 77만원 |
| Supabase | 무료 (Free tier) |
| Vercel | 무료 (Hobby) |
| 도메인 | 별도 (연 1-2만원) |
| **월 유지비** | **0원** |

---

## 15. 향후 확장 (추가 견적)

필요시 별도 견적으로 추가 가능:
- 관리자 페이지 UI 개발
- 실시간 채팅 상담
- 팝업/배너 관리
- 블로그/칼럼 기능
- 상담 알림 (이메일/문자)
