'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { REVIEWS } from '@/lib/constants';

export default function ReviewsSection() {
  const displayReviews = REVIEWS.slice(0, 4);

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
            의뢰인 <span className="text-accent-500">후기</span>
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            법무법인 성진을 믿고 맡겨주신 의뢰인들의 생생한 후기입니다
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-grey-50 rounded-lg p-6 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-100" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-accent-500 fill-accent-500'
                        : 'text-grey-300'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-grey-700 leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-grey-200">
                <div>
                  <div className="font-medium text-grey-900">{review.authorName}</div>
                  <div className="text-sm text-grey-500">
                    {review.areaName} · {review.memberName} 변호사
                  </div>
                </div>
                <div className="text-sm text-grey-400">
                  {review.createdAt}
                </div>
              </div>
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
          <Link href="/reviews">
            <Button variant="outline" className="group">
              전체 후기 보기
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
