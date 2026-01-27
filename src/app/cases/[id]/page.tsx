'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CASES, MEMBERS } from '@/lib/constants';

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const caseItem = CASES.find((c) => c.id === id);
  const member = MEMBERS.find((m) => m.id === caseItem?.memberId);

  if (!caseItem) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-grey-500">존재하지 않는 페이지입니다.</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary-800 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cases" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            성공사례 목록
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {caseItem.areaName}
              </Badge>
              <Badge className="bg-accent-500 text-white flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {caseItem.resultSummary}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">{caseItem.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Overview */}
              <div>
                <h2 className="text-xl font-bold text-grey-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-accent-500 rounded-full" />
                  사건 개요
                </h2>
                <div className="bg-grey-50 rounded-lg p-6">
                  <p className="text-grey-700 leading-relaxed">{caseItem.overview}</p>
                </div>
              </div>

              {/* Result */}
              <div>
                <h2 className="text-xl font-bold text-grey-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-accent-500 rounded-full" />
                  판결 결과
                </h2>
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-6 h-6 text-accent-600" />
                    <span className="text-lg font-bold text-accent-700">{caseItem.resultSummary}</span>
                  </div>
                  <p className="text-grey-700 leading-relaxed">{caseItem.result}</p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              {/* Lawyer Info */}
              {member && (
                <div className="bg-grey-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-grey-900 mb-4">담당 변호사</h3>
                  <Link href={`/members/${member.id}`}>
                    <div className="flex items-center gap-4 p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-7 h-7 text-primary-700" />
                      </div>
                      <div>
                        <div className="font-bold text-grey-900">{member.name}</div>
                        <div className="text-sm text-grey-500">{member.position}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary-800 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">비슷한 사건으로 고민 중이신가요?</h3>
                <p className="text-white/80 text-sm mb-4">
                  전문 변호사가 직접 상담해드립니다.
                </p>
                <Link href="/consultation">
                  <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white">
                    무료 상담 신청
                  </Button>
                </Link>
              </div>

              {/* Date */}
              <div className="mt-6 text-sm text-grey-500 text-center">
                등록일: {caseItem.createdAt}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
