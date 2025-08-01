
import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlogFaq from "@/components/blog/BlogFaq";
import { Helmet } from "react-helmet-async";

const BlogPostContent = ({
  post
}: {
  post: BlogPost;
}) => {
  // Function to share the blog post
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied to clipboard!')).catch(err => console.error('Could not copy text: ', err));
    }
  };

  // Generate a proper meta description from the excerpt
  const metaDescription = post.excerpt?.substring(0, 154) || "Learn about Memphis construction challenges and solutions from Memphis Earth Movers, your local experts in earth moving services.";

  // Create a canonical URL with www subdomain for consistency
  const canonicalUrl = `https://www.memphisearthmovers.com/blog/${post.slug}`;

  // Create proper structured data for the blog post with consistent URL format
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": metaDescription,
    "image": post.image,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Memphis Earth Movers",
      "url": "https://www.memphisearthmovers.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Memphis Earth Movers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.memphisearthmovers.com/lovable-uploads/2da56faa-05bd-417c-a73f-07299e0eff7f.png"
      },
      "url": "https://www.memphisearthmovers.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": "Memphis dump trucks, gravel delivery Memphis, dump truck capacity, Memphis construction, earthmoving services"
  };

  // Breadcrumb structured data with consistent URL format
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.memphisearthmovers.com/"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.memphisearthmovers.com/blog"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": post.title,
      "item": canonicalUrl
    }]
  };

  // Generate SEO-optimized title (under 60 characters)
  const seoTitle = post.title.length > 58 ? `${post.title.substring(0, 55)}...` : post.title;
  
  return <>
      <Helmet>
        <title>{seoTitle} | Memphis Earth Movers</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Article-specific keywords */}
        <meta name="keywords" content="Memphis dump trucks, gravel delivery Memphis, dump truck capacity, Memphis construction, earthmoving services, dump truck rental Memphis" />
        
        {/* Open Graph Tags - Enhanced */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Memphis Earth Movers" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags - Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:image:alt" content={`Featured image for ${post.title}`} />
        
        {/* Article Specific Tags */}
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:modified_time" content={new Date(post.date).toISOString()} />
        <meta property="article:section" content="Construction" />
        <meta property="article:tag" content="Memphis" />
        <meta property="article:tag" content="construction" />
        <meta property="article:tag" content="dump trucks" />
        <meta property="article:tag" content="gravel delivery" />
        <meta property="article:tag" content="earthmoving" />
        <meta property="article:author" content="Memphis Earth Movers" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(blogPostSchema)}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="mem-container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-sm">
            <h1 className="text-3xl mb-4 text-slate-50 font-extrabold md:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-mem-darkGray">
                <span className="text-slate-50">{post.date}</span>
                <span className="mx-2">•</span>
                <span className="text-slate-50">{post.readTime} min read</span>
              </div>
              <button onClick={sharePost} className="text-mem-blue hover:text-mem-darkBlue flex items-center gap-2" aria-label="Share this article">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share
              </button>
            </div>
            <div className="mb-8 relative rounded-lg overflow-hidden shadow-md">
              <img src={post.slug === "best-gravel-for-your-memphis-driveway" ? "/lovable-uploads/e3dc137e-c22d-4482-b5c5-3df712a8e827.png" : post.image} alt={`Featured image for ${post.title}`} className="w-full h-auto object-cover" width="1200" height="675" loading="eager" fetchPriority="high" />
              <div className="absolute inset-0 bg-mem-blue/30 mix-blend-overlay" aria-hidden="true"></div>
            </div>
            
            <div className="prose prose-lg max-w-none bg-mem-darkBlue">
              {post.content}
            </div>
          </div>
          
          <div className="my-12 py-8 border-t border-b border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-zinc-50">Need help with your project?</h3>
            <p className="mb-4 text-zinc-50">
              Whether you need gravel delivery or dump truck services in Memphis, our team at Memphis Earth Movers is ready to assist with your project needs.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-mem-blue hover:bg-mem-darkBlue">
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button asChild variant="outline" className="border-mem-blue text-mem-blue hover:bg-mem-blue/10">
                <Link to="/gravel-calculator">Gravel Calculator</Link>
              </Button>
            </div>
          </div>
          
          <Card className="p-6 bg-mem-offWhite border-mem-gray mb-12">
            <h3 className="text-xl font-bold text-mem-darkNavy mb-2">Related Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dump-truck-services" className="text-mem-blue hover:text-mem-darkBlue hover:underline">
                  Memphis Dump Truck Services
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-mem-blue hover:text-mem-darkBlue hover:underline">
                  About Memphis Earth Movers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-mem-blue hover:text-mem-darkBlue hover:underline">
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </Card>
          
          <BlogFaq />
        </div>
      </div>
    </>;
};
export default BlogPostContent;
