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

export default function PracticeSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
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
            <span className="text-accent-500">업무</span>분야
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            형사, 민사, 가사, 기업법무까지 모든 법률 분야를 아우릅니다
          </p>
        </motion.div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PRACTICE_AREAS.map((area, index) => {
            const Icon = iconMap[area.icon] || Gavel;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/practice/${area.slug}`}>
                  <div className="group relative p-6 md:p-8 bg-grey-50 rounded-lg hover:bg-primary-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary-100 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-700 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg md:text-xl font-bold text-grey-900 group-hover:text-white mb-2 transition-colors duration-300">
                      {area.name}
                    </h3>
                    <p className="text-sm text-grey-600 group-hover:text-white/80 transition-colors duration-300 line-clamp-2">
                      {area.description}
                    </p>

                    {/* Arrow */}
                    <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
