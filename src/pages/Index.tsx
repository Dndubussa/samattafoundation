import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Partners from "@/components/Partners";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Gallery />
        <CTA />
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
