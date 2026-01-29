'use client';

import { motion } from 'framer-motion';
import { Shield, Target, Users, Award } from 'lucide-react';
import { SITE_INFO } from '@/lib/constants';

const values = [
  {
    icon: Shield,
    title: '신뢰',
    description: '의뢰인과의 약속을 지키고, 모든 상담 내용을 철저히 비밀로 합니다.',
  },
  {
    icon: Target,
    title: '결과',
    description: '최선의 결과를 위해 끝까지 노력하며, 승소율 95%의 실력을 증명합니다.',
  },
  {
    icon: Users,
    title: '소통',
    description: '사건 진행 상황을 수시로 공유하고, 의뢰인의 의견을 존중합니다.',
  },
  {
    icon: Award,
    title: '전문성',
    description: '각 분야 전문 변호사가 직접 상담하고 사건을 수행합니다.',
  },
];

export default function AboutPage() {
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
            법인 소개
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            법무법인 성진은 의뢰인의 권익 보호를 최우선 가치로 삼습니다
          </motion.p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-6">
                당신의 <span className="text-accent-500">권리</span>를<br />
                끝까지 지켜드립니다
              </h2>
              <div className="space-y-4 text-grey-600 leading-relaxed">
                <p>
                  법무법인 성진은 2009년 설립 이래, 오직 의뢰인의 권익 보호라는
                  하나의 목표를 향해 달려왔습니다.
                </p>
                <p>
                  前 검사, 前 대형 로펌 출신 변호사들이 모여, 형사, 민사, 가사,
                  기업법무 등 모든 법률 분야에서 최고의 전문성을 자랑합니다.
                </p>
                <p>
                  우리는 단순히 사건을 수임하는 것이 아니라, 의뢰인의 입장에서
                  생각하고, 의뢰인과 함께 문제를 해결해 나갑니다.
                </p>
                <p>
                  법무법인 성진은 앞으로도 변함없이 의뢰인의 든든한 법률 파트너가
                  되겠습니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-grey-50 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-grey-900 mb-6">법인 정보</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-500">법인명</span>
                  <span className="font-medium text-grey-900">{SITE_INFO.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-500">설립연도</span>
                  <span className="font-medium text-grey-900">2009년</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-500">대표번호</span>
                  <span className="font-medium text-grey-900">{SITE_INFO.phone}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-grey-200">
                  <span className="text-grey-500">이메일</span>
                  <span className="font-medium text-grey-900">{SITE_INFO.email}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-grey-500">영업시간</span>
                  <span className="font-medium text-grey-900">{SITE_INFO.businessHours}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
              핵심 <span className="text-accent-500">가치</span>
            </h2>
            <p className="text-grey-600 text-lg">
              법무법인 성진이 추구하는 네 가지 핵심 가치입니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-lg font-bold text-grey-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-grey-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
