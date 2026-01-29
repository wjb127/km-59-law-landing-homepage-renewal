'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Clock, Shield, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SITE_INFO, PRACTICE_AREAS, MEMBERS } from '@/lib/constants';
import { submitInquiry } from '@/lib/api/inquiries';
import { toast } from 'sonner';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    preferredMember: '',
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
      email: formData.email || undefined,
      message: formData.content,
      lead_type: 'consultation',
      custom_fields: {
        ...(formData.area && { area: formData.area }),
        ...(formData.preferredMember && { preferredMember: formData.preferredMember }),
      },
    });

    if (!result.success) {
      toast.error(result.error || '상담 신청에 실패했습니다.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-grey-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-grey-900 mb-2">상담 신청 완료</h2>
          <p className="text-grey-600 mb-6">
            빠른 시간 내에 담당 변호사가 연락드리겠습니다.
            <br />
            감사합니다.
          </p>
          <div className="bg-grey-50 rounded-lg p-4 text-sm text-grey-600">
            <p>긴급한 상담이 필요하시면</p>
            <a href={`tel:${SITE_INFO.phone}`} className="text-primary-700 font-bold text-lg">
              {SITE_INFO.phone}
            </a>
            <p>로 전화주세요.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            상담 신청
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            전문 변호사가 직접 상담해드립니다
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-grey-900 mb-6">온라인 상담 신청</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-grey-700 mb-1">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-grey-700 mb-1">
                      이메일
                    </label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-grey-700 mb-1">
                        상담 분야
                      </label>
                      <select
                        className="w-full rounded-md border border-grey-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      >
                        <option value="">선택해주세요</option>
                        {PRACTICE_AREAS.map((area) => (
                          <option key={area.id} value={area.name}>{area.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-grey-700 mb-1">
                        희망 변호사
                      </label>
                      <select
                        className="w-full rounded-md border border-grey-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={formData.preferredMember}
                        onChange={(e) => setFormData({ ...formData, preferredMember: e.target.value })}
                      >
                        <option value="">선택해주세요 (선택)</option>
                        {MEMBERS.map((member) => (
                          <option key={member.id} value={member.name}>{member.name} {member.position}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-grey-700 mb-1">
                      상담 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full rounded-md border border-grey-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[150px] resize-none"
                      placeholder="상담받고 싶은 내용을 자세히 적어주세요"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                      개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary-800 hover:bg-primary-700 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        처리 중...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        상담 신청하기
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Phone CTA */}
              <div className="bg-primary-800 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">전화 상담</h3>
                <a href={`tel:${SITE_INFO.phone}`} className="text-2xl font-bold text-accent-400 hover:text-accent-300 transition-colors">
                  {SITE_INFO.phone}
                </a>
                <p className="text-white/70 text-sm mt-2">{SITE_INFO.businessHours}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <div className="font-medium text-grey-900">빠른 답변</div>
                    <div className="text-sm text-grey-500">접수 후 2시간 내 연락</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <div className="font-medium text-grey-900">비밀 보장</div>
                    <div className="text-sm text-grey-500">상담 내용 100% 비밀 유지</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <div className="font-medium text-grey-900">24시간 접수</div>
                    <div className="text-sm text-grey-500">온라인 상담 24시간 가능</div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary-700" />
                  <span className="font-medium text-grey-900">오시는 길</span>
                </div>
                <p className="text-sm text-grey-600">{SITE_INFO.address}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
