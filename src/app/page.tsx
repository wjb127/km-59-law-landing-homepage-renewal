import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import MembersSection from '@/components/sections/MembersSection';
import PracticeSection from '@/components/sections/PracticeSection';
import CasesSection from '@/components/sections/CasesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ConsultationSection from '@/components/sections/ConsultationSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MembersSection />
      <PracticeSection />
      <CasesSection />
      <ReviewsSection />
      <ConsultationSection />
    </>
  );
}
