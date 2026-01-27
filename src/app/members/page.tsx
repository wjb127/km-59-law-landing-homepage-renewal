'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MEMBERS } from '@/lib/constants';

export default function MembersPage() {
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
            구성원 소개
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            검찰, 법원, 대형 로펌 출신의 전문 변호사들이 함께합니다
          </motion.p>
        </div>
      </section>

      {/* Members List */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEMBERS.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/members/${member.id}`}>
                  <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {/* Photo */}
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="w-24 h-24 text-primary-300" />
                      </div>
                      <div className="absolute inset-0 bg-primary-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium flex items-center gap-2">
                          프로필 보기
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-grey-900">{member.name}</h3>
                        <span className="text-sm text-grey-500">{member.position}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty) => (
                          <Badge
                            key={specialty}
                            variant="secondary"
                            className="text-xs bg-primary-50 text-primary-700"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
