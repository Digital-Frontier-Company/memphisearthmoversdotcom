
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/about/StructuredData";
import AboutHero from "@/components/about/AboutHero";
import FrustrationSection from "@/components/about/FrustrationSection";
import DifferenceSection from "@/components/about/DifferenceSection";
import ServicesSection from "@/components/about/ServicesSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import CtaSection from "@/components/about/CtaSection";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Header />
      
      <main className="flex-grow">
        <AboutHero />
        <FrustrationSection />
        <DifferenceSection />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
