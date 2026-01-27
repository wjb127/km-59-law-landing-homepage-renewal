'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { REVIEWS, MEMBERS } from '@/lib/constants';

export default function ReviewsPage() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const filteredReviews = selectedMember
    ? REVIEWS.filter((r) => r.memberId === selectedMember)
    : REVIEWS;

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
            의뢰인 후기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            법무법인 성진을 믿고 맡겨주신 의뢰인들의 생생한 후기입니다
          </motion.p>
        </div>
      </section>

      {/* Filter & List */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedMember(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedMember === null
                  ? 'bg-primary-800 text-white'
                  : 'bg-white text-grey-600 hover:bg-grey-100'
              }`}
            >
              전체
            </button>
            {MEMBERS.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedMember === member.id
                    ? 'bg-primary-800 text-white'
                    : 'bg-white text-grey-600 hover:bg-grey-100'
                }`}
              >
                {member.name} 변호사
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMember}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg p-6 shadow-sm relative"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-100" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-accent-500 fill-accent-500'
                            : 'text-grey-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-grey-700 leading-relaxed mb-4">
                    &ldquo;{review.content}&rdquo;
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-grey-100">
                    <div>
                      <div className="font-medium text-grey-900">{review.authorName}</div>
                      <div className="text-sm text-grey-500">
                        {review.areaName} · {review.memberName} 변호사
                      </div>
                    </div>
                    <div className="text-sm text-grey-400">{review.createdAt}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-grey-500">해당 변호사의 후기가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
