
import { Helmet } from "react-helmet-async";

interface LocalBusinessSchemaProps {
  page?: string;
  pageSpecificDesc?: string;
  url: string;
}

const LocalBusinessSchema = ({ page, pageSpecificDesc, url }: LocalBusinessSchemaProps) => {
  // Format URL to ensure it uses www
  const formattedUrl = url.replace("https://memphis-earthmovers.com", "https://www.memphisearthmovers.com")
                          .replace("https://memphisearthmovers.com", "https://www.memphisearthmovers.com");
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Memphis Earth Movers",
    "description": pageSpecificDesc || "Memphis Earth Movers provides reliable dump truck services and material delivery for contractors and homeowners in Memphis, TN and DeSoto County.",
    "url": formattedUrl,
    "telephone": "(901) 461-1011",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "10255 Carnegie Club Dr",
      "addressLocality": "Collierville",
      "addressRegion": "TN",
      "postalCode": "38017",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.1495,
      "longitude": -90.0490
    },
    "areaServed": [
      "Memphis", 
      "Collierville", 
      "Germantown", 
      "Bartlett", 
      "Cordova", 
      "DeSoto County"
    ],
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
        "closes": "15:00"
      }
    ],
    "priceRange": "$$$",
    "sameAs": [
      "https://www.facebook.com/memphisearthmovers",
      "https://www.instagram.com/memphisearthmovers"
    ]
  };

  // Modify page title based on current page - shortened to stay under 60 chars
  let title = "Memphis Dump Trucks | From $125/hr";
  let description = "Reliable dump truck rentals in Memphis. Local hauling, gravel delivery, and material transport throughout Memphis and DeSoto County.";
  
  if (page) {
    switch(page) {
      case "services":
        title = "Dump Truck Services Memphis | From $125/hr";
        description = "Professional dump truck services in Memphis. Hourly rentals, material hauling, and reliable delivery throughout Memphis area.";
        break;
      case "about":
        title = "About Our Memphis Dump Truck Company";
        description = "Memphis Earth Movers provides reliable tri-axle dump truck rentals for contractors in Memphis. Local, dependable, and on time.";
        break;
      case "contact":
        title = "Contact Memphis Dump Truck Services";
        description = "Need a dump truck in Memphis? Contact our team for quick quotes on dump truck rentals, material delivery, and hauling services.";
        break;
      case "calculator":
        title = "Gravel Calculator | Memphis Projects";
        description = "Calculate exactly how much gravel you need for your Memphis project. Then get it delivered with our reliable dump trucks.";
        break;
      case "blog":
        title = "Memphis Hauling & Construction Resources";
        description = "Tips and resources for Memphis contractors about gravel types, dump truck services, and construction material delivery.";
        break;
      case "gravel-delivery":
        title = "Memphis Gravel Delivery | 15 Tons for $400";
        description = "Quality gravel delivered in Memphis. 15-ton loads of milled asphalt or stone delivered to your Memphis location for a flat rate.";
        break;
      default:
        // Home page defaults set above
        break;
    }
  }

  return (
    <Helmet>
      {/* Updated metadata with optimized length and focused content */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={formattedUrl} />
      
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
