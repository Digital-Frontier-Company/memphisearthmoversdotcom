
import { Element } from "react-scroll";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Element name="quoteForm">
          <HeroSection />
        </Element>
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
