
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
import BlogFaqSchema from "@/components/blog/BlogFaqSchema";
import ConstructionBoomFaqSchema from "@/components/blog/ConstructionBoomFaqSchema";
import BackToTopButton from "@/components/BackToTopButton";

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

  const canonicalUrl = `https://www.memphisearthmovers.com/blog/${post.slug}`;

  // Blog post specific FAQs
  const postFaqs = [
    {
      question: `What is the main topic of "${post.title}"?`,
      answer: post.excerpt?.substring(0, 154) || "This post covers Memphis construction topics and solutions."
    },
    {
      question: "How can I learn more about this topic?",
      answer: "You can contact Memphis Earth Movers for personalized advice about your specific project needs."
    },
    {
      question: "Does Memphis Earth Movers provide services related to this topic?",
      answer: "Yes, Memphis Earth Movers offers material delivery, dump truck rentals, and expert consultation throughout Memphis."
    }
  ];

  // Create a focused meta description based on the post
  let metaDescription = `Memphis construction insights: ${post.excerpt?.substring(0, 100) || "Expert advice on Memphis dump truck services, material selection, and local construction challenges."}`;
  
  if (post.slug === "memphis-construction-boom-shelby-county") {
    metaDescription = "Memphis dump truck services in high demand amid $16B construction boom. Learn how Shelby County projects need reliable earthmoving contractors for growing opportunities.";
  }
  
  return (
    <>
      <Helmet>
        <title>{post.title.substring(0, 58)} | Memphis Earth Movers Blog</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Social media meta tags */}
        <meta property="og:title" content={post.title.substring(0, 70)} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Additional SEO tags for construction boom post */}
        {post.slug === "memphis-construction-boom-shelby-county" && (
          <>
            <meta name="keywords" content="Memphis dump trucks for rent, Memphis construction boom, Shelby County construction projects, Memphis earthmoving services, construction equipment Memphis, dump truck rental near me" />
            <meta property="article:published_time" content="2025-05-20" />
            <meta property="article:author" content="Memphis Earth Movers" />
            <meta property="article:section" content="Construction" />
            <meta property="article:tag" content="Memphis,construction,dump trucks,earthmoving,Shelby County,Blue Oval City" />
          </>
        )}
      </Helmet>
      <FaqSchema faqs={postFaqs} url={canonicalUrl} />
      <BlogFaqSchema />
      {post.slug === "memphis-construction-boom-shelby-county" && <ConstructionBoomFaqSchema />}
      <Header />
      <BlogPostBreadcrumbs title={post.title} />
      <main>
        <BlogPostContent post={post} />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
};

export default BlogPost;
