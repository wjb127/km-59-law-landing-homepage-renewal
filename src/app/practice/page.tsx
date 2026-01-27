'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Gavel, Heart, Building2, Briefcase, Car, FileText } from 'lucide-react';
import { PRACTICE_AREAS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Gavel,
  Heart,
  Building2,
  Briefcase,
  Car,
  FileText,
};

export default function PracticePage() {
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
            업무분야
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            형사, 민사, 가사, 기업법무까지 모든 법률 분야를 아우릅니다
          </motion.p>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((area, index) => {
              const Icon = iconMap[area.icon] || Gavel;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/practice/${area.slug}`}>
                    <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-14 h-14 rounded-lg bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-4 transition-colors">
                        <Icon className="w-7 h-7 text-primary-700" />
                      </div>
                      <h3 className="text-xl font-bold text-grey-900 mb-2 group-hover:text-primary-700 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-grey-600 mb-4">
                        {area.description}
                      </p>
                      <div className="flex items-center text-primary-700 font-medium">
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
