import { Helmet } from "react-helmet-async";

const ContactFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I request a quote for dump truck services in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can request a quote for Memphis dump truck services by filling out our online form, calling us at (901) 461-1011, or sending an email. We'll get back to you within 1 business day with pricing for your specific project needs."
        }
      },
      {
        "@type": "Question",
        "name": "What information do I need to provide for a Memphis dump truck quote?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To provide an accurate quote for Memphis dump truck services, please include your project location, timeline, material type and quantity needed, and any specific requirements. The more details you provide, the more precise our estimate will be."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should I book a Memphis dump truck?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend booking your Memphis dump truck at least 48 hours in advance to ensure availability. For larger projects or multiple trucks, please contact us a week ahead if possible. Same-day service may be available for urgent needs depending on our schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide emergency dump truck services in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we understand that urgent situations arise and offer emergency dump truck services throughout Memphis when available. Please call us directly at (901) 461-1011 for immediate assistance with urgent hauling needs."
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

export default ContactFaqSchema;