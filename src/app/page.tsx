import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Features } from "@/components/landing/Features";
import { AboutUs } from "@/components/landing/AboutUs";
import { RecentEstimations } from "@/components/landing/RecentEstimations";
import { MarketData } from "@/components/landing/MarketData";
import { CallToAction } from "@/components/landing/CallToAction";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <AboutUs />
      <CallToAction />
      <MarketData />
      <RecentEstimations />
      {/* <Features /> */}
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
