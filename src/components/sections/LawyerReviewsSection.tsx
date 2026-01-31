'use client';

import { motion } from 'framer-motion';
import { User, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MEMBERS, REVIEWS } from '@/lib/constants';

export default function LawyerReviewsSection() {
  // Top 2 lawyers
  const topLawyers = MEMBERS.slice(0, 2);

  // Count reviews per lawyer
  const getReviewCount = (memberId: string) =>
    REVIEWS.filter((r) => r.memberId === memberId).length;

  // Get a summary review for each lawyer
  const getTopReview = (memberId: string) =>
    REVIEWS.find((r) => r.memberId === memberId);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="brand-label text-sm text-primary-300 block mb-3">WHY SUNGJIN</span>
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
            <span className="text-accent-500">성진</span>을 선택한 이유
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            변호사별 의뢰인 후기를 확인해보세요
          </p>
        </motion.div>

        {/* 2-column Lawyer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topLawyers.map((lawyer, index) => {
            const reviewCount = getReviewCount(lawyer.id);
            const topReview = getTopReview(lawyer.id);

            return (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="border border-grey-200 rounded-xl p-6 md:p-8 border-t-4 border-t-primary-800 hover:shadow-lg transition-shadow duration-300">
                  {/* Lawyer Info */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Photo Placeholder */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shrink-0">
                      <User className="w-8 h-8 text-primary-400" />
                    </div>
                    <div>
                      <Badge className="mb-1 bg-primary-50 text-primary-700 border-0 text-xs">
                        {lawyer.position}
                      </Badge>
                      <h3 className="text-xl font-bold text-grey-900">{lawyer.name}</h3>
                    </div>
                    {/* Review Count */}
                    <div className="ml-auto flex items-center gap-1.5 text-primary-700">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-semibold">후기 {reviewCount}건</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {lawyer.specialties.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs border-grey-300 text-grey-500">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  {/* Featured Review */}
                  {topReview && (
                    <div className="bg-grey-50 rounded-lg p-4">
                      <p className="text-sm text-grey-600 leading-relaxed line-clamp-3 mb-2">
                        &ldquo;{topReview.content}&rdquo;
                      </p>
                      <p className="text-xs text-grey-400">
                        &mdash; {topReview.authorName} ({topReview.areaName})
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
