import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';

export const metadata: Metadata = {
  title: '법무법인 성진 | 당신의 권리를 끝까지 지켜드립니다',
  description: '형사, 민사, 이혼, 기업법무 전문. 前 검사 출신 변호사가 직접 상담합니다. 24시간 무료 상담 가능. 승소율 95%',
  keywords: '법무법인, 변호사, 형사전문, 이혼전문, 민사소송, 기업법무, 성범죄변호사, 교통사고변호사',
  openGraph: {
    title: '법무법인 성진',
    description: '당신의 권리를 끝까지 지켜드립니다. 前 검사 출신 변호사가 직접 상담합니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '법무법인 성진',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
