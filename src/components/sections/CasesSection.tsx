'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, FileText, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CASES, PRACTICE_AREAS } from '@/lib/constants';

export default function CasesSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: '전체' },
    ...PRACTICE_AREAS.map((a) => ({ id: a.id, name: a.name })),
  ];

  const filteredCases = activeCategory === 'all'
    ? CASES
    : CASES.filter((c) => c.areaId === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="brand-label text-sm text-primary-300 block mb-3">SUCCESS CASES</span>
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
            분야별 <span className="text-accent-500">사건사례</span>
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            의뢰인의 권익을 위해 최선의 결과를 이끌어낸 실제 사례입니다
          </p>
        </motion.div>

        {/* Mobile: Horizontal tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary-800 text-white'
                  : 'bg-grey-100 text-grey-600 hover:bg-grey-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Desktop: Sidebar + Grid */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          {/* Sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <nav className="space-y-1 sticky top-28">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-all cursor-pointer border-l-2 ${
                    activeCategory === cat.id
                      ? 'border-l-primary-800 text-primary-800 font-bold bg-primary-50'
                      : 'border-l-grey-200 text-grey-500 hover:text-grey-700 hover:border-l-grey-400'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Cases Grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/cases/${caseItem.id}`}>
                    <div className="group bg-white rounded-lg p-6 border border-grey-200 border-l-4 border-l-accent-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center shrink-0 transition-colors">
                          <FileText className="w-6 h-6 text-primary-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-primary-600" />
                              </div>
                              <span className="text-sm text-grey-500">{caseItem.memberName} 변호사</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-grey-400 group-hover:text-primary-700 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty state */}
            {filteredCases.length === 0 && (
              <div className="text-center py-12 text-grey-500">
                해당 분야의 사례가 아직 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
