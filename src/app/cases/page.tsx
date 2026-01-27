'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CASES, PRACTICE_AREAS } from '@/lib/constants';

export default function CasesPage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filteredCases = selectedArea
    ? CASES.filter((c) => c.areaId === selectedArea)
    : CASES;

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
            성공사례
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            의뢰인의 권익을 위해 최선의 결과를 이끌어낸 실제 사례입니다
          </motion.p>
        </div>
      </section>

      {/* Filter & List */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedArea(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedArea === null
                  ? 'bg-primary-800 text-white'
                  : 'bg-white text-grey-600 hover:bg-grey-100'
              }`}
            >
              전체
            </button>
            {PRACTICE_AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedArea === area.id
                    ? 'bg-primary-800 text-white'
                    : 'bg-white text-grey-600 hover:bg-grey-100'
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>

          {/* Cases Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedArea}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/cases/${caseItem.id}`}>
                    <div className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center shrink-0 transition-colors">
                          <FileText className="w-6 h-6 text-primary-700" />
                        </div>
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
            </motion.div>
          </AnimatePresence>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-grey-500">해당 분야의 성공사례가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
