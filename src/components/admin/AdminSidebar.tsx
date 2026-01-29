'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, MessageSquare, User, Scale } from 'lucide-react';

const navItems = [
  { href: '/admin/stats', label: '대시보드', icon: BarChart3 },
  { href: '/admin/inquiries', label: '문의 관리', icon: MessageSquare },
  { href: '/admin/profile', label: '프로필', icon: User },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#1a365d] text-white flex flex-col z-40">
      <div className="p-5 border-b border-white/10">
        <Link href="/admin/stats" className="flex items-center gap-2">
          <Scale className="w-6 h-6 text-[#d69e2e]" />
          <span className="font-bold text-lg">성진 관리자</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          ← 홈페이지로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
