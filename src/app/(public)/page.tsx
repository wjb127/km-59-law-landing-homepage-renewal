import HeroSection from '@/components/sections/HeroSection';
import QuickConsultBar from '@/components/sections/QuickConsultBar';
import MembersSection from '@/components/sections/MembersSection';
import CasesSection from '@/components/sections/CasesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import LawyerReviewsSection from '@/components/sections/LawyerReviewsSection';
import StatsSection from '@/components/sections/StatsSection';
import ConsultationSection from '@/components/sections/ConsultationSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickConsultBar />
      <MembersSection />
      <CasesSection />
      <ReviewsSection />
      <LawyerReviewsSection />
      <StatsSection />
      <ConsultationSection />
    </>
  );
}
