import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* How Farmora Works Section */}
        <HowItWorksSection />

        {/* Call To Action Section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

