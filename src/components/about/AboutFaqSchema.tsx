import { Helmet } from "react-helmet-async";

const AboutFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Memphis Earth Movers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Memphis Earth Movers is a local, family-owned dump truck rental and material hauling company serving Memphis, TN and DeSoto County, MS. We specialize in providing reliable dump trucks, material delivery, and hauling services for contractors, businesses, and homeowners."
        }
      },
      {
        "@type": "Question",
        "name": "How long has Memphis Earth Movers been in business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Memphis Earth Movers has been serving the Memphis area for over 10 years. Our experienced team has deep roots in the local construction industry and understands the unique needs of Memphis projects."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Memphis Earth Movers different from other hauling companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike other hauling companies in Memphis, we prioritize reliability and communication. We show up when promised, provide transparent pricing without hidden fees, and maintain a fleet of well-maintained dump trucks operated by experienced, professional drivers."
        }
      },
      {
        "@type": "Question",
        "name": "Does Memphis Earth Movers work with both commercial and residential clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we proudly serve both commercial contractors and residential homeowners throughout Memphis with the same level of professionalism and dedication. No project is too large or too small for our Memphis dump truck services."
        }
      },
      {
        "@type": "Question",
        "name": "What types of projects does Memphis Earth Movers typically work on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work on a wide variety of projects throughout Memphis including construction site material hauling, landscape material delivery, driveway and parking lot installations, demolition debris removal, storm cleanup, and much more. Our versatile Memphis dump trucks can handle virtually any hauling need."
        }
      },
      {
        "@type": "Question",
        "name": "Are Memphis Earth Movers drivers professionally trained?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All of our Memphis dump truck operators are licensed, experienced professionals with extensive training in safe hauling practices and equipment operation. Your project will always be in good hands with our Memphis team."
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

export default AboutFaqSchema;