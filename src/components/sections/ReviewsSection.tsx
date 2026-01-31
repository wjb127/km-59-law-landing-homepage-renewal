'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { REVIEWS } from '@/lib/constants';

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="brand-label text-sm text-primary-300 block mb-3">REVIEWS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
            의뢰인 <span className="text-accent-500">후기</span>
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            법무법인 성진을 믿고 맡겨주신 의뢰인들의 생생한 후기입니다
          </p>
        </motion.div>

        {/* Reviews 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="bg-white rounded-xl p-6 border border-grey-100 hover:border-primary-300 transition-colors duration-300 h-full relative">
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-50" />

                {/* Category Badge */}
                {review.areaName && (
                  <Badge className="mb-3 bg-primary-800 text-white border-0 text-xs">
                    {review.areaName}
                  </Badge>
                )}

                {/* Title (author as title) */}
                <h3 className="font-bold text-grey-900 mb-2 line-clamp-1">
                  {review.authorName} 님의 후기
                </h3>

                {/* Content */}
                <p className="text-sm text-grey-600 leading-relaxed line-clamp-3 mb-4">
                  &ldquo;{review.content}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-grey-100">
                  <div className="text-sm text-grey-500">
                    {review.memberName} 변호사
                  </div>
                  <div className="text-xs text-grey-400">{review.createdAt}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
