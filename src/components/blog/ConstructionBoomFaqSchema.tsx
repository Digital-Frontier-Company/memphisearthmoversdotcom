
import { Helmet } from "react-helmet-async";

const ConstructionBoomFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How significant is Memphis's current construction boom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Memphis is experiencing a historic boom with over $16 billion in projects planned for 2024 alone. The Greater Memphis Chamber reported eleven major projects totaling over $1 billion in 2023, with 40+ additional projects in the pipeline for 2024."
        }
      },
      {
        "@type": "Question",
        "name": "What major construction projects are happening in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Significant projects include the $5.6 billion Blue Oval City EV campus, $550 million Memphis International Airport modernization, $200 million Memphis Convention Center upgrade, and the $61 million Tom Lee Park revitalization."
        }
      },
      {
        "@type": "Question",
        "name": "How is this construction boom affecting dump truck businesses in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dump truck services are in unprecedented demand, with contractors rapidly expanding their fleets and workforce to handle massive earthmoving operations. Companies with modern equipment and experienced operators are experiencing substantial growth and frequent bookings."
        }
      },
      {
        "@type": "Question",
        "name": "What infrastructure improvements are supporting Memphis's growth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tennessee is investing historic funding in Memphis infrastructure, including major road, bridge, and utility improvements. A prime example is the comprehensive overhaul of the I-55/Crump interchange designed to eliminate bottlenecks and improve traffic flow."
        }
      },
      {
        "@type": "Question",
        "name": "How is technology changing earthmoving operations in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Memphis earthmoving companies are adopting advanced technologies like GPS-guided machinery, drone surveying, and sophisticated project management software to increase efficiency, accuracy, and safety standards on major construction projects."
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

export default ConstructionBoomFaqSchema;
