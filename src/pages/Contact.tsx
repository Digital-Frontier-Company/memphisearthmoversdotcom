
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForms from "@/components/contact/ContactForms";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-mem-darkNavy">
      <Helmet>
        <title>Contact Us | Memphis Earth Movers</title>
        <meta name="description" content="Get in touch with Memphis Earth Movers for dump truck services and gravel delivery. Request a truck or order gravel for your project." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <ContactHero />
        <div className="py-12">
          <ContactForms />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
