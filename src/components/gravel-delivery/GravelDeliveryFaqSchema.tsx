import { Helmet } from "react-helmet-async";

const GravelDeliveryFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many square feet will 15 tons of milled asphalt cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At a 3-inch compacted depth, one 15-ton load covers about 1,350 sq ft (roughly a 15 ft × 90 ft driveway)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I order limestone or river rock instead?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes—choose any material from Memphis-area pits; we'll haul at our standard $115/hr rate plus pit ticket."
        }
      },
      {
        "@type": "Question",
        "name": "What does the spreading service include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A skid-steer with 6-ft box blade plus operator; we laser-grade to ±½ inch and compact with the truck tires."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a fuel surcharge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fuel is baked into the $400 special. Surcharges only apply on custom hauls if diesel exceeds the DOE baseline by ≥10¢/gal."
        }
      },
      {
        "@type": "Question",
        "name": "How do I prep my site for delivery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clear overhead obstructions to 20 ft and grade a dump path at least 12 ft wide. We'll advise on the pre-haul call."
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

export default GravelDeliveryFaqSchema;