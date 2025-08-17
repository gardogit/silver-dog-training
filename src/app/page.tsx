import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection';
import { FaqSection } from '@/components/sections/FaqSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <GoogleReviewsSection />
      <FaqSection />
    </main>
  );
}
