import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { GoogleReviewsSection } from '@/components/sections/home/GoogleReviewsSection';
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
