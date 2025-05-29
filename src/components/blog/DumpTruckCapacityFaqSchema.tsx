
import { Helmet } from "react-helmet-async";

const DumpTruckCapacityFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many cubic yards of gravel can a dump truck carry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard tandem dump trucks in Memphis carry 10–12 cubic yards of gravel (about 14–17 tons), while super-dumps can handle up to 16 cubic yards."
        }
      },
      {
        "@type": "Question",
        "name": "What are Memphis road weight limits during spring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shelby County spring road bans typically limit dump-truck loads to approximately 18 tons to protect soft pavement."
        }
      },
      {
        "@type": "Question",
        "name": "Can I rent a dump truck without a CDL in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most rental companies require a CDL-A driver for trucks over 26,001 lb GVWR, so plan to hire a licensed operator or book full-service hauling."
        }
      },
      {
        "@type": "Question",
        "name": "What landscaping materials can Memphis Earth Movers deliver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We deliver topsoil, river rock, masonry sand, gravel, and recycled asphalt millings throughout the Memphis area."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should I book dump truck services in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At least 48 hours for weekday deliveries; a full week for Saturday delivery slots during peak construction season."
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

export default DumpTruckCapacityFaqSchema;
