'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS_SETTINGS } from '@/lib/constants';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary-800 mb-2">
        {count.toLocaleString()}
        <span className="text-accent-500">{suffix}</span>
      </div>
      <div className="text-grey-600 font-medium">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: STATS_SETTINGS.consultations, suffix: '+', label: '누적 상담', delay: 0 },
    { value: STATS_SETTINGS.cases, suffix: '+', label: '성공 사례', delay: 100 },
    { value: STATS_SETTINGS.lawyers, suffix: '명', label: '전문 변호사', delay: 200 },
    { value: STATS_SETTINGS.years, suffix: '년', label: '업력', delay: 300 },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
            법무법인 성진이 <span className="text-accent-500">선택받는 이유</span>
          </h2>
          <p className="text-grey-600 text-lg max-w-2xl mx-auto">
            풍부한 경험과 전문성을 바탕으로 최선의 결과를 만들어냅니다
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
