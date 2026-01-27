'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CASES } from '@/lib/constants';

export default function CasesSection() {
  const displayCases = CASES.slice(0, 4);

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
            <span className="text-accent-500">성공</span>사례
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            의뢰인의 권익을 위해 최선의 결과를 이끌어낸 실제 사례입니다
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/cases/${caseItem.id}`}>
                <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center shrink-0 transition-colors">
                      <FileText className="w-6 h-6 text-primary-700" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-primary-50 text-primary-700">
                          {caseItem.areaName}
                        </Badge>
                        <Badge className="bg-accent-500 text-white flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {caseItem.resultSummary}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-grey-900 group-hover:text-primary-700 mb-2 transition-colors">
                        {caseItem.title}
                      </h3>

                      <p className="text-sm text-grey-600 line-clamp-2 mb-3">
                        {caseItem.overview}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-grey-500">
                          담당: {caseItem.memberName} 변호사
                        </span>
                        <ArrowRight className="w-4 h-4 text-grey-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                      </div>
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
          <Link href="/cases">
            <Button variant="outline" className="group">
              전체 성공사례 보기
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
