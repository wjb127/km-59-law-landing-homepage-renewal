'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MEMBERS } from '@/lib/constants';

export default function MembersSection() {
  const displayMembers = MEMBERS.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-grey-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
            <span className="text-accent-500">전문</span> 법률팀
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            검찰, 법원, 대형 로펌 출신의 베테랑 변호사들이 함께합니다
          </p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/members/${member.id}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Photo */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-24 h-24 text-primary-300" />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium flex items-center gap-2">
                        프로필 보기
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                      {member.specialties.slice(0, 3).map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="text-xs bg-primary-50 text-primary-700 hover:bg-primary-100"
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/members">
            <Button variant="outline" className="group">
              전체 구성원 보기
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
