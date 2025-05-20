
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ContactHero from "@/components/contact/ContactHero";
import ContactForms from "@/components/contact/ContactForms";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
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
    "telephone": "(901) 461-1011",
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

// FAQ Schema
const ContactFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I request a quote for dump truck services in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can request a quote for Memphis dump truck services by filling out our online form, calling us at (901) 461-1011, or sending an email. We'll get back to you within 1 business day with pricing for your specific project needs."
      }
    },
    {
      "@type": "Question",
      "name": "What information do I need to provide for a Memphis dump truck quote?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To provide an accurate quote for Memphis dump truck services, please include your project location, timeline, material type and quantity needed, and any specific requirements. The more details you provide, the more precise our estimate will be."
      }
    },
    {
      "@type": "Question",
      "name": "How far in advance should I book a Memphis dump truck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking your Memphis dump truck at least 48 hours in advance to ensure availability. For larger projects or multiple trucks, please contact us a week ahead if possible. Same-day service may be available for urgent needs depending on our schedule."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide emergency dump truck services in Memphis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we understand that urgent situations arise and offer emergency dump truck services throughout Memphis when available. Please call us directly at (901) 461-1011 for immediate assistance with urgent hauling needs."
      }
    }
  ]
};

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Memphis Dump Truck Services | Get a Quote</title>
        <meta name="description" content="Request Memphis dump trucks for rent within 24 hours. Quick quotes for hourly dump truck rentals in Memphis. Call (901) 461-1011 for same-day service when available." />
        <meta name="keywords" content="contact Memphis dump trucks, dump truck services Memphis, Memphis dump truck quote, Memphis material hauling contact" />
        <script type="application/ld+json">
          {JSON.stringify(ContactStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(BreadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(ContactFaqSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
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
