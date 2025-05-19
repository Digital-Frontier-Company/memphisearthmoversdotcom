import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import BlogFaq from "@/components/blog/BlogFaq";
const BlogList = () => {
  return <div className="mem-container py-12 md:py-16">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-slate-50 md:text-6xl">
          Memphis Earth Movers Blog
        </h1>
        <p className="text-lg text-slate-50">
          Expert advice, tips, and insights about dump truck services, construction materials,
          and project management in the Memphis area.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {blogPosts.map(post => <Card key={post.slug} className="h-full flex flex-col border border-mem-gray hover:shadow-lg transition-shadow">
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
            </Link>
            <CardHeader className="pb-2">
              <div className="text-sm text-mem-darkGray mb-2">{post.date}</div>
              <Link to={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-bold text-mem-darkNavy group-hover:text-mem-blue transition-colors">
                  {post.title}
                </h2>
              </Link>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-mem-darkGray">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="pt-2 mt-auto">
              <Link to={`/blog/${post.slug}`} className="text-mem-blue hover:text-mem-darkBlue font-medium transition-colors">
                Read More →
              </Link>
            </CardFooter>
          </Card>)}
      </div>

      <BlogFaq />
    </div>;
};
export default BlogList;