
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
import MemphisConstructionFaqSchema from "@/components/blog/MemphisConstructionFaqSchema";
import DumpTruckCapacityFaqSchema from "@/components/blog/DumpTruckCapacityFaqSchema";
import HourlyDumpTruckRentalFaqSchema from "@/components/blog/HourlyDumpTruckRentalFaqSchema";
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

  if (post.slug === "navigating-new-construction-memphis-opportunities") {
    metaDescription = "Discover Memphis construction boom opportunities for business professionals. Learn about dump truck rentals, strategic resources, and emerging development trends.";
  }

  if (post.slug === "dump-truck-gravel-capacity-memphis") {
    metaDescription = "Learn cubic-yard and ton capacities for Memphis dump trucks. Complete guide to choosing the right earth-mover truck, calculating materials, and comparing hauling services in Memphis area.";
  }

  if (post.slug === "dump-truck-headaches-rent-by-hour-memphis") {
    metaDescription = "Stop dealing with dump truck breakdowns, driver no-shows, and maintenance costs. Learn why Memphis contractors are switching to hourly dump truck rentals for flexible, cost-effective hauling solutions.";
  }

  // Generate SEO-optimized title (under 60 characters)
  const seoTitle = post.title.length > 58 ? `${post.title.substring(0, 55)}...` : post.title;
  
  return (
    <div className="min-h-screen flex flex-col morphing-grid-bg">
      <Helmet>
        <title>{`${seoTitle} | Memphis Earth Movers`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${seoTitle} | Memphis Earth Movers`} />
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

        {/* Additional SEO tags for construction opportunities post */}
        {post.slug === "navigating-new-construction-memphis-opportunities" && (
          <>
            <meta name="keywords" content="Memphis construction opportunities, Memphis dump truck rental, hourly dump truck rentals Memphis, Memphis construction boom, business opportunities Memphis, construction resources Memphis" />
            <meta property="article:published_time" content="2025-05-25" />
            <meta property="article:author" content="Memphis Earth Movers" />
            <meta property="article:section" content="Construction" />
            <meta property="article:tag" content="Memphis,construction,dump trucks,earthmoving,business opportunities" />
          </>
        )}

        {/* Additional SEO tags for dump truck capacity post */}
        {post.slug === "dump-truck-gravel-capacity-memphis" && (
          <>
            <meta name="keywords" content="dump truck capacity Memphis, cubic yard capacity, ton capacity dump truck, gravel delivery Memphis, material hauling capacity, Memphis earthmoving" />
            <meta property="article:published_time" content="2025-06-15" />
            <meta property="article:author" content="Memphis Earth Movers" />
            <meta property="article:section" content="Equipment Guide" />
            <meta property="article:tag" content="Memphis,dump truck,capacity,gravel,materials" />
          </>
        )}

        {/* Additional SEO tags for hourly dump truck rental post */}
        {post.slug === "dump-truck-headaches-rent-by-hour-memphis" && (
          <>
            <meta name="keywords" content="hourly dump truck rental Memphis, Memphis dump truck rental, dump truck headaches, dump truck rental by hour, Memphis construction rentals, dump truck services Memphis" />
            <meta property="article:published_time" content="2025-08-01" />
            <meta property="article:author" content="Memphis Earth Movers" />
            <meta property="article:section" content="Equipment Rental" />
            <meta property="article:tag" content="Memphis,dump truck rental,hourly rental,construction equipment,cost savings" />
          </>
        )}
      </Helmet>
      <FaqSchema faqs={postFaqs} url={canonicalUrl} />
      <BlogFaqSchema />
      {post.slug === "memphis-construction-boom-shelby-county" && <ConstructionBoomFaqSchema />}
      {post.slug === "navigating-new-construction-memphis-opportunities" && <MemphisConstructionFaqSchema />}
      {post.slug === "dump-truck-gravel-capacity-memphis" && <DumpTruckCapacityFaqSchema />}
      {post.slug === "dump-truck-headaches-rent-by-hour-memphis" && <HourlyDumpTruckRentalFaqSchema />}
      <Header />
      <BlogPostBreadcrumbs title={post.title} />
      <main className="flex-grow">
        <BlogPostContent post={post} />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default BlogPost;
