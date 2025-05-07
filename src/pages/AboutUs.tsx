
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import DifferenceSection from "@/components/about/DifferenceSection";
import FrustrationSection from "@/components/about/FrustrationSection";
import ServicesSection from "@/components/about/ServicesSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import CtaSection from "@/components/about/CtaSection";
import StructuredData from "@/components/about/StructuredData";
import BackToTopButton from "@/components/BackToTopButton";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Memphis Earth Movers | Local Dump Truck Services</title>
        <meta name="description" content="Learn about Memphis Earth Movers and our commitment to reliable dump truck services in Memphis and DeSoto County. Trusted by contractors since 2010." />
      </Helmet>
      
      <StructuredData />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <AboutHero />
          <DifferenceSection />
          <FrustrationSection />
          <ServicesSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
};

export default AboutUs;
