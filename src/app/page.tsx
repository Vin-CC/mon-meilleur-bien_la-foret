import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { AboutUs } from "@/components/landing/AboutUs";
import { MarketData } from "@/components/landing/MarketData";
import { Testimonials } from "@/components/landing/Testimonials";
import { Partners } from "@/components/landing/Partners";
import { FAQ } from "@/components/landing/FAQ";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/layout/Footer";
import { Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <MarketData />
        <Testimonials />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      {/* Floating Phone Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-blue/90 hover:to-brand-green/90 text-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110">
          <div className="relative">
            <Phone className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
