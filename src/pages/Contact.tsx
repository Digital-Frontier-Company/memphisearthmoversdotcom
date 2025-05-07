
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ContactHero from "@/components/contact/ContactHero";
import ContactForms from "@/components/contact/ContactForms";
import ContactInfo from "@/components/contact/ContactInfo";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Memphis Earth Movers | Dump Truck Services</title>
        <meta name="description" content="Need a dump truck in Memphis? Contact Memphis Earth Movers for reliable dump truck services. Call (901) 461-1011 or fill out our form for a quick quote." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <ContactHero />
          <ContactForms />
          <ContactInfo />
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
};

export default Contact;
