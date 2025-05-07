
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
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <Element name="problemSection">
          <ProblemSection />
        </Element>
        <Element name="solutionSection">
          <SolutionSection />
        </Element>
        <Element name="servicesSection">
          <ServicesSection />
        </Element>
        <TestimonialsSection />
        <Element name="faqSection" className="bg-mem-darkNavy">
          <FaqSection />
        </Element>
        <CallToAction />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
