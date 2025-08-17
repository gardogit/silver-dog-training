import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <GoogleReviewsSection />
    </main>
  );
}
