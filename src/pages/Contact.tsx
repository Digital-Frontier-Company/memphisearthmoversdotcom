
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ContactHero from "@/components/contact/ContactHero";
import ContactForms from "@/components/contact/ContactForms";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactFaqSchema from "@/components/contact/ContactFaqSchema";
import ContactBreadcrumbs from "@/components/contact/ContactBreadcrumbs";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

// Structured data for contact page
const ContactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Memphis Earth Movers",
  "description": "Contact Memphis Earth Movers for reliable dump truck services in Memphis and DeSoto County. Request a quote for your project today.",
  "url": "https://memphis-earthmovers.com/contact",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "telephone": "901-547-6442",
    "email": "info@memphis-earthmovers.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Memphis",
      "addressRegion": "TN",
      "addressCountry": "US"
    }
  }
};

// BreadcrumbList Schema
const BreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://memphis-earthmovers.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact",
      "item": "https://memphis-earthmovers.com/contact"
    }
  ]
};


const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Memphis Dump Truck Services | Get a Quote</title>
        <meta name="description" content="Request Memphis dump trucks for rent within 24 hours. Quick quotes for hourly dump truck rentals in Memphis. Call 901-547-6442 for same-day service when available." />
        <meta name="keywords" content="contact Memphis dump trucks, dump truck services Memphis, Memphis dump truck quote, Memphis material hauling contact" />
        <script type="application/ld+json">
          {JSON.stringify(ContactStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
      </Helmet>
      
      <ContactFaqSchema />
      
      <div className="min-h-screen flex flex-col morphing-grid-bg">
        <Header />
        
        <main className="flex-grow">
          <ContactHero />
          <ContactBreadcrumbs />
          <ContactForms />
          <ContactInfo />
          <ContactFaq />
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
};

export default Contact;
