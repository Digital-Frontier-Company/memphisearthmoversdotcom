
import { Helmet } from "react-helmet-async";

const StructuredData = () => {
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
    <Helmet>
      <title>About Memphis Earth Movers - Reliable Dump Truck Rentals</title>
      <meta name="description" content="Memphis Earth Movers provides reliable tri-axle dump truck rentals for contractors, builders, and business owners in Memphis who need dependable hauling services." />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
