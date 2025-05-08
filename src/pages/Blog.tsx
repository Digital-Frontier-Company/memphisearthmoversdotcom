
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogList from "@/components/blog/BlogList";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Our Blog | Memphis Earth Movers | Dump Truck Services</title>
        <meta 
          name="description" 
          content="Discover tips, guides, and insights about dump truck services, gravel, construction materials, and more on the Memphis Earth Movers blog."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://memphis-earthmovers.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://memphis-earthmovers.com/blog"
                }
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How often should I check for updates on the Memphis Earth Movers blog?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We recommend checking our blog monthly for new articles about construction materials, dump truck services, and helpful guides for your projects in the Memphis area."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I request a topic to be covered on your blog?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! We welcome topic suggestions from our customers. Simply reach out through our contact page with your ideas, and we'll consider them for future blog posts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide advice on specific construction projects through your blog?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our blog provides general guidance and information. For specific project advice, we recommend contacting us directly for a consultation tailored to your unique needs."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <Header />
      <BlogBreadcrumbs />
      <main>
        <BlogList />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
