import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: '법무법인 성진 | 당신의 권리를 끝까지 지켜드립니다',
  description: '법무법인 성진은 형사, 민사, 가사, 기업법무 등 모든 법률 분야에서 최선의 결과를 약속드립니다. 24시간 무료 상담 가능.',
  keywords: '법무법인, 성진, 변호사, 법률상담, 형사, 민사, 이혼, 기업법무',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
