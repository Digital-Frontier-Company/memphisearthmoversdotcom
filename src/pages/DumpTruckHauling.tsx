
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import CallToAction from "@/components/CallToAction";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Truck, Clock, Shield, MapPin, CheckCircle } from "lucide-react";

const DumpTruckHauling = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dump Truck Hauling Services",
    "description": "Professional dump truck hauling services in Memphis, TN. Reliable transportation of construction materials, debris removal, and aggregate delivery with experienced CDL drivers.",
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
    "serviceType": "Construction Material Transportation",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "125",
        "priceCurrency": "USD",
        "unitText": "per hour"
      }
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of materials can your dump trucks haul?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our dump trucks can haul gravel, sand, dirt, asphalt, concrete, crushed stone, topsoil, and construction debris. We have tri-axle trucks capable of carrying up to 15-20 tons per load."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide drivers with the dump truck rental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our dump truck services include experienced CDL drivers. This ensures safety, compliance, and professional operation of the equipment."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can you respond to hauling requests in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We typically can schedule dump truck hauling within 24-48 hours. For urgent projects, same-day service may be available depending on our fleet availability."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve for dump truck hauling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve Memphis, TN and surrounding areas including DeSoto County, MS, Shelby County, Germantown, Collierville, and other communities within a 50-mile radius."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col morphing-grid-bg">
      <Helmet>
        <title>Dump Truck Hauling | Memphis Earth Movers</title>
        <meta name="description" content="Professional dump truck hauling services in Memphis, TN. Reliable material transport, debris removal, and aggregate delivery with experienced CDL drivers from $125/hr." />
        <meta name="keywords" content="dump truck hauling Memphis, material transport, debris removal, construction hauling, CDL drivers, Memphis Earth Movers" />
        <link rel="canonical" href="https://www.memphisearthmovers.com/services/dump-truck-hauling" />
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
                  <BreadcrumbPage className="text-white">Dump Truck Hauling</BreadcrumbPage>
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
                  Professional Dump Truck Hauling Services in Memphis
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Reliable material transportation and debris removal with experienced CDL drivers. 
                  From construction sites to residential projects, we deliver efficient hauling solutions.
                </p>
                <Link to="/contact" className="mem-btn-primary">
                  Get Your Quote Today
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/5b59b1da-db52-4b8c-812b-e272aeac8493.png"
                  alt="Kenworth T880 dump truck loaded with construction materials ready for hauling in Memphis"
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
                Memphis's Most Trusted Dump Truck Hauling Company
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-xl leading-relaxed mb-6">
                  When your Memphis construction project needs reliable material transportation, Memphis Earth Movers 
                  delivers professional dump truck hauling services that keep your timeline on track. Our fleet of 
                  well-maintained tri-axle dump trucks, operated by experienced CDL drivers, ensures safe and 
                  efficient transport of construction materials, aggregates, and debris throughout Memphis and DeSoto County.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">What We Haul</h3>
                <p className="mb-4">
                  Our versatile dump truck fleet can transport a wide variety of materials essential to your project's success:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Construction Aggregates:</strong> Gravel, crushed stone, sand, and limestone</li>
                  <li><strong>Soil Materials:</strong> Topsoil, fill dirt, and clay for grading and landscaping</li>
                  <li><strong>Asphalt Products:</strong> Hot mix asphalt and recycled asphalt millings</li>
                  <li><strong>Debris Removal:</strong> Construction waste, demolition materials, and site cleanup</li>
                  <li><strong>Specialty Materials:</strong> Concrete, mulch, and other project-specific materials</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Our Hauling Process</h3>
                <p className="mb-4">
                  Memphis Earth Movers follows a systematic approach to ensure every hauling job meets the highest 
                  standards of safety and efficiency. Our process begins with a detailed consultation to understand 
                  your project requirements, timeline, and specific material needs.
                </p>
                <p className="mb-6">
                  We coordinate pickup and delivery schedules that minimize disruption to your workflow while 
                  maximizing productivity. Our CDL-certified drivers are trained in proper loading techniques, 
                  safe transportation practices, and efficient unloading procedures that protect both your materials 
                  and your job site.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Service Areas</h3>
                <p className="mb-6">
                  Based in Memphis, we provide comprehensive dump truck hauling services throughout Shelby County, 
                  DeSoto County, and surrounding areas. Our local expertise means we know the most efficient routes, 
                  understand local regulations, and can navigate Memphis traffic patterns to ensure timely deliveries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mem-section bg-mem-gray">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-mem-darkNavy">
              Why Choose Memphis Earth Movers for Hauling?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Truck className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Professional Fleet</h3>
                <p className="text-gray-600">Modern tri-axle dump trucks maintained to the highest safety standards</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Clock className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Reliable Scheduling</h3>
                <p className="text-gray-600">On-time delivery and pickup to keep your project on schedule</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Shield className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Fully Insured</h3>
                <p className="text-gray-600">Comprehensive insurance coverage protects your project and materials</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <MapPin className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Local Expertise</h3>
                <p className="text-gray-600">Deep knowledge of Memphis area routes and regulations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mem-section bg-white">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-mem-darkNavy">
              Client Testimonials
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <blockquote className="bg-mem-gray p-6 rounded-lg border-l-4 border-mem-blue">
                <p className="text-gray-700 mb-4">
                  "Memphis Earth Movers handled all our material hauling for a major commercial project. 
                  Their drivers were professional, on-time, and helped us stay within budget."
                </p>
                <cite className="text-mem-darkNavy font-semibold">— Sarah Johnson, ABC Construction</cite>
              </blockquote>
              
              <blockquote className="bg-mem-gray p-6 rounded-lg border-l-4 border-mem-blue">
                <p className="text-gray-700 mb-4">
                  "Reliable service and competitive pricing. They've been our go-to for dump truck hauling 
                  for over three years. Highly recommend for any Memphis construction project."
                </p>
                <cite className="text-mem-darkNavy font-semibold">— Mike Rodriguez, Rodriguez Contractors</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mem-section bg-mem-darkNavy">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  What types of materials can your dump trucks haul?
                </h3>
                <p className="text-white/90">
                  Our dump trucks can haul gravel, sand, dirt, asphalt, concrete, crushed stone, topsoil, 
                  and construction debris. We have tri-axle trucks capable of carrying up to 15-20 tons per load.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  Do you provide drivers with the dump truck rental?
                </h3>
                <p className="text-white/90">
                  Yes, all our dump truck services include experienced CDL drivers. This ensures safety, 
                  compliance, and professional operation of the equipment.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  How quickly can you respond to hauling requests in Memphis?
                </h3>
                <p className="text-white/90">
                  We typically can schedule dump truck hauling within 24-48 hours. For urgent projects, 
                  same-day service may be available depending on our fleet availability.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  What areas do you serve for dump truck hauling?
                </h3>
                <p className="text-white/90">
                  We serve Memphis, TN and surrounding areas including DeSoto County, MS, Shelby County, 
                  Germantown, Collierville, and other communities within a 50-mile radius.
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

export default DumpTruckHauling;
