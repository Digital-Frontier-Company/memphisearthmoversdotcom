
import { Helmet } from "react-helmet-async";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";

const HourlyRentalStructuredData = () => {
  // FAQ Schema for structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much material can your trucks haul per hour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tri-axle fleet moves roughly 15 tons per trip; on short hauls (under 5 mi) that's up to 75 tons per truck per hour, weather and load-site queue permitting."
        }
      },
      {
        "@type": "Question",
        "name": "Do you supply operators or is it self-drive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We always supply CDL-certified drivers—no insurance nightmare for you and full OSHA compliance for the site."
        }
      },
      {
        "@type": "Question",
        "name": "Can I book night or weekend hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. A 20% after-hours premium applies for runs scheduled between 7 p.m. – 6 a.m. or on Sundays."
        }
      },
      {
        "@type": "Question",
        "name": "What if I need multiple trucks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can scale to six concurrent trucks; simply note the quantity in your quote request and we'll confirm availability within 30 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Do your rates include fuel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes—our hourly rate is all-in. A fuel surcharge only applies if diesel exceeds the regional DOE baseline by 10¢/gal or more."
        }
      }
    ]
  };

  // Service Schema for structured data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Hourly Dump Truck Rental",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Memphis Earth Movers",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "10255 Carnegie Club Dr",
        "addressLocality": "Collierville",
        "addressRegion": "TN",
        "postalCode": "38017",
        "addressCountry": "US"
      },
      "telephone": "(901) 461-1011"
    },
    "areaServed": [
      "Memphis", 
      "Germantown", 
      "Bartlett", 
      "Arlington", 
      "Millington", 
      "Olive Branch", 
      "Southaven",
      "DeSoto County",
      "Shelby County",
      "Tipton County",
      "Fayette County"
    ],
    "description": "Hourly dump truck rental in Memphis, TN with licensed crews, flexible scheduling, and affordable rates. Serving contractors and businesses throughout Memphis and surrounding counties.",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "125",
        "priceCurrency": "USD",
        "unitText": "HOUR",
        "validFrom": "2023-01-01"
      }
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.memphisearthmovers.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Dump Truck Services",
        "item": "https://www.memphisearthmovers.com/dump-truck-services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Hourly Dump Truck Rental",
        "item": "https://www.memphisearthmovers.com/hourly-dump-truck-rental"
      }
    ]
  };

  return (
    <>
      <LocalBusinessSchema 
        pageSpecificDesc="Hourly dump truck rental in Memphis, TN with licensed crews, flexible scheduling, and affordable rates. Book by the hour and save on construction hauling costs." 
        url="https://www.memphisearthmovers.com/hourly-dump-truck-rental"
      />
      <Helmet>
        <title>Hourly Dump Truck Rental Memphis | From $125/hr</title>
        <meta name="description" content="Need a licensed dump truck crew within hours? Memphis Earth Movers offers flexible hourly dump truck rentals in Memphis, TN with CDL-certified drivers, starting at $125/hr." />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <link rel="canonical" href="https://www.memphisearthmovers.com/hourly-dump-truck-rental" />
      </Helmet>
    </>
  );
};

export default HourlyRentalStructuredData;
