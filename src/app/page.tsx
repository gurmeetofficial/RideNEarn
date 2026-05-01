import { Navbar } from "@/components/Navbar";
import { HeroScroll } from "@/components/HeroScroll";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Revenue } from "@/components/Revenue";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroScroll />
      <Features />
      <HowItWorks />
      <Revenue />
      <CTA />
      <Footer />
    </main>
  );
}
