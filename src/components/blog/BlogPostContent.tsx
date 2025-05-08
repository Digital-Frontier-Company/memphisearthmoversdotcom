
import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlogFaq from "@/components/blog/BlogFaq";

const BlogPostContent = ({ post }: { post: BlogPost }) => {
  return (
    <div className="mem-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-mem-darkNavy mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-mem-darkGray mb-6">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime} min read</span>
          </div>
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>
        </div>
        
        <div className="my-12 py-8 border-t border-b border-gray-200">
          <h3 className="text-xl font-bold text-mem-darkNavy mb-4">Need help with your project?</h3>
          <p className="mb-4">
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
  );
};

export default BlogPostContent;
