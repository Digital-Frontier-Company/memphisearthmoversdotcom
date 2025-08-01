
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
import { Package, Truck, Clock, Shield } from "lucide-react";

const AggregateDelivery = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Aggregate Delivery Services",
    "description": "Professional aggregate and construction material delivery in Memphis, TN. Fast delivery of gravel, sand, crushed stone, and other construction materials.",
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
    "serviceType": "Construction Material Delivery",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "400",
        "priceCurrency": "USD",
        "unitText": "per 15-ton load"
      }
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of aggregates do you deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We deliver gravel, crushed stone, sand, limestone, river rock, pea gravel, asphalt millings, and other construction aggregates. All materials are sourced from certified local quarries."
        }
      },
      {
        "@type": "Question",
        "name": "How much material is in a standard delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our standard delivery is 15 tons, which typically covers about 1,350 square feet at 3-inch depth. We can also arrange smaller or larger quantities based on your needs."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can you deliver aggregates in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We typically deliver within 24-48 hours of order confirmation. Same-day delivery may be available for urgent projects depending on our schedule and material availability."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide spreading services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer professional spreading and grading services using skid-steer equipment. This ensures proper material distribution and compaction for your project."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col morphing-grid-bg">
      <Helmet>
        <title>Aggregate Delivery | Memphis Earth Movers</title>
        <meta name="description" content="Fast aggregate delivery in Memphis, TN. Quality gravel, sand, crushed stone, and construction materials delivered by experienced professionals. $400 per 15-ton load." />
        <meta name="keywords" content="aggregate delivery Memphis, gravel delivery, sand delivery, crushed stone, construction materials, Memphis Earth Movers" />
        <link rel="canonical" href="https://www.memphisearthmovers.com/services/aggregate-delivery" />
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
                  <BreadcrumbPage className="text-white">Aggregate Delivery</BreadcrumbPage>
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
                  Premium Aggregate Delivery Services in Memphis
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Quality construction materials delivered fast. From gravel and sand to specialty aggregates, 
                  we supply the materials that keep your Memphis project moving forward.
                </p>
                <Link to="/contact" className="mem-btn-primary">
                  Order Materials Today
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/2b84ef25-7937-40d5-9463-edeace1c28a6.png"
                  alt="Dump truck loaded with construction aggregates ready for delivery in Memphis"
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
                Memphis's Premier Aggregate Delivery Service
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-xl leading-relaxed mb-6">
                  Memphis Earth Movers delivers premium construction aggregates throughout Memphis and DeSoto County 
                  with unmatched reliability and quality. Our extensive material selection, combined with our 
                  efficient delivery fleet, ensures your construction, landscaping, or infrastructure project 
                  has the right materials at the right time, every time.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Available Materials</h3>
                <p className="mb-4">
                  We maintain partnerships with certified local quarries to provide the highest quality aggregates:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Gravel Varieties:</strong> #57 stone, #67 stone, pea gravel, and crusher run</li>
                  <li><strong>Sand Products:</strong> Concrete sand, masonry sand, and fill sand</li>
                  <li><strong>Crushed Stone:</strong> Various sizes from dust to large rip-rap</li>
                  <li><strong>Specialty Aggregates:</strong> River rock, limestone chips, and decorative stone</li>
                  <li><strong>Asphalt Millings:</strong> Recycled asphalt for driveways and base material</li>
                  <li><strong>Base Materials:</strong> Road base, crusher run, and stabilized aggregate</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Quality Assurance</h3>
                <p className="mb-4">
                  Every aggregate delivery from Memphis Earth Movers meets strict quality standards. We source 
                  materials exclusively from TDOT-approved quarries and conduct regular quality checks to ensure 
                  consistency, gradation, and cleanliness of all aggregates.
                </p>
                <p className="mb-6">
                  Our materials are tested for proper size distribution, compaction characteristics, and 
                  durability to meet or exceed project specifications. We provide certificates of compliance 
                  and material data sheets when required for your project documentation.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4 text-mem-darkNavy">Delivery Excellence</h3>
                <p className="mb-4">
                  Our modern fleet of tri-axle dump trucks ensures efficient, damage-free delivery to any 
                  accessible location in Memphis and surrounding areas. Our experienced drivers understand 
                  construction site protocols and work carefully to protect your property and ongoing work.
                </p>
                <p className="mb-6">
                  We coordinate delivery timing with your project schedule and can accommodate special 
                  requirements such as specific placement locations, phased deliveries, or coordination 
                  with other contractors on your job site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Material Calculator */}
        <section className="mem-section bg-mem-gray">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-8 text-mem-darkNavy">
              Material Calculator
            </h2>
            
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-mem-darkNavy">Estimate Your Material Needs</h3>
              <p className="text-gray-600 mb-6">
                Our standard 15-ton delivery covers approximately 1,350 square feet at 3-inch depth. 
                Use our calculator to estimate your needs or contact us for a custom quote.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-mem-blue/10 p-4 rounded-lg">
                  <h4 className="font-bold text-mem-darkNavy">Small Projects</h4>
                  <p className="text-sm text-gray-600">Up to 500 sq ft</p>
                  <p className="text-lg font-bold text-mem-blue">5-7 tons</p>
                </div>
                
                <div className="bg-mem-blue/10 p-4 rounded-lg">
                  <h4 className="font-bold text-mem-darkNavy">Medium Projects</h4>
                  <p className="text-sm text-gray-600">500-1,500 sq ft</p>
                  <p className="text-lg font-bold text-mem-blue">15 tons</p>
                </div>
                
                <div className="bg-mem-blue/10 p-4 rounded-lg">
                  <h4 className="font-bold text-mem-darkNavy">Large Projects</h4>
                  <p className="text-sm text-gray-600">1,500+ sq ft</p>
                  <p className="text-lg font-bold text-mem-blue">Multiple loads</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link to="/gravel-calculator" className="mem-btn-secondary">
                  Use Detailed Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mem-section bg-white">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-mem-darkNavy">
              Why Choose Our Aggregate Delivery?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-mem-gray rounded-lg">
                <Package className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Quality Materials</h3>
                <p className="text-gray-600">Premium aggregates from certified local quarries with quality guarantees</p>
              </div>
              
              <div className="text-center p-6 bg-mem-gray rounded-lg">
                <Truck className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Reliable Delivery</h3>
                <p className="text-gray-600">Modern fleet ensures on-time delivery to any accessible Memphis location</p>
              </div>
              
              <div className="text-center p-6 bg-mem-gray rounded-lg">
                <Clock className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Fast Turnaround</h3>
                <p className="text-gray-600">Same-day or next-day delivery available for most materials and locations</p>
              </div>
              
              <div className="text-center p-6 bg-mem-gray rounded-lg">
                <Shield className="mx-auto mb-4 text-mem-blue" size={48} />
                <h3 className="text-xl font-bold mb-3 text-mem-darkNavy">Competitive Pricing</h3>
                <p className="text-gray-600">Fair, transparent pricing with no hidden fees or surprise charges</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mem-section bg-mem-gray">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-mem-darkNavy">
              Customer Reviews
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <blockquote className="bg-white p-6 rounded-lg border-l-4 border-mem-blue shadow-md">
                <p className="text-gray-700 mb-4">
                  "Excellent aggregate delivery service. Quality materials, professional drivers, and always on time. 
                  We've used them for multiple projects and they never disappoint."
                </p>
                <cite className="text-mem-darkNavy font-semibold">— David Wilson, Wilson Landscaping</cite>
              </blockquote>
              
              <blockquote className="bg-white p-6 rounded-lg border-l-4 border-mem-blue shadow-md">
                <p className="text-gray-700 mb-4">
                  "Memphis Earth Movers delivered exactly what we needed for our driveway project. Great price, 
                  fast delivery, and the driver was very careful not to damage our lawn."
                </p>
                <cite className="text-mem-darkNavy font-semibold">— Susan Thompson, Homeowner</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mem-section bg-mem-darkNavy">
          <div className="mem-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Aggregate Delivery FAQ
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  What types of aggregates do you deliver?
                </h3>
                <p className="text-white/90">
                  We deliver gravel, crushed stone, sand, limestone, river rock, pea gravel, asphalt millings, 
                  and other construction aggregates. All materials are sourced from certified local quarries.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  How much material is in a standard delivery?
                </h3>
                <p className="text-white/90">
                  Our standard delivery is 15 tons, which typically covers about 1,350 square feet at 3-inch depth. 
                  We can also arrange smaller or larger quantities based on your needs.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  How quickly can you deliver aggregates in Memphis?
                </h3>
                <p className="text-white/90">
                  We typically deliver within 24-48 hours of order confirmation. Same-day delivery may be available 
                  for urgent projects depending on our schedule and material availability.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-mem-babyBlue">
                  Do you provide spreading services?
                </h3>
                <p className="text-white/90">
                  Yes, we offer professional spreading and grading services using skid-steer equipment. This ensures 
                  proper material distribution and compaction for your project.
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

export default AggregateDelivery;
