import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Partners from "@/components/Partners";
import CTA from "@/components/CTA";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Samatta Foundation | Empowering Tanzanian Youth Through Sports & Education"
        description="Founded by Mbwana Ally Samatta, the Samatta Foundation empowers Tanzanian youth through football, education, health, sustainability, and community development initiatives."
        keywords="Samatta Foundation, Tanzania, youth empowerment, football development, education support, community development, Mbwana Samatta"
        image="/favicon.png"
        url="/"
      />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Gallery />
        <CTA />
        <Partners />
      </main>
    </div>
  );
};

export default Index;
