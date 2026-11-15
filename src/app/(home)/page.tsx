import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AgriAiSection from "@/components/home/AgriAiSection";
import FeaturedCropsSection from "@/components/home/FeaturedCropsSection";
import FeaturedFarmsSection from "@/components/home/FeaturedFarmsSection";
import CtaSection from "@/components/home/CtaSection";


export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">

      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <AgriAiSection />
        <FeaturedCropsSection />
        <FeaturedFarmsSection />
        <CtaSection />
      </main>
    </div>
  );
}
