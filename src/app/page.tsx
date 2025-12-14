import HeroSection from './landing/hero-section';
import FeaturesSection from './landing/features-section';
import ContentsSection from './landing/contents-section';
import CtaSection from './landing/cta-section';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ContentsSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}
