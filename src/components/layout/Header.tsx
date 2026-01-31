'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS, SITE_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-grey-100'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                'font-bold text-xl md:text-2xl transition-colors duration-300',
                isScrolled ? 'text-primary-800' : 'text-white'
              )}
            >
              <span className={cn(
                'transition-colors duration-300',
                isScrolled ? 'text-accent-500' : 'text-accent-400'
              )}>
                법무법인
              </span>{' '}
              성진
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-accent-500',
                  isScrolled ? 'text-grey-700' : 'text-white/90'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link href="/consultation" className="hidden sm:block">
              <Button
                size="sm"
                className={cn(
                  'transition-all duration-300',
                  isScrolled
                    ? 'bg-primary-800 hover:bg-primary-700 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                )}
              >
                <Phone className="w-4 h-4 mr-2" />
                상담신청
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <X className={cn(
                  'w-6 h-6 transition-colors duration-300',
                  isScrolled ? 'text-grey-800' : 'text-white'
                )} />
              ) : (
                <Menu className={cn(
                  'w-6 h-6 transition-colors duration-300',
                  isScrolled ? 'text-grey-800' : 'text-white'
                )} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="flex flex-col py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-6 py-3 text-grey-700 hover:bg-grey-50 hover:text-primary-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-6 py-4 border-t mt-2">
                <Link href="/consultation" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary-800 hover:bg-primary-700">
                    <Phone className="w-4 h-4 mr-2" />
                    상담신청
                  </Button>
                </Link>
              </div>
              <div className="px-6 py-2 text-sm text-grey-500">
                대표전화: {SITE_INFO.phone}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
