'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Gavel, Heart, Building2, Briefcase, Car, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRACTICE_AREAS, CASES, MEMBERS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Gavel,
  Heart,
  Building2,
  Briefcase,
  Car,
  FileText,
};

export default function PracticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const area = PRACTICE_AREAS.find((a) => a.slug === slug);
  const relatedCases = CASES.filter((c) => c.areaId === area?.id).slice(0, 3);
  const relatedMembers = MEMBERS.filter((m) => m.specialties.some((s) => area?.name.includes(s) || s.includes(area?.name.split('/')[0] || '')));

  if (!area) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-grey-500">존재하지 않는 페이지입니다.</p>
      </div>
    );
  }

  const Icon = iconMap[area.icon] || Gavel;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary-800 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/practice" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            업무분야 목록
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{area.name}</h1>
              <p className="text-white/80 mt-1">{area.description}</p>
            </div>
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
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-grey-900 mb-4">분야 소개</h2>
              <div className="prose prose-grey max-w-none">
                <p className="text-grey-700 leading-relaxed text-lg">
                  {area.content}
                </p>
              </div>

              {/* Related Cases */}
              {relatedCases.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-grey-900 mb-6">관련 성공사례</h2>
                  <div className="space-y-4">
                    {relatedCases.map((caseItem) => (
                      <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                        <div className="group bg-grey-50 rounded-lg p-4 hover:bg-grey-100 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge className="mb-2 bg-accent-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {caseItem.resultSummary}
                              </Badge>
                              <h3 className="font-semibold text-grey-900 group-hover:text-primary-700 transition-colors">
                                {caseItem.title}
                              </h3>
                              <p className="text-sm text-grey-600 mt-1 line-clamp-1">
                                {caseItem.overview}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-grey-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              {/* CTA */}
              <div className="bg-primary-800 rounded-xl p-6 text-white mb-6">
                <h3 className="text-lg font-bold mb-2">무료 상담 신청</h3>
                <p className="text-white/80 text-sm mb-4">
                  {area.name} 분야 전문 변호사가 직접 상담해드립니다.
                </p>
                <Link href="/consultation">
                  <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white">
                    상담 신청하기
                  </Button>
                </Link>
              </div>

              {/* Related Lawyers */}
              {relatedMembers.length > 0 && (
                <div className="bg-grey-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-grey-900 mb-4">담당 변호사</h3>
                  <div className="space-y-3">
                    {relatedMembers.slice(0, 3).map((member) => (
                      <Link key={member.id} href={`/members/${member.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-grey-900">{member.name}</div>
                            <div className="text-sm text-grey-500">{member.position}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
