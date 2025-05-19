
import { Helmet } from "react-helmet-async";
import LocalBusinessSchema from "@/components/shared/LocalBusinessSchema";

const StructuredData = () => {
  const aboutUsSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Memphis Earth Movers",
    "description": "Memphis Earth Movers provides reliable tri-axle dump truck rentals for contractors, builders, and business owners in Memphis who need dependable hauling services.",
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": ".main-content"
    }
  };

  return (
    <>
      <LocalBusinessSchema 
        page="about"
        pageSpecificDesc="Memphis Earth Movers provides reliable tri-axle dump truck rentals for contractors, builders, and business owners in Memphis who need dependable hauling services." 
        url="https://www.memphisearthmovers.com/about-us"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(aboutUsSchema)}
        </script>
      </Helmet>
    </>
  );
};

export default StructuredData;
