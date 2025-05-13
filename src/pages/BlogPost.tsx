
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostBreadcrumbs from "@/components/blog/BlogPostBreadcrumbs";
import { blogPosts } from "@/data/blogPosts";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import FaqSchema from "@/components/shared/FaqSchema";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(post => post.slug === slug);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // If post doesn't exist, navigate to blog listing
  if (!post) {
    return <Navigate to="/blog" />;
  }

  // Blog post specific FAQs
  const postFaqs = [
    {
      question: `What is the main topic of "${post.title}"?`,
      answer: post.excerpt
    },
    {
      question: "How can I learn more about this topic?",
      answer: "You can contact Memphis Earth Movers for personalized advice about your specific project needs. Our team of experts can provide guidance tailored to your situation."
    },
    {
      question: "Does Memphis Earth Movers provide services related to this topic?",
      answer: "Yes, Memphis Earth Movers offers a range of services including material delivery, dump truck rentals, and expert consultation on construction and landscaping materials throughout Memphis and DeSoto County."
    }
  ];
  
  const canonicalUrl = `https://memphis-earthmovers.com/blog/${post.slug}`;
  
  return (
    <>
      <Helmet>
        <title>{post.title} | Memphis Earth Movers Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title}",
              "image": "${post.image}",
              "author": {
                "@type": "Organization",
                "name": "Memphis Earth Movers"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Memphis Earth Movers",
                "logo": {
                  "@type": "ImageObject",
                  "url": "/lovable-uploads/2815d7b7-489c-42c6-a5f2-45c7e47f6371.png"
                }
              },
              "datePublished": "${post.date}",
              "dateModified": "${post.date}"
            }
          `}
        </script>
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
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "${post.title}",
                  "item": "https://memphis-earthmovers.com/blog/${post.slug}"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <FaqSchema faqs={postFaqs} url={canonicalUrl} />
      <Header />
      <BlogPostBreadcrumbs title={post.title} />
      <main>
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
