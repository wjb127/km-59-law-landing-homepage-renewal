'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitInquiry } from '@/lib/api/inquiries';
import { toast } from 'sonner';

export default function QuickConsultBar() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast.error('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    const result = await submitInquiry({
      name: formData.name,
      phone: formData.phone,
      message: '빠른 상담 요청',
      lead_type: 'quick_bar',
    });

    if (!result.success) {
      toast.error(result.error || '상담 신청에 실패했습니다.');
      setIsSubmitting(false);
      return;
    }

    toast.success('상담 신청이 완료되었습니다. 빠른 시간 내에 연락드리겠습니다.');
    setFormData({ name: '', phone: '' });
    setAgreed(false);
    setIsSubmitting(false);
  };

  return (
    <section className="bg-white shadow-md border-b border-grey-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4">
          {/* Label */}
          <div className="hidden lg:block text-sm font-semibold text-primary-800 whitespace-nowrap">
            빠른 상담신청
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:flex lg:gap-3">
            <Input
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="lg:w-40"
            />
            <Input
              type="tel"
              placeholder="연락처"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="lg:w-48"
            />
          </div>

          {/* Agree + Button */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <label className="flex items-center gap-2 text-sm text-grey-600 whitespace-nowrap cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded border-grey-300 text-primary-600 focus:ring-primary-500"
              />
              개인정보 수집 동의
            </label>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-800 hover:bg-primary-700 text-white whitespace-nowrap flex-shrink-0"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  처리 중...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  상담신청
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
