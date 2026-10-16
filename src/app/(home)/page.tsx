import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedCropsSection from "@/components/home/FeaturedCropsSection";
import FeaturedFarmsSection from "@/components/home/FeaturedFarmsSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturedCropsSection />
        <FeaturedFarmsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
