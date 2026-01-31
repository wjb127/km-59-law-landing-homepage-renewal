'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SITE_INFO, PRACTICE_AREAS } from '@/lib/constants';
import { submitInquiry } from '@/lib/api/inquiries';
import { toast } from 'sonner';

export default function ConsultationSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitInquiry({
      name: formData.name,
      phone: formData.phone,
      message: formData.content,
      lead_type: 'consultation',
      custom_fields: {
        ...(formData.area && { area: formData.area }),
      },
    });

    if (!result.success) {
      toast.error(result.error || '상담 신청에 실패했습니다.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', area: '', content: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 md:py-24 bg-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              막막하고 점점 <span className="text-accent-400">힘들어지는 상황</span>,
              <br />혼자 감당하지 마세요
            </h2>
            <p className="text-white/80 text-lg mb-8">
              지금 바로 전문 변호사에게 상담받으세요.
              <br />
              모든 상담 내용은 철저히 비밀이 보장됩니다.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-400" />
                </div>
                <span>24시간 상담 접수 가능</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent-400" />
                </div>
                <span>접수 후 2시간 내 연락드립니다</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-400" />
                </div>
                <span>상담 내용 100% 비밀 보장</span>
              </div>
            </div>

            {/* Phone CTA */}
            <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-white/70 text-sm mb-2">전화 상담을 원하시면</p>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="text-2xl font-bold text-white hover:text-accent-400 transition-colors"
              >
                {SITE_INFO.phone}
              </a>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-grey-900 mb-6">
                온라인 상담신청
              </h3>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-grey-900 mb-2">
                    상담 신청이 완료되었습니다
                  </h4>
                  <p className="text-grey-600">
                    빠른 시간 내에 연락드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-grey-700 mb-1">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-grey-700 mb-1">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-grey-700 mb-1">
                      상담 분야
                    </label>
                    <select
                      className="w-full rounded-md border border-grey-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                    >
                      <option value="">선택해주세요</option>
                      {PRACTICE_AREAS.map((area) => (
                        <option key={area.id} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-grey-700 mb-1">
                      상담 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full rounded-md border border-grey-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] resize-none"
                      placeholder="상담받고 싶은 내용을 간략히 적어주세요"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 rounded border-grey-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-grey-600">
                      개인정보 수집 및 이용에 동의합니다.{' '}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary-800 hover:bg-primary-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        처리 중...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        상담 신청하기
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
