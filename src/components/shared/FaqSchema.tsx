
import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSchemaProps {
  faqs: FAQItem[];
  url: string;
}

const FaqSchema = ({ faqs, url }: FaqSchemaProps) => {
  // Ensure URL uses www format
  const formattedUrl = url.replace("https://memphisearthmovers.com", "https://www.memphisearthmovers.com")
                         .replace("https://memphis-earthmovers.com", "https://www.memphisearthmovers.com");
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <link rel="canonical" href={formattedUrl} />
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default FaqSchema;
