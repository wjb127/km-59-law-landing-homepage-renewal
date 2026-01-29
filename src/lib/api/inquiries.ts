import { InquiryCreatePayload } from '@/types';

export async function submitInquiry(
  data: InquiryCreatePayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.message || '문의 등록에 실패했습니다.' };
    }

    return { success: true };
  } catch {
    return { success: false, error: '네트워크 오류가 발생했습니다.' };
  }
}
