'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS_SETTINGS } from '@/lib/constants';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const steps = 50;
    const stepValue = value / steps;
    let current = 0;

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
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      <span className="text-accent-500">{suffix}</span>
    </span>
  );
}

const stats = [
  { value: STATS_SETTINGS.consultations, suffix: '+', label: '누적 상담', note: '*2025년 기준' },
  { value: STATS_SETTINGS.cases, suffix: '+', label: '성공 사례', note: '*2025년 기준' },
  { value: STATS_SETTINGS.lawyers, suffix: '명', label: '전문 변호사', note: '' },
  { value: STATS_SETTINGS.years, suffix: '년', label: '업력', note: '' },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="brand-label text-sm text-primary-300 block mb-3">ACHIEVEMENT</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800">
            사건의 핵심 그리고 <span className="text-accent-500">결과</span>
          </h2>
        </motion.div>

        {/* Stats Grid with dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-grey-200">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4 py-4">
              <div className="text-sm font-medium text-grey-500 mb-2">{stat.label}</div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-800 mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              {stat.note && (
                <div className="text-xs text-grey-400">{stat.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
