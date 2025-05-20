
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/blog/BlogList";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";
import BackToTopButton from "@/components/BackToTopButton";
import FaqSchema from "@/components/shared/FaqSchema";

const Blog = () => {
  const canonicalUrl = "https://www.memphisearthmovers.com/blog";
  
  const faqs = [
    {
      question: "What materials does Memphis Earth Movers deliver?",
      answer: "We deliver a wide range of construction materials including crushed stone, gravel, topsoil, sand, limestone, rip rap, and recycled concrete and asphalt for various Memphis construction and landscaping projects."
    },
    {
      question: "How quickly can I get materials delivered in Memphis?",
      answer: "Most Memphis area deliveries can be scheduled within 24-48 hours of order confirmation, with same-day emergency delivery options available when our schedule permits."
    },
    {
      question: "Do you offer advice on material selection?",
      answer: "Yes, our team provides expert guidance on selecting the right materials for your specific project needs in Memphis, considering local soil conditions, weather patterns, and application requirements."
    },
    {
      question: "Can I find information about Memphis soil conditions on your blog?",
      answer: "Yes, our blog covers topics specific to Memphis construction challenges including clay soil management, optimal gravel types for local driveways, and cost-effective material solutions for Memphis projects."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Memphis Construction & Earthmoving Blog | Expert Tips</title>
        <meta name="description" content="Expert advice on Memphis construction materials, dump truck services, and soil solutions for local contractors and homeowners." />
        <meta name="keywords" content="Memphis construction blog, earthmoving tips, Memphis soil solutions, gravel delivery Memphis, construction material advice, Memphis clay soil, dump truck services" />
        
        {/* Single canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content="Memphis Construction & Earthmoving Blog | Expert Tips" />
        <meta property="og:description" content="Expert advice on Memphis construction materials, dump truck services, and soil solutions for local contractors and homeowners." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.memphisearthmovers.com/lovable-uploads/30d40068-7c8a-4348-b19b-c9a4094f24f1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Memphis Construction & Earthmoving Blog" />
        <meta name="twitter:description" content="Expert advice on Memphis construction materials, dump truck services, and soil solutions." />
        <meta name="twitter:image" content="https://www.memphisearthmovers.com/lovable-uploads/30d40068-7c8a-4348-b19b-c9a4094f24f1.png" />
      </Helmet>
      
      <LocalBusinessSchema 
        page="blog" 
        url={canonicalUrl}
        pageSpecificDesc="Expert advice on Memphis construction materials, dump truck services, and soil solutions from Memphis Earth Movers."
      />
      
      <FaqSchema 
        faqs={faqs}
        url={canonicalUrl}
      />
      
      <Header />
      
      <main>
        <BlogBreadcrumbs />
        <BlogList />
      </main>
      
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Blog;
