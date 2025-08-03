
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import BlogFaq from "@/components/blog/BlogFaq";
import FaqSchema from "@/components/shared/FaqSchema";
import { Helmet } from "react-helmet-async";

const BlogList = () => {
  const canonicalUrl = "https://www.memphisearthmovers.com/blog";
  
  // Define blog-specific structured data
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Memphis Earth Movers Blog",
    "description": "Expert advice, tips, and insights about dump truck services, construction materials, and project management in the Memphis area.",
    "url": canonicalUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Memphis Earth Movers",
      "url": "https://www.memphisearthmovers.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.memphisearthmovers.com/blog/${post.slug}`,
        "name": post.title
      }))
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>

      <div className="mem-container py-12 md:py-16 relative z-10">
        <div className="bg-black/40 backdrop-blur-sm border border-mem-babyBlue/30 rounded-lg p-8 mb-12">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-white md:text-6xl">
              Memphis Earth Movers Blog
            </h1>
            <p className="text-lg text-white/90">
              Expert advice, tips, and insights about dump truck services, construction materials,
              and project management in the Memphis area.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {blogPosts.map(post => (
            <div key={post.slug} className="bg-black/40 backdrop-blur-sm border border-mem-babyBlue/30 rounded-lg overflow-hidden hover:border-mem-babyBlue/60 transition-all duration-300">
              <Card className="h-full flex flex-col bg-transparent border-0 shadow-none">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative">
                  <img 
                    src={post.slug === "best-gravel-for-your-memphis-driveway" ? "/lovable-uploads/e3dc137e-c22d-4482-b5c5-3df712a8e827.png" : post.image} 
                    alt={`${post.title} - Memphis Earth Movers`} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" 
                    width="400" 
                    height="225" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-mem-blue/30 mix-blend-overlay" aria-hidden="true"></div>
                </Link>
                <CardHeader className="pb-2">
                  <div className="text-sm text-mem-babyBlue mb-2">{post.date}</div>
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <h2 className="text-xl font-bold text-white group-hover:text-mem-babyBlue transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-white/80">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-2 mt-auto">
                  <Link to={`/blog/${post.slug}`} className="text-mem-babyBlue hover:text-white font-medium transition-colors">
                    Read More →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <BlogFaq />
      </div>
    </>
  );
};
export default BlogList;
