'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { SITE_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating Buttons */}
      <div className="hidden md:flex fixed right-6 bottom-6 flex-col gap-3 z-40">
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className={cn(
            'w-12 h-12 rounded-full bg-grey-800 text-white shadow-lg',
            'flex items-center justify-center',
            'hover:bg-grey-700 transition-all duration-300',
            'hover:-translate-y-1 hover:shadow-xl',
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          )}
          aria-label="맨 위로"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* KakaoTalk */}
        <a
          href={SITE_INFO.kakaoLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'w-14 h-14 rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-lg',
            'flex items-center justify-center',
            'hover:brightness-105 transition-all duration-300',
            'hover:-translate-y-1 hover:shadow-xl'
          )}
          aria-label="카카오톡 상담"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Phone */}
        <a
          href={`tel:${SITE_INFO.phone}`}
          className={cn(
            'w-14 h-14 rounded-full bg-primary-800 text-white shadow-lg',
            'flex items-center justify-center',
            'hover:bg-primary-700 transition-all duration-300',
            'hover:-translate-y-1 hover:shadow-xl'
          )}
          aria-label="전화 상담"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-grey-200 shadow-lg">
        <div className="flex">
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-4 text-primary-800 font-medium hover:bg-grey-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>전화상담</span>
          </a>
          <div className="w-px bg-grey-200" />
          <a
            href={SITE_INFO.kakaoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 text-[#3C1E1E] font-medium bg-[#FEE500] hover:brightness-95 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>카톡상담</span>
          </a>
        </div>
      </div>

      {/* Mobile Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={cn(
          'md:hidden fixed right-4 bottom-20 z-40',
          'w-10 h-10 rounded-full bg-grey-800 text-white shadow-lg',
          'flex items-center justify-center',
          'transition-all duration-300',
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-label="맨 위로"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  );
}
