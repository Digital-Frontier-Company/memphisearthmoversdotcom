
import { Element } from "react-scroll";
import { Helmet } from "react-helmet-async";
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
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";

// FAQ Schema
const HomeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas of Memphis do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve all of Greater Memphis including Shelby, Fayette, and surrounding counties. Our service radius extends approximately 50 miles from downtown Memphis."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can you deliver materials in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We typically schedule Memphis deliveries within 24-48 hours of confirmation. Depending on availability and your Memphis location, same-day service may be possible for urgent needs."
      }
    },
    {
      "@type": "Question",
      "name": "What are your Memphis dump truck rental rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our Memphis dump truck rental rates start at $125/hour with a 3-hour minimum. Custom rates are available for longer projects and material deliveries in Memphis and DeSoto County."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle small residential projects in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! No job in Memphis is too small. We work with Memphis homeowners on residential projects like driveway resurfacing, landscaping, and small construction jobs with the same dedication as our larger commercial clients."
      }
    },
    {
      "@type": "Question",
      "name": "Are you licensed and insured in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Memphis Earth Movers is fully licensed and insured in Memphis. We carry comprehensive insurance coverage including liability and workers' compensation to protect all parties involved in the hauling process throughout Memphis and DeSoto County."
      }
    }
  ]
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LocalBusinessSchema url="https://www.memphisearthmovers.com/" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(HomeFaqSchema)}
        </script>
      </Helmet>
      
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
        <Element name="faqSection">
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
