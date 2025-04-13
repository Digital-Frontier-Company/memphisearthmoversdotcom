
import { Link } from "react-router-dom";
import { Truck, Check, Clock, Wrench, Star, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "description": "Reliable tri-axle dump truck rentals for contractors, builders, and business owners in Memphis.",
    "url": window.location.href,
    "telephone": "9014611011",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Memphis",
      "addressRegion": "TN",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.1495,
      "longitude": -90.0490
    },
    "priceRange": "$$",
    "service": [
      {
        "@type": "Service",
        "name": "Hourly Dump Truck Rentals",
        "description": "Perfect for heavy-duty hauls, demolition support, and site material runs."
      },
      {
        "@type": "Service",
        "name": "Gravel Hauling & Delivery",
        "description": "Asphalt millings or gravel delivered directly to your home, jobsite, or business."
      },
      {
        "@type": "Service",
        "name": "Heavy Hauling",
        "description": "Heavy hauling services for the Greater Memphis Area."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Memphis Earth Movers - Reliable Dump Truck Rentals</title>
        <meta name="description" content="Memphis Earth Movers provides reliable tri-axle dump truck rentals for contractors, builders, and business owners in Memphis who need dependable hauling services." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-100 py-12 md:py-20">
          <div className="mem-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Dump Trucks in Memphis That Show Up. Load Up. And Don't Let You Down.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-mem-darkGray">
                Reliable tri-axle dump truck rentals for contractors, builders, and business owners who are tired of the usual BS.
              </p>
              <Link to="/#contact" className="mem-btn-primary">
                <Phone className="mr-2 inline h-5 w-5" />
                Book Your Truck Now
              </Link>
            </div>
          </div>
        </section>

        {/* Why You're Frustrated Section */}
        <section className="mem-section bg-white">
          <div className="mem-container">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why You're Frustrated with Most Rentals</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="mem-card">
                <Clock className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Late Arrivals</h3>
                <p>The truck shows up an hour late (if at all), wasting your valuable time and delaying your project.</p>
              </div>
              
              <div className="mem-card">
                <Wrench className="h-10 w-10 text-red-500 mb-4" />
                <p className="text-xl font-bold mb-3">Poor Quality Equipment</p>
                <p>It's held together by duct tape and a prayer, leaving you worried about breakdowns and safety.</p>
              </div>
              
              <div className="mem-card">
                <Truck className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Inexperienced Drivers</h3>
                <p>The driver's got no clue where to go, holds up your crew, and kills your productivity.</p>
              </div>
              
              <div className="mem-card">
                <Star className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Unexpected Costs</h3>
                <p>And then it breaks down halfway through the job, leaving you holding the bag. But hey, you still get that full invoice, right?</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="mem-section bg-gray-100">
          <div className="mem-container">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">What Makes Us Different</h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-bold mb-6 text-center">We're Memphis Earth Movers. And we don't miss.</p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
                  <p className="text-lg"><span className="font-bold">Early arrivals, always.</span> Time is money. We respect both.</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
                  <p className="text-lg"><span className="font-bold">Top-tier tri-axle trucks.</span> Clean, inspected, and ready to haul.</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
                  <p className="text-lg"><span className="font-bold">Professional drivers.</span> Courteous, experienced, and site-smart.</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
                  <p className="text-lg"><span className="font-bold">No breakdowns. No bullshit.</span></p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-mem-blue mr-2 mt-1 flex-shrink-0" />
                  <p className="text-lg"><span className="font-bold">Straightforward pricing.</span> 3-hour minimum, clear costs, no surprises.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mem-section bg-white">
          <div className="mem-container">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <Truck className="h-10 w-10 inline-block mr-3 text-mem-blue" />
              Services We Offer
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="mem-card">
                <h3 className="text-xl font-bold mb-3">Hourly Dump Truck Rentals</h3>
                <p className="mb-4">(3-Hour Minimum)</p>
                <p>Perfect for heavy-duty hauls, demolition support, and site material runs.</p>
              </div>
              
              <div className="mem-card">
                <h3 className="text-xl font-bold mb-3">Gravel Hauling & Delivery</h3>
                <p>Asphalt millings or gravel delivered directly to your home, jobsite, or business. Gravel included in the price.</p>
              </div>
              
              <div className="mem-card">
                <h3 className="text-xl font-bold mb-3">Heavy Hauling</h3>
                <p>Any other Heavy Hauling Needs for the Greater Memphis Area.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mem-section bg-gray-100">
          <div className="mem-container">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <Star className="h-10 w-10 inline-block mr-3 text-mem-blue" />
              What Our Clients Say
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <blockquote className="mem-card">
                <p className="text-lg italic mb-4">"Every other company we tried sent clunkers and clueless drivers. Memphis Earth Movers actually runs like a real business. Reliable. Professional. On time. Every time."</p>
                <footer className="font-bold">– Jeff S., Site Supervisor</footer>
              </blockquote>
              
              <blockquote className="mem-card">
                <p className="text-lg italic mb-4">"They helped us stay on schedule and under budget. Can't say that about most rental crews."</p>
                <footer className="font-bold">– Erica R., Construction Project Manager</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mem-section bg-mem-blue text-white">
          <div className="mem-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Stop Dealing with Delays?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">You've got a job to run. Let us handle the hauling. Book your truck now and get back to what matters — making progress.</p>
            <p className="text-xl mb-8 font-bold">No forms. No waiting. Just trucks that show up and get it done.</p>
            <Link to="/#contact" className="bg-white text-mem-blue font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us Now
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
