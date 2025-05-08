
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostBreadcrumbs from "@/components/blog/BlogPostBreadcrumbs";
import { blogPosts } from "@/data/blogPosts";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

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
  
  return (
    <>
      <Helmet>
        <title>{post.title} | Memphis Earth Movers Blog</title>
        <meta name="description" content={post.excerpt} />
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
