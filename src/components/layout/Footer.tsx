import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE_INFO, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-grey-900 text-grey-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-bold text-white">
                <span className="text-accent-500">법무법인</span> 성진
              </div>
            </Link>
            <p className="text-grey-400 text-sm leading-relaxed mb-6 max-w-md">
              법무법인 성진은 의뢰인의 권익 보호를 최우선으로 하며,
              형사, 민사, 가사, 기업법무 등 모든 법률 분야에서
              최선의 결과를 약속드립니다.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-500 shrink-0" />
                <a href={`tel:${SITE_INFO.phone}`} className="hover:text-white transition-colors">
                  {SITE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-500 shrink-0" />
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-white transition-colors">
                  {SITE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-500 shrink-0" />
                <span>{SITE_INFO.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-accent-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/consultation" className="hover:text-accent-500 transition-colors">
                  상담신청
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4">업무분야</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/practice/criminal" className="hover:text-accent-500 transition-colors">
                  형사사건
                </Link>
              </li>
              <li>
                <Link href="/practice/family" className="hover:text-accent-500 transition-colors">
                  이혼/가사
                </Link>
              </li>
              <li>
                <Link href="/practice/civil" className="hover:text-accent-500 transition-colors">
                  민사/부동산
                </Link>
              </li>
              <li>
                <Link href="/practice/corporate" className="hover:text-accent-500 transition-colors">
                  기업법무
                </Link>
              </li>
              <li>
                <Link href="/practice/traffic" className="hover:text-accent-500 transition-colors">
                  교통/산재
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-grey-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-grey-500">
            <div>
              &copy; {new Date().getFullYear()} {SITE_INFO.name}. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-grey-300 transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-grey-300 transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
