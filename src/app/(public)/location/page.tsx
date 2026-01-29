'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Train } from 'lucide-react';
import { SITE_INFO } from '@/lib/constants';
import GoogleMapComponent from '@/components/GoogleMap';

export default function LocationPage() {
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
            오시는 길
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            법무법인 성진으로 찾아오시는 방법을 안내해드립니다
          </motion.p>
        </div>
      </section>

      {/* Map & Info */}
      <section className="py-16 md:py-24 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-[16/10]">
                  <GoogleMapComponent
                    address={SITE_INFO.address}
                    lat={37.4923}
                    lng={127.0066}
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-grey-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-700" />
                  주소
                </h3>
                <p className="text-grey-700">{SITE_INFO.address}</p>
                {SITE_INFO.addressDetail && (
                  <p className="text-sm text-grey-500 mt-1">{SITE_INFO.addressDetail}</p>
                )}
              </div>

              {/* Contact */}
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-grey-900 mb-4">연락처</h3>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-700" />
                  <div>
                    <div className="text-sm text-grey-500">대표전화</div>
                    <a href={`tel:${SITE_INFO.phone}`} className="font-medium text-grey-900 hover:text-primary-700 transition-colors">
                      {SITE_INFO.phone}
                    </a>
                  </div>
                </div>
                {SITE_INFO.fax && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-700" />
                    <div>
                      <div className="text-sm text-grey-500">팩스</div>
                      <span className="font-medium text-grey-900">{SITE_INFO.fax}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-700" />
                  <div>
                    <div className="text-sm text-grey-500">이메일</div>
                    <a href={`mailto:${SITE_INFO.email}`} className="font-medium text-grey-900 hover:text-primary-700 transition-colors">
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-700" />
                  <div>
                    <div className="text-sm text-grey-500">영업시간</div>
                    <span className="font-medium text-grey-900">{SITE_INFO.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-grey-900 mb-4">교통편</h3>
                <div className="flex items-start gap-3">
                  <Train className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <div className="font-medium text-grey-900">지하철</div>
                    <p className="text-sm text-grey-600">
                      2호선 서초역 3번 출구에서 도보 5분
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <div className="font-medium text-grey-900">주차</div>
                    <p className="text-sm text-grey-600">
                      건물 지하주차장 이용 가능<br />
                      (2시간 무료)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
