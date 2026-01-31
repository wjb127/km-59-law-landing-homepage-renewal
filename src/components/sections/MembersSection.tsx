'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MEMBERS } from '@/lib/constants';

export default function MembersSection() {
  const featured = MEMBERS[0];

  const educationItems = featured.education?.split('\n').filter(Boolean) || [];
  const careerItems = featured.career?.split('\n').filter(Boolean) || [];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Branded Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="brand-label text-sm text-primary-300 block mb-3">SJ LAWYER</span>
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900">
            법무법인 성진의<br />
            <span className="text-accent-500">구성원</span>을 소개합니다.
          </h2>
        </motion.div>

        {/* Featured Lawyer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16"
        >
          {/* Info - Left */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <Badge className="w-fit mb-3 bg-primary-50 text-primary-700 border-0">
              {featured.position}
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
              {featured.name}
            </h3>
            <p className="text-grey-600 leading-relaxed mb-6">
              의뢰인의 권익 보호를 최우선으로, 결과로 증명하는 법률 서비스를 제공합니다.
              다양한 법률 분야에서의 풍부한 경험을 바탕으로 최선의 결과를 약속드립니다.
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-6">
              {featured.specialties.map((s) => (
                <Badge key={s} variant="outline" className="text-sm border-grey-300 text-grey-600">
                  {s}
                </Badge>
              ))}
            </div>

            {/* Education + Career side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-primary-800 mb-3">이력</h4>
                <ul className="space-y-2">
                  {educationItems.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-grey-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary-800 mb-3">경력</h4>
                <ul className="space-y-2">
                  {careerItems.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-grey-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Link to profile */}
            <Link href={`/members/${featured.id}`} className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors">
              자세히 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Photo - Right */}
          <div className="relative aspect-[3/4] max-h-[500px] bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl overflow-hidden order-1 lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="w-32 h-32 text-primary-300" />
            </div>
          </div>
        </motion.div>

        {/* All Lawyers 4-column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {MEMBERS.map((member) => (
              <Link key={member.id} href={`/members/${member.id}`}>
                <div className="group">
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg overflow-hidden mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-16 h-16 text-primary-300" />
                    </div>
                    <div className="absolute inset-0 bg-primary-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-sm flex items-center gap-1">
                        프로필 보기 <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-grey-900 group-hover:text-primary-700 transition-colors">{member.name}</h4>
                  <p className="text-sm text-grey-500 mb-1">{member.position}</p>
                  <p className="text-xs text-grey-400 line-clamp-1">
                    {member.specialties.join(' / ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination dots (visual) */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-7 h-1.5 rounded-full bg-primary-800" />
            <span className="w-1.5 h-1.5 rounded-full bg-grey-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-grey-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
