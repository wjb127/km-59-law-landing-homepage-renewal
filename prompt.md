# 크몽 랜딩페이지 자동 생성기 v2.1 (Refactoring UI Edition)

## 📋 [여기만 채워 ← 크몽 의뢰서 복붙존]

이 프로젝트 루트의 prd.md 파일을 읽어서 기획서로 사용해.
없으면 사용자에게 기획서 내용을 요청해.

---

## 🤖 [자동 실행 영역 - 건들지 마셈]

### 🎯 Phase 1: Planning & Analysis

**클로드야, 위 고객 요구사항 보고 다음 자동 분석:**

```typescript
interface ProjectAnalysis {
  // 1. Refactoring UI 기반 디자인 스타일 자동 매칭
  designStyle:
    | "balanced" // 균형잡힌, 중간 radius, SaaS/일반
    | "playful" // 큰 radius, 파스텔, 소비자용
    | "professional" // 작은 radius, 네이비, 엔터프라이즈
    | "elegant" // 세리프, 골드, 럭셔리
    | "bold" // 큰 타이포, 오렌지, 스타트업
    | "minimal" // 흑백, 최대 여백, 에이전시
    | "dark" // 다크모드, 네온, 개발자툴
    | "organic" // 그린, 세리프, 에코/웰니스
    | "gradient"; // 그라데이션, 글래스, 핀테크/AI

  // 2. 디자인 시스템 JSON 로드
  designSystemPath:
    | "~/landing-templates/design-systems/refactoring-ui-base.json" // 베이스
    | "~/landing-templates/design-systems/saas-modern.json"
    | "~/landing-templates/design-systems/ecommerce-clean.json"
    | "~/landing-templates/design-systems/healthcare-trust.json"
    | "~/landing-templates/design-systems/fintech-professional.json";

  // 3. 컬러 전략 (Refactoring UI: 050-900 스케일)
  colorStrategy: {
    primary: {
      "050": string; // 배경, 호버
      "100": string;
      "200": string; // 보더
      "300": string;
      "400": string; // 덜 중요한 텍스트
      "500": string; // 버튼, 링크
      "600": string; // 버튼 hover
      "700": string;
      "800": string; // 제목
      "900": string; // 본문 진한 텍스트
    };
    grey: {
      /* 같은 구조 */
    };
    accent: string;
  };

  // 4. Border Radius 전략 (브랜드 개성 결정)
  radiusStrategy: {
    personality: "professional" | "balanced" | "playful";
    scale: {
      sm: string; // 4-6px (professional) | 6-8px (balanced) | 8-12px (playful)
      md: string; // 6-8px | 8-12px | 12-16px
      lg: string; // 8-12px | 12-16px | 16-24px
      xl: string; // 12-16px | 16-20px | 24-32px
      full: string; // 9999px (pills)
    };
  };

  // 5. 톤앤매너 (기존 유지)
  tone: "professional" | "friendly" | "trendy" | "minimal" | "bold";

  // 6. 핵심 차별화 포인트
  uniqueSellingPoint: string[];
}
```

**Planning Mode 진입해서:**

1. 벤치마킹 3곳 디자인 트렌드 분석 (색감/레이아웃/CTA 위치)
2. 타겟 페르소나 기반 UX 플로우 설계
3. 전환율 높일 마이크로카피 전략 수립
4. **Refactoring UI 원칙 체크리스트 검토**

---

### 🎨 Phase 2: Refactoring UI 디자인 시스템 (핵심)

**CRITICAL: 아래 원칙 100% 준수**

#### 📐 1. 시각적 계층 구조 (Visual Hierarchy)

```typescript
// 크기만으로 계층 만들지 마라! 색상 + 굵기 + 크기 조합
const hierarchy = {
  // Primary (가장 중요): 크고 + 굵고 + 진함
  primary: {
    fontSize: "text-3xl md:text-5xl",
    fontWeight: "font-extrabold", // 800
    color: "text-grey-900", // 가장 진한 색
  },

  // Secondary (중요): 중간 + 중간굵기 + 중간색
  secondary: {
    fontSize: "text-lg md:text-xl",
    fontWeight: "font-semibold", // 600
    color: "text-grey-700",
  },

  // Tertiary (보조): 작고 + 일반 + 연함
  tertiary: {
    fontSize: "text-sm md:text-base",
    fontWeight: "font-normal", // 400
    color: "text-grey-500",
  },

  // Supporting (배경): 가장 연함
  supporting: {
    fontSize: "text-xs",
    fontWeight: "font-normal",
    color: "text-grey-400",
  },
};
```

#### 📏 2. 간격 시스템 (Spacing System)

```typescript
// 4px 또는 8px 기반 시스템 - 임의의 숫자 금지!
const spacing = {
  // 기본 스케일 (4px 기반)
  "space-1": "4px", // 0.25rem
  "space-2": "8px", // 0.5rem
  "space-3": "12px", // 0.75rem
  "space-4": "16px", // 1rem
  "space-5": "24px", // 1.5rem
  "space-6": "32px", // 2rem
  "space-7": "48px", // 3rem
  "space-8": "64px", // 4rem
  "space-9": "96px", // 6rem
  "space-10": "128px", // 8rem

  // 용도별 가이드
  usage: {
    "관련 요소 사이": "space-2 ~ space-4", // 8-16px
    "요소 그룹 사이": "space-5 ~ space-6", // 24-32px
    "섹션 사이": "space-7 ~ space-9", // 48-96px
    "컴포넌트 내부 패딩": "space-4 ~ space-6", // 16-32px
  },
};
```

#### 🎨 3. 색상 시스템 (Color System)

```typescript
// 모든 색상은 050-900 스케일로 정의
const colorSystem = {
  // Grey (필수) - 모든 프로젝트의 기본
  grey: {
    "050": "#F7FAFC", // 배경
    "100": "#EDF2F7", // 구분선, 호버 배경
    "200": "#E2E8F0", // 보더
    "300": "#CBD5E0", // 비활성 상태
    "400": "#A0AEC0", // placeholder, 아이콘
    "500": "#718096", // 부가 텍스트
    "600": "#4A5568", // secondary 텍스트
    "700": "#2D3748", // body 텍스트
    "800": "#1A202C", // heading
    "900": "#171923", // primary 텍스트
  },

  // Primary Color (업종별 자동 선택)
  // 같은 050-900 스케일로 생성
  primary: {
    /* 자동 생성 */
  },

  // 사용 가이드
  usage: {
    "050-200": "배경, 호버 상태, 보더",
    "300-400": "비활성, placeholder, 보조 아이콘",
    "500-600": "버튼, 링크, CTA",
    "700-900": "제목, 본문 텍스트",
  },
};
```

#### 🔲 4. Border Radius 전략

```typescript
// 브랜드 개성에 따른 radius 선택
const radiusStrategy = {
  // Professional (금융, 헬스케어, B2B)
  professional: {
    sm: "4px", // 버튼, 입력
    md: "6px", // 카드
    lg: "8px", // 모달
    xl: "12px", // 히어로 섹션
  },

  // Balanced (SaaS, 일반 서비스)
  balanced: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  // Playful (소비자앱, 소셜, 게임)
  playful: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  // 핵심 원칙: 큰 요소 = 큰 radius, 작은 요소 = 작은 radius
  rule: "버튼(sm) < 카드(md) < 모달(lg) < 히어로(xl)",
};
```

#### 🌓 5. 그림자 시스템 (Shadow System)

```typescript
// 일관된 그림자 스케일
const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.05)", // 카드, 입력 필드
  md: "0 4px 6px rgba(0,0,0,0.07)", // 드롭다운, 팝오버
  lg: "0 10px 15px rgba(0,0,0,0.1)", // 모달, 토스트
  xl: "0 20px 25px rgba(0,0,0,0.15)", // 풀스크린 오버레이

  // 브랜드 컬러 그림자 (버튼 호버용)
  primary: "0 10px 25px -5px rgba(PRIMARY_COLOR, 0.3)",

  // 사용 가이드
  usage: {
    sm: "살짝 떠있는 느낌 (카드 기본)",
    md: "명확한 분리 (드롭다운)",
    lg: "강한 초점 (모달)",
    xl: "최상위 레이어",
  },
};
```

#### ↕️ 6. 타이포그래피 (Typography)

```typescript
// 5-7개 크기로 제한
const typography = {
  sizes: {
    xs: "12px", // 캡션
    sm: "14px", // 보조 텍스트
    base: "16px", // 본문 (기본)
    lg: "18px", // 강조 본문
    xl: "20px", // 소제목
    "2xl": "24px", // 제목
    "3xl": "32px", // 대제목
    "4xl": "48px", // 히어로
  },

  // 중요: 줄 높이는 크기에 따라 다르게!
  lineHeight: {
    "본문 (14-18px)": "1.6-1.8",
    "제목 (24-32px)": "1.3-1.4",
    "대형 제목 (48px+)": "1.1-1.2",
  },

  // 굵기
  weights: {
    normal: 400, // 본문
    medium: 500, // 강조 본문
    semibold: 600, // 소제목
    bold: 700, // 제목
    extrabold: 800, // 히어로
  },
};
```

#### ✨ 7. 마무리 터치 (Finishing Touches)

```typescript
const finishingTouches = {
  // 호버 상태 - 모든 클릭 요소 필수
  hover: {
    button: "hover:brightness-105 hover:shadow-lg",
    card: "hover:-translate-y-1 hover:shadow-md",
    link: "hover:text-primary-600",
  },

  // 트랜지션 - 0.2-0.3s
  transition: {
    fast: "transition-all duration-150",
    normal: "transition-all duration-200",
    slow: "transition-all duration-300",
  },

  // 포커스 상태 - 접근성 필수
  focus: {
    ring: "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    outline: "focus:outline-none",
  },

  // 상태별 UI
  states: {
    loading: "스켈레톤 또는 스피너",
    empty: "친근한 빈 상태 메시지",
    error: "빨간색 보더 + 에러 메시지",
    success: "초록색 체크 + 성공 메시지",
  },
};
```

---

### ⚡️ Phase 3: 프로젝트 셋업 (자동)

```bash
# 프로젝트명 자동 생성: km-[번호]-[서비스명]-landing
# 예: km-55-fitness-landing

npx create-next-app@latest ${PROJECT_NAME} \
  --typescript --tailwind --app --eslint \
  --import-alias "@/*"

cd ${PROJECT_NAME}

# shadcn 초기화 (스타일: New York, 컬러: 자동 매칭)
npx shadcn@latest init -y

# 필수 패키지 일괄 설치
npm install -D \
  framer-motion \
  lucide-react \
  react-hook-form @hookform/resolvers/zod zod \
  class-variance-authority clsx tailwind-merge \
  @radix-ui/react-slot

# shadcn 컴포넌트 배칭
npx shadcn@latest add button card input badge separator accordion tabs
```

**폴더 구조 자동 생성:**

```
${PROJECT_NAME}/
├─ app/
│  ├─ layout.tsx          # ← 폰트 최적화 + 메타데이터
│  ├─ page.tsx            # ← 메인 조립 파일
│  └─ globals.css         # ← Refactoring UI 디자인 토큰
├─ components/
│  ├─ ui/                 # ← shadcn 자동 생성
│  └─ sections/           # ← 섹션 컴포넌트들
│     ├─ Hero.tsx
│     ├─ SocialProof.tsx
│     ├─ Features.tsx
│     ├─ HowItWorks.tsx   # (옵션)
│     ├─ Pricing.tsx      # (옵션)
│     ├─ Testimonials.tsx # (옵션)
│     ├─ CTA.tsx
│     └─ Footer.tsx
├─ lib/
│  ├─ utils.ts
│  ├─ constants.ts        # ← 고객 데이터 집중
│  └─ design-tokens.ts    # ← Refactoring UI 토큰
├─ public/
│  └─ images/
│     ├─ hero/
│     ├─ features/
│     └─ testimonials/
└─ docs/
   ├─ midjourney-prompts.md
   ├─ design-system.md
   └─ handoff-guide.md    # ← 2차 작업 가이드
```

---

### 🎨 Phase 4: globals.css 디자인 토큰 (Refactoring UI)

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ===== REFACTORING UI 디자인 토큰 ===== */

    /* Grey Scale (필수) */
    --grey-050: #f7fafc;
    --grey-100: #edf2f7;
    --grey-200: #e2e8f0;
    --grey-300: #cbd5e0;
    --grey-400: #a0aec0;
    --grey-500: #718096;
    --grey-600: #4a5568;
    --grey-700: #2d3748;
    --grey-800: #1a202c;
    --grey-900: #171923;

    /* Primary Color (업종별 자동 생성) */
    --primary-050: /* 자동 */;
    --primary-100: /* 자동 */;
    --primary-200: /* 자동 */;
    --primary-300: /* 자동 */;
    --primary-400: /* 자동 */;
    --primary-500: /* 자동 */;
    --primary-600: /* 자동 */;
    --primary-700: /* 자동 */;
    --primary-800: /* 자동 */;
    --primary-900: /* 자동 */;

    /* Spacing Scale (4px 기반) */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 48px;
    --space-8: 64px;
    --space-9: 96px;
    --space-10: 128px;

    /* Border Radius (브랜드에 따라 조정) */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

    /* Typography */
    --text-xs: 12px;
    --text-sm: 14px;
    --text-base: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 24px;
    --text-3xl: 32px;
    --text-4xl: 48px;

    /* Transitions */
    --transition-fast: 150ms;
    --transition-normal: 200ms;
    --transition-slow: 300ms;
  }
}
```

---

### 🔥 Phase 5: 컴포넌트 개발 (Refactoring UI 적용)

**각 섹션 개발 시 MUST-HAVE:**

#### ✨ 마이크로 인터랙션 체크리스트

```typescript
// Refactoring UI + 레딧 노하우 조합
const microInteractions = {
  // 1. 버튼 - 그림자 + 살짝 위로
  button: {
    base: "transition-all duration-200",
    hover: "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/20",
    active: "active:translate-y-0 active:shadow-md",
    focus: "focus:ring-2 focus:ring-primary-500/50 focus:outline-none",
  },

  // 2. 카드 - 그림자 증가 + 살짝 위로
  card: {
    base: "transition-all duration-200 shadow-sm",
    hover: "hover:-translate-y-1 hover:shadow-md hover:border-primary-200",
  },

  // 3. 아이콘 - 회전 + 색상 변화
  icon: {
    hover:
      "group-hover:rotate-6 group-hover:scale-110 group-hover:text-primary-500",
    transition: "transition-all duration-200",
  },

  // 4. 스크롤 애니메이션 (Framer Motion)
  scroll: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    stagger: {
      container: { staggerChildren: 0.1 },
      item: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    },
  },

  // 5. 숫자 카운트업
  countUp: "Framer Motion animate + useInView",
};
```

#### 📱 반응형 규칙 (모바일 퍼스트)

```typescript
const responsive = {
  // 375px~639px: Mobile
  mobile: {
    fontSize: "text-3xl",
    padding: "px-4 py-12",
    grid: "grid-cols-1",
    sectionGap: "space-y-12",
  },

  // 640px~767px: Large Mobile
  sm: {
    fontSize: "sm:text-4xl",
    padding: "sm:px-6 sm:py-14",
  },

  // 768px~1023px: Tablet
  md: {
    fontSize: "md:text-5xl",
    padding: "md:px-8 md:py-16",
    grid: "md:grid-cols-2",
    sectionGap: "md:space-y-16",
  },

  // 1024px~1279px: Desktop
  lg: {
    fontSize: "lg:text-6xl",
    padding: "lg:px-12 lg:py-20",
    grid: "lg:grid-cols-3",
    sectionGap: "lg:space-y-24",
  },

  // 1280px~: Large Desktop
  xl: {
    fontSize: "xl:text-7xl",
    padding: "xl:container xl:mx-auto",
  },
};
```

---

### 🖼️ Phase 6: 미드저니 프롬프트 자동 생성

**`/docs/midjourney-prompts.md` 파일 자동 생성 규칙:**

```markdown
# [회사명] 이미지 생성 가이드

생성일: [오늘 날짜]
업종: [업종]
타겟: [타겟 고객]
브랜드: [Primary #HEX], [Secondary #HEX]
분위기: [톤앤매너]
디자인 스타일: [balanced/playful/professional/등]

---

## 🎯 업종별 스타일 가이드

[업종]의 경우 이런 키워드 필수:

- 색감: [warm/cool/vibrant/muted]
- 스타일: [modern/classic/minimal/bold]
- 감정: [trust/energy/calm/innovative]

---

## 1. Hero Background (1920x1080)

### 프롬프트 A (추천)

[업종 특화 장면], [브랜드 컬러] color scheme, [타겟] perspective,
professional photography, clean composition, soft lighting,
depth of field, modern aesthetic, 8k, no text, no watermark
--ar 16:9 --v 6.1 --style raw --q 2

### 프롬프트 B (대안 - 추상적)

Abstract [업종 관련] shapes, [브랜드 컬러] gradient,
floating geometric elements, glassmorphism, soft shadows,
contemporary design, premium feel
--ar 16:9 --v 6.1 --style raw --q 2

---

## 2. Feature Icons/Illustrations (800x600)

[각 기능별 프롬프트 자동 생성]

---

## 3. Testimonial Profiles (400x400)

[타겟 페르소나 기반 프롬프트]

---

## 💡 프롬프트 작성 팁

### DO ✅

- 브랜드 컬러 HEX 코드 언급
- 업종 특화 키워드 포함
- "no text, no watermark" 필수
- 8k, high quality 지정

### DON'T ❌

- 텍스트 포함 요청
- 유명인 얼굴 특정
- 저작권 브랜드명
```

---

### 📊 Phase 7: SEO & Performance

```typescript
// app/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `[서비스명] - [핵심 메시지]`,
  description: `[타겟]을 위한 [USP]. [Pain Point 해결] [CTA].`,
  keywords: "[업종 키워드], [기능 키워드]...",

  openGraph: {
    title: "[서비스명]",
    description: "[120자 요약]",
    type: "website",
    url: "https://example.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "[서비스명] 대표 이미지",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "[서비스명]",
    description: "[120자 요약]",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
```

**이미지 최적화:**

```typescript
import Image from 'next/image';

// Hero 이미지 - priority로 우선 로드
<Image
  src="/images/hero/main.jpg"
  alt="[서비스명] 메인 비주얼"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// Feature 이미지 - lazy 로드
<Image
  src="/images/features/feature-1.jpg"
  alt="[기능1 설명]"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

### ✅ Phase 8: 검수 & 완료

**자동 체크리스트:**

```bash
# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build

# Lighthouse 자동 체크 (목표)
- Performance: 90+ (모바일), 95+ (데스크톱)
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

# 반응형 테스트
- iPhone SE (375px) ✓
- iPad (768px) ✓
- Desktop (1280px) ✓
- 4K (1920px) ✓

# Refactoring UI 체크리스트 ✓
- [ ] 시각적 계층 (크기+색상+굵기 조합)
- [ ] 일관된 간격 (4/8px 스케일만 사용)
- [ ] 색상 시스템 (050-900 스케일)
- [ ] 일관된 border-radius
- [ ] 그림자 시스템 (sm/md/lg/xl)
- [ ] 모든 호버 상태 적용
- [ ] 트랜지션 0.2-0.3s
- [ ] 포커스 스타일 (접근성)

# 인터랙션 체크
- 버튼 호버 ✓
- 카드 애니메이션 ✓
- 스크롤 페이드인 ✓
- 폼 유효성 검증 ✓
```

---

### 📦 결과물 구조

```
완료 후 제공 파일:

1. /프로젝트명/ (전체 소스코드)

2. /docs/
   ├─ midjourney-prompts.md      ← 이미지 생성 가이드
   ├─ design-system.md            ← Refactoring UI 토큰 정리
   ├─ component-guide.md          ← 컴포넌트 사용법
   └─ handoff-guide.md            ← 2차 작업 가이드

3. README.md (실행 방법)
   - npm install && npm run dev
   - vercel --prod
```

---

## 🚢 Phase 9: GitHub & Vercel 자동 배포

### 📤 GitHub 업로드 (자동)

**모든 개발 완료 후 자동 실행:**

```bash
# 1. 모든 파일 스테이징
git add -A

# 2. 커밋 (자동 생성 메시지)
git commit -m "$(cat <<'EOF'
feat: [서비스명] 랜딩페이지 MVP 완성

- Hero, Problem, Solution, Features, CTA, Footer 섹션 구현
- Refactoring UI 디자인 시스템 적용
- 마이크로 인터랙션 및 Framer Motion 애니메이션
- 완전 반응형 (모바일/태블릿/데스크톱)
- SEO 최적화 메타태그

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"

# 3. GitHub 레포 생성 + 푸시 (gh CLI)
gh repo create [레포명] --private \
  --description "[서비스명] 랜딩페이지" \
  --source=. --push
```

### 🚀 Vercel 배포 (자동)

**GitHub 푸시 완료 후 즉시 실행:**

```bash
# 프로덕션 배포 (승빈위 팀)
vercel --prod --scope seungbeen-wis-projects -y
```

### ⚙️ 배포 설정 자동화

**vercel.json 자동 생성 (프로젝트 루트):**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["icn1"],
  "env": {
    "GOOGLE_SHEETS_ID": "@google-sheets-id",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL": "@google-service-email",
    "GOOGLE_PRIVATE_KEY": "@google-private-key"
  }
}
```

### 🔗 배포 완료 후 출력

```
## 배포 완료! 🎉

### GitHub
https://github.com/wjb127/[repo-name]

### Vercel Production
https://[project-name].vercel.app

### 다음 단계
1. 커스텀 도메인 연결 (Vercel Dashboard)
2. 환경변수 설정 (Google Sheets API)
3. 클라이언트 전달
```

---

## 🚀 실행 명령 (원샷)

```
클로드야, 위에 [고객 요구사항] 보고 Planning Mode로 분석부터 시작해서 완성까지 쭉 진행해줘.

특히:
1. 벤치마킹 3곳 크롤링해서 디자인 트렌드 파악
2. Refactoring UI 원칙 100% 적용 (시각적 계층, 간격, 색상, radius, 그림자)
3. 업종 맞는 디자인 스타일 자동 선택
4. 브랜드 컬러 없으면 050-900 스케일로 자동 생성
5. 마이크로 인터랙션 퀄리티 높게
6. 미드저니 프롬프트 업종 특화로
7. 모바일 반응형 완벽하게
8. GitHub: private 레포로 생성
9. Vercel: seungbeen-wis-projects 팀으로 배포

끝나면 GitHub URL, Vercel URL 알려줘!
```

---

## 🎯 2차 작업 업그레이드 (별도 계약)

1차 시안 마음에 들면 추가 가능한 것들:

```
[ ] Supabase DB 연동 (폼 제출 저장)
[ ] 이메일 알림 (Resend/Nodemailer)
[ ] 관리자 대시보드
[ ] Google Analytics 4
[ ] 카카오톡 상담 연동
[ ] 결제 시스템 (Toss/Stripe)
[ ] 다국어 지원 (i18n)
[ ] CMS 연동 (Notion/Contentful)
[ ] A/B 테스팅 설정
[ ] 커스텀 도메인 + HTTPS
[ ] 실제 이미지 교체 작업
```

---

## 🔄 재배포 명령 (수정 후)

```
클로드야, 수정사항 반영해서 다시 배포해줘:
1. 변경사항 커밋
2. GitHub 푸시
3. Vercel 재배포

커밋 메시지: "[수정 내용 요약]"
```

---

## 📚 참고: Refactoring UI 디자인 시스템 경로

```bash
# 이 맥북에서 사용 가능한 디자인 시스템
~/landing-templates/design-systems/refactoring-ui-base.json  # 베이스 토큰
~/landing-templates/design-systems/saas-modern.json
~/landing-templates/design-systems/ecommerce-clean.json
~/landing-templates/design-systems/healthcare-trust.json
~/landing-templates/design-systems/fintech-professional.json

# Refactoring UI 갤러리 예제
~/Project/refactoring-ui-practice/nextjs-gallery/src/app/  # 9가지 스타일 예제
```
