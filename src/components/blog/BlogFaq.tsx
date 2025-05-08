
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BlogFaq = () => {
  return (
    <section className="py-8 bg-mem-darkNavy text-white rounded-lg">
      <div className="px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-mem-babyBlue">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-mem-babyBlue/30">
            <AccordionTrigger className="text-left text-white hover:text-mem-babyBlue">
              How often should I check for updates on the Memphis Earth Movers blog?
            </AccordionTrigger>
            <AccordionContent className="text-white/90">
              We recommend checking our blog monthly for new articles about construction materials, 
              dump truck services, and helpful guides for your projects in the Memphis area.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-b border-mem-babyBlue/30">
            <AccordionTrigger className="text-left text-white hover:text-mem-babyBlue">
              Can I request a topic to be covered on your blog?
            </AccordionTrigger>
            <AccordionContent className="text-white/90">
              Absolutely! We welcome topic suggestions from our customers. Simply reach out through our 
              contact page with your ideas, and we'll consider them for future blog posts.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-b border-mem-babyBlue/30">
            <AccordionTrigger className="text-left text-white hover:text-mem-babyBlue">
              Do you provide advice on specific construction projects through your blog?
            </AccordionTrigger>
            <AccordionContent className="text-white/90">
              Our blog provides general guidance and information. For specific project advice,
              we recommend contacting us directly for a consultation tailored to your unique needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default BlogFaq;
