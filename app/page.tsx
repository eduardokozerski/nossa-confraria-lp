import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Services } from "@/components/landing/services";
import { Differentials } from "@/components/landing/differentials";
import { Gallery } from "@/components/landing/gallery";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Location } from "@/components/landing/location";
import { Budget } from "@/components/landing/budget";
import { Footer } from "@/components/landing/footer";
import { FloatingWhatsApp } from "@/components/landing/floating-whatsapp";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Services />
      <Differentials />
      <Gallery />
      <Testimonials />
      <CTA />
      <Location />
      <Budget />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
