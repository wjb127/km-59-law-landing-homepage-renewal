'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, User, Mail, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MEMBERS, REVIEWS } from '@/lib/constants';

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const member = MEMBERS.find((m) => m.id === id);
  const memberReviews = REVIEWS.filter((r) => r.memberId === id);

  if (!member) {
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
          <Link href="/members" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            구성원 목록
          </Link>
        </div>
      </section>

      {/* Profile */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Photo & Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-grey-50 rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <User className="w-32 h-32 text-primary-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-grey-900">{member.name}</h1>
                    <span className="text-grey-500">{member.position}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} className="bg-primary-100 text-primary-800">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-grey-600 hover:text-primary-700 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                  )}
                </div>
              </div>

              <Link href="/consultation" className="block mt-4">
                <Button className="w-full bg-primary-800 hover:bg-primary-700">
                  {member.name} 변호사에게 상담받기
                </Button>
              </Link>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Education */}
              <div>
                <h2 className="text-lg font-bold text-grey-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-accent-500 rounded-full" />
                  학력
                </h2>
                <div className="bg-grey-50 rounded-lg p-4">
                  {member.education.split('\n').map((line, i) => (
                    <p key={i} className="text-grey-700 py-1">{line}</p>
                  ))}
                </div>
              </div>

              {/* Career */}
              <div>
                <h2 className="text-lg font-bold text-grey-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-accent-500 rounded-full" />
                  경력
                </h2>
                <div className="bg-grey-50 rounded-lg p-4">
                  {member.career.split('\n').map((line, i) => (
                    <p key={i} className="text-grey-700 py-1">{line}</p>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-lg font-bold text-grey-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-accent-500 rounded-full" />
                  주요 실적
                </h2>
                <div className="bg-grey-50 rounded-lg p-4">
                  {member.achievements.split('\n').map((line, i) => (
                    <p key={i} className="text-grey-700 py-1">{line}</p>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {memberReviews.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-grey-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-accent-500 rounded-full" />
                    의뢰인 후기
                  </h2>
                  <div className="space-y-4">
                    {memberReviews.map((review) => (
                      <div key={review.id} className="bg-grey-50 rounded-lg p-4">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-accent-500 fill-accent-500'
                                  : 'text-grey-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-grey-700 mb-2">&ldquo;{review.content}&rdquo;</p>
                        <div className="flex justify-between text-sm text-grey-500">
                          <span>{review.authorName}</span>
                          <span>{review.areaName}</span>
                        </div>
                      </div>
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
