import { Helmet } from "react-helmet-async";

const ServicesFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does it cost to rent a dump truck in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Memphis Earth Movers offers dump truck rentals starting at $125 per hour with a 3-hour minimum. This includes an experienced operator, fuel, and equipment. Custom pricing is available for longer projects and material deliveries."
        }
      },
      {
        "@type": "Question",
        "name": "What areas of Memphis do you provide dump truck services to?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve all of Memphis, TN and DeSoto County, MS with our dump truck services, including Germantown, Collierville, Bartlett, Cordova, Millington, Southaven, Olive Branch, Horn Lake, and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "What materials can your Memphis dump trucks deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Memphis dump truck fleet can deliver various materials including crushed gravel, pea gravel, limestone, river rock, sand, asphalt, crushed asphalt (millings), fill dirt, topsoil, and more to your Memphis location."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get a Memphis dump truck for my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For best availability of our Memphis dump trucks, we recommend booking at least 48 hours in advance. Same-day service may be available depending on our schedule. Contact us for your specific Memphis project needs."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide Memphis asphalt millings delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, asphalt millings delivery is one of our most popular services in Memphis. We offer millings at $400 delivered within 15 miles of Memphis, which is an excellent cost-effective option for driveways and parking areas."
        }
      },
      {
        "@type": "Question",
        "name": "Can I hire a Memphis dump truck for smaller residential projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We work with Memphis homeowners on residential projects like driveway resurfacing, landscaping, and backyard renovations. No Memphis project is too small for our dump truck services."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default ServicesFaqSchema;