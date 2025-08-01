
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CallToAction from "@/components/CallToAction";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { TreePalm, Shield, Clock, MapPin, CheckCircle } from "lucide-react";

const SiteClearing = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Site Clearing Services",
    "description": "Professional land clearing and site preparation services in Memphis, TN. Expert brush removal, tree clearing, and grading for construction and development projects.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Memphis Earth Movers",
      "@id": "https://www.memphisearthmovers.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2455 Corporate Ave",
        "addressLocality": "Memphis",
        "addressRegion": "TN",
        "postalCode": "38132",
        "addressCountry": "US"
      },
      "telephone": "(901) 461-1011"
    },
    "areaServed": [
      "Memphis, TN",
      "DeSoto County, MS",
      "Shelby County, TN",
      "Germantown, TN",
      "Collierville, TN"
    ],
    "serviceType": "Land Clearing and Site Preparation"
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does site clearing include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Site clearing includes tree removal, brush clearing, stump grinding, debris removal, and basic grading to prepare land for construction or development projects."
        }
      },
      {
        "@type": "Question",
        "name": "Do you handle tree removal and stump grinding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide complete tree removal services including stump grinding. We can clear trees of all sizes and properly dispose of debris."
        }
      },
      {
        "@type": "Question",
        "name": "How long does site clearing take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project duration depends on acreage and vegetation density. Small residential lots may take 1-2 days, while larger commercial sites can take several weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Do you obtain necessary permits for land clearing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We assist with permit applications and ensure all clearing work complies with local Memphis and county regulations regarding environmental protection and erosion control."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col morphing-grid-bg">
      <Helmet>
        <title>Site Clearing Services | Memphis Earth Movers</title>
        <meta name="description" content="Professional land clearing and site preparation in Memphis, TN. Expert tree removal, brush clearing, and grading services for construction and development projects." />
        <meta name="keywords" content="site clearing Memphis, land clearing, tree removal, brush clearing, site preparation, Memphis Earth Movers" />
        <link rel="canonical" href="https://www.memphisearthmovers.com/services/site-clearing" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <section className="bg-mem-darkNavy py-4">
          <div className="mem-container">
            <Breadcrumb>
              <BreadcrumbList className="text-white">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-mem-babyBlue hover:text-white">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dump-truck-services" className="text-mem-babyBlue hover:text-white">Services</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">Site Clearing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mem-section bg-gradient-to-br from-mem-darkNavy to-mem-blue relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="mem-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                  Professional Site Clearing Services in Memphis
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Transform raw land into construction-ready sites with our comprehensive clearing services. 
                  From tree removal to final grading, we prepare your property for development.
                </p>
                <Link to="/contact" className="mem-btn-primary">
                  Get Site Assessment
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/84d27088-1fa3-4738-8bef-587ce32ecb13.jpg"
                  alt="Excavator clearing trees and brush for construction site preparation in Memphis"
                  className="w-full h-auto rounded-lg shadow-lg"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="mem-section bg-white">
          <div className="mem-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-mem-darkNavy">
                Complete Land Clearing Solutions for Memphis Developers
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-xl leading-relaxed mb-6">
                  Memphis Earth Movers transforms undeveloped land into construction-ready sites through comprehensive 
                  site clearing services. Whether you're developing residential subdivisions, commercial properties, 
                  or industrial facilities in Memphis and DeSoto County, our experienced team handles every aspect 
                  of land preparation with precision and environmental responsibility.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Our Site Clearing Services</h3>
                <p className="mb-4">
                  We provide complete land clearing solutions tailored to your development timeline and budget:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Tree Removal:</strong> Safe removal of trees of all sizes using proper techniques</li>
                  <li><strong>Brush and Undergrowth Clearing:</strong> Complete vegetation removal and disposal</li>
                  <li><strong>Stump Grinding:</strong> Professional stump removal below ground level</li>
                  <li><strong>Debris Removal:</strong> Efficient cleanup and disposal of all cleared materials</li>
                  <li><strong>Rough Grading:</strong> Initial site leveling and drainage preparation</li>
                  <li><strong>Erosion Control:</strong> Implementing measures to protect cleared areas</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Environmental Responsibility</h3>
                <p className="mb-4">
                  Memphis Earth Movers is committed to environmentally responsible land clearing practices. We follow 
                  all local Memphis and Tennessee environmental regulations, implement proper erosion control measures, 
                  and work to minimize impact on surrounding ecosystems.
                </p>
                <p className="mb-6">
                  Our team coordinates with environmental consultants when necessary and ensures proper disposal or 
                  recycling of cleared materials. We can also help preserve significant trees or natural features 
                  that enhance your development's value and environmental profile.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Project Planning and Execution</h3>
                <p className="mb-4">
                  Every site clearing project begins with a detailed site assessment and planning phase. Our team 
                  evaluates soil conditions, drainage patterns, existing vegetation, and any environmental 
                  considerations that may affect the clearing process.
                </p>
                <p className="mb-6">
                  We develop a comprehensive clearing plan that maximizes efficiency while protecting adjacent 
                  properties and environmental features. Our systematic approach ensures your site is ready for 
                  the next phase of development on schedule and within budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="mem-section bg-mem-gray">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-mem-darkNavy">
              Our Site Clearing Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-mem-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Site Assessment</h3>
                <p className="text-gray-600">Comprehensive evaluation of vegetation, topography, and environmental factors</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-mem-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Planning & Permits</h3>
                <p className="text-gray-600">Develop clearing plan and obtain necessary permits and approvals</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-mem-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Clearing Execution</h3>
                <p className="text-gray-600">Systematic removal of vegetation, trees, and debris according to plan</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="bg-mem-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Final Preparation</h3>
                <p className="text-gray-600">Site cleanup, grading, and preparation for next development phase</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mem-section bg-white">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-mem-darkNavy">
              Developer Testimonials
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <blockquote className="bg-mem-gray p-6 rounded-lg border-l-4 border-mem-blue">
                <p className="text-gray-700 mb-4">
                  "Memphis Earth Movers cleared 15 acres for our residential development. Professional work, 
                  on schedule, and they left the site perfectly prepared for our builders."
                </p>
                <cite className="text-mem-darkNavy font-semibold">— Jennifer Martinez, Sunrise Development</cite>
              </blockquote>
              
              <blockquote className="bg-mem-gray p-6 rounded-lg border-l-4 border-mem-blue">
                <p className="text-gray-700 mb-4">
                  "Excellent site clearing work on our commercial project. They handled all the environmental 
                  requirements and delivered exactly what we needed on time."
                </p>
                <cite className="text-mem-darkNavy font-semibold">— Robert Chen, Memphis Commercial Properties</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mem-section bg-mem-darkNavy">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Site Clearing FAQ
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  What does site clearing include?
                </h3>
                <p className="text-white/90">
                  Site clearing includes tree removal, brush clearing, stump grinding, debris removal, 
                  and basic grading to prepare land for construction or development projects.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  Do you handle tree removal and stump grinding?
                </h3>
                <p className="text-white/90">
                  Yes, we provide complete tree removal services including stump grinding. We can clear 
                  trees of all sizes and properly dispose of debris.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  How long does site clearing take?
                </h3>
                <p className="text-white/90">
                  Project duration depends on acreage and vegetation density. Small residential lots may 
                  take 1-2 days, while larger commercial sites can take several weeks.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  Do you obtain necessary permits for land clearing?
                </h3>
                <p className="text-white/90">
                  We assist with permit applications and ensure all clearing work complies with local Memphis 
                  and county regulations regarding environmental protection and erosion control.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default SiteClearing;
