
import { Helmet } from "react-helmet-async";

const BlogFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I pour footings directly on treated clay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes—if post-treatment PI < 20 and bearing exceeds design loads (verified by your engineer). Many Memphis slabs sit on 6-in CTS, no piers needed."
        }
      },
      {
        "@type": "Question",
        "name": "Does lime treatment work in winter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It can, but reaction slows below 45°F. Plan for cement-based blends or wrap the season with thermal blankets."
        }
      },
      {
        "@type": "Question",
        "name": "How long before I can build on stabilized ground?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Typically 24–72 hours after final compaction. We've paved roads three days after lime, zero failures recorded."
        }
      },
      {
        "@type": "Question",
        "name": "What does soil stabilization cost in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lime treatment in Shelby County averages $4–$6 per square yard (6-inch depth). Cement runs slightly higher at $6–$8/yd²."
        }
      },
      {
        "@type": "Question",
        "name": "Is removing Memphis clay necessary for construction?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not always. Often the cheapest, greenest approach is re-engineering clay in place instead of trucking in pricey gravel. This can save approximately $2.50/yd³ versus the export-import cycle."
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

export default BlogFaqSchema;
