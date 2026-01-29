// 구성원 타입
export interface Member {
  id: string;
  name: string;
  position: string;
  photoUrl: string;
  specialties: string[];
  education: string;
  career: string;
  achievements: string;
  email?: string;
  displayOrder: number;
  isActive: boolean;
}

// 업무분야 타입
export interface PracticeArea {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  content: string;
  displayOrder: number;
  isActive: boolean;
}

// 성공사례 타입
export interface Case {
  id: string;
  title: string;
  areaId: string;
  areaName: string;
  memberId?: string;
  memberName?: string;
  resultSummary: string;
  overview: string;
  result: string;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

// 후기 타입
export interface Review {
  id: string;
  authorName: string;
  rating: number;
  content: string;
  areaId?: string;
  areaName?: string;
  memberId?: string;
  memberName?: string;
  isPublished: boolean;
  createdAt: string;
}

// 상담 신청 타입
export interface Consultation {
  id?: string;
  name: string;
  phone: string;
  area?: string;
  content: string;
  isRead?: boolean;
  createdAt?: string;
}

// 사이트 설정 타입
export interface SiteInfo {
  name: string;
  phone: string;
  fax?: string;
  email?: string;
  address: string;
  addressDetail?: string;
  businessHours: string;
  kakaoLink: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface StatsSettings {
  consultations: number;
  cases: number;
  lawyers: number;
  years: number;
}

// rls_inquiries 테이블 타입
export interface Inquiry {
  id: string;
  site_id: string;
  is_read: boolean;
  created_at: string;
  name: string | null;
  email: string | null;
  message: string | null;
  phone: string | null;
  parent_phone: string | null;
  lead_type: string | null;
  status: string | null;
  custom_fields: Record<string, unknown> | null;
  utm_source: string | null;
}

export interface InquiryCreatePayload {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  lead_type?: string;
  custom_fields?: Record<string, unknown>;
  utm_source?: string;
}
