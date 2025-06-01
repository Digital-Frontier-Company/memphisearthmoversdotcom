import { Helmet } from "react-helmet-async";

interface LocalBusinessSchemaProps {
  page: string;
  pageSpecificDesc?: string;
  url?: string;
}

const LocalBusinessSchema = ({ page, pageSpecificDesc, url }: LocalBusinessSchemaProps) => {
  // Ensure URL uses www format
  const formattedUrl = url
    ? url.replace("https://memphisearthmovers.com", "https://www.memphisearthmovers.com")
         .replace("https://memphis-earthmovers.com", "https://www.memphisearthmovers.com")
    : "https://www.memphisearthmovers.com/";
  
  // Default description if none provided
  const description = pageSpecificDesc || "Memphis Earth Movers provides reliable dump truck services, material hauling, and delivery throughout Memphis and DeSoto County.";
  
  // Page-specific titles
  let title = "Memphis Dump Truck Services | Local Hauling & Material Delivery";
  switch (page) {
    case "services":
      title = "Memphis Dump Truck Services | $125/hr | Memphis Earth Movers";
      break;
    case "hourly-rental":
      title = "Memphis Hourly Dump Truck Rental | From $125/hr";
      break;
    case "gravel-delivery":
      title = "Memphis Gravel Delivery | 15 Ton Loads for $400";
      break;
    case "blog":
      title = "Memphis Construction & Earthmoving Blog | Expert Tips";
      break;
    default:
      // Default title remains unchanged
      break;
  }
  
  // LocalBusiness schema data
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "image": "https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png",
    "logo": "https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png",
    "description": description,
    "url": "https://www.memphisearthmovers.com/",
    "telephone": "901-547-6442",
    "email": "info@memphisearthmovers.com",
    "currenciesAccepted": "USD",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2455 Corporate Ave",
      "addressLocality": "Memphis",
      "addressRegion": "TN",
      "postalCode": "38132",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.0664,
      "longitude": -89.9311
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 35.0664,
        "longitude": -89.9311
      },
      "geoRadius": 50000
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/memphisearthmovers/",
      "https://twitter.com/memphisearth",
      "https://www.instagram.com/memphisearthmovers/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dump Truck Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Hourly Dump Truck Rental",
          "description": "Hourly dump truck rental services starting at $125/hr with experienced operators included.",
          "url": "https://www.memphisearthmovers.com/hourly-dump-truck-rental"
        },
        {
          "@type": "Offer",
          "name": "Gravel Delivery",
          "description": "15-ton load gravel and milled asphalt delivery anywhere in Memphis for a flat $400.",
          "url": "https://www.memphisearthmovers.com/memphis-gravel-delivery"
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Updated metadata with optimized length and focused content */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
