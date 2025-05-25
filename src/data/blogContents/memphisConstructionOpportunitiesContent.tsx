
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MemphisConstructionOpportunitiesContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the benefits of using hourly dump truck rentals in Memphis?",
      answer: "Hourly rentals offer unparalleled flexibility and cost-effectiveness, allowing projects to scale resources to fit their needs without the burden of long-term commitments."
    },
    {
      question: "How can businesses in Memphis capitalize on the current construction boom?",
      answer: "By tapping into local resources, understanding zoning regulations, and networking with industry peers, businesses can strategically identify and seize opportunities."
    },
    {
      question: "Are there incentives for new construction projects in Memphis?",
      answer: "Absolutely, Memphis offers a variety of tax incentives and grants to stimulate development and attract new projects."
    },
    {
      question: "What trends are influencing new construction in Memphis?",
      answer: "Current trends include eco-friendly building practices, the rise of mixed-use developments, and the integration of smart technology in building designs."
    },
    {
      question: "How does Memphis's location benefit construction projects?",
      answer: "Memphis's central location is a logistical dream, facilitating seamless distribution and supply chain execution, which are critical for construction efficiency."
    }
  ];

  return (
    <div className="prose prose-lg max-w-none">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <p className="text-xl mb-8 max-w-3xl mx-auto text-slate-200">
          Opportunities and Insights for Business Professionals
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <Button asChild className="bg-mem-blue hover:bg-mem-darkBlue">
            <Link to="/contact">Explore Opportunities</Link>
          </Button>
          <Button asChild variant="outline" className="border-mem-blue text-mem-blue hover:bg-mem-blue/10">
            <Link to="/dump-truck-services">View Resources</Link>
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Construction site in Memphis showing dump trucks and development" 
              className="rounded-lg shadow-xl w-full h-auto" 
              width="735" 
              height="490"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-mem-blue mb-6">The Memphis Construction Boom</h2>
            <p className="text-lg mb-6 text-slate-200">
              Imagine a city buzzing with the sounds of growth—cranes reaching for the sky, trucks rumbling along, and the palpable energy of development. Welcome to Memphis, Tennessee, where the construction industry is flourishing like never before.
            </p>
            <p className="text-lg mb-6 text-slate-200">
              This surge is not just a boon for construction companies but also a goldmine of opportunities for real estate developers and business professionals eager to tap into this vibrant market.
            </p>
            <p className="text-lg text-slate-200">
              Central to this boom are resources like <strong className="text-mem-blue">Memphis dump trucks</strong> and flexible <strong className="text-mem-blue">hourly dump truck rentals</strong>, which are the unsung heroes keeping project timelines on track and budgets in check.
            </p>
          </div>
        </div>
      </section>

      {/* Why Memphis Section */}
      <section className="mb-20">
        <div className="bg-mem-offWhite rounded-xl p-8">
          <h2 className="text-3xl font-bold text-mem-darkNavy mb-8 text-center">Why Memphis? An Emerging Hub for Development</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-mem-gray hover:shadow-lg transition-shadow">
              <div className="text-mem-blue text-4xl mb-4">
                📍
              </div>
              <h3 className="text-xl font-bold text-mem-darkNavy mb-3">Strategic Location</h3>
              <p className="text-mem-darkGray">Memphis sits at the crossroads of America with an extensive transportation network that any logistician would envy. It's the perfect hub for businesses leveraging distribution and logistics efficiencies.</p>
            </Card>
            
            <Card className="p-6 border-mem-gray hover:shadow-lg transition-shadow">
              <div className="text-mem-blue text-4xl mb-4">
                💰
              </div>
              <h3 className="text-xl font-bold text-mem-darkNavy mb-3">Government Support</h3>
              <p className="text-mem-darkGray">The city government is committed to economic development, offering favorable policies and incentives that make Memphis a recipe for construction success.</p>
            </Card>
            
            <Card className="p-6 border-mem-gray hover:shadow-lg transition-shadow">
              <div className="text-mem-blue text-4xl mb-4">
                👥
              </div>
              <h3 className="text-xl font-bold text-mem-darkNavy mb-3">Growing Workforce</h3>
              <p className="text-mem-darkGray">With a skilled labor pool and competitive wages, Memphis provides the human resources needed to fuel construction projects of all sizes.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-50 mb-8">Essential Construction Resources</h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-mem-blue mb-4">The Role of Memphis Dump Trucks in Construction Projects</h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Memphis dump truck at construction site delivering materials" 
                className="rounded-lg shadow-lg w-full h-auto" 
                width="735" 
                height="490"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2">
              <p className="mb-4 text-slate-200">Ever wonder how construction sites keep everything moving like a well-oiled machine? The key players here are dump trucks.</p>
              <p className="mb-4 text-slate-200">In Memphis, the availability of reliable <strong className="text-mem-blue">hourly dump truck rentals</strong> means projects can be completed not just efficiently, but also cost-effectively.</p>
              <p className="text-slate-200">Picture a bustling downtown Memphis project: hourly dump truck rentals were pivotal, allowing project managers to precisely adjust resources, thus optimizing both timing and costs.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-mem-darkNavy text-white rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-mem-blue mb-6">Actionable Tips for Managing Construction Resources</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-mem-blue border-opacity-30">
              <div className="flex items-center mb-3">
                <div className="bg-mem-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  📅
                </div>
                <h4 className="font-bold">Plan Ahead</h4>
              </div>
              <p>Anticipate your needs by scheduling dump truck rentals well in advance, particularly during peak construction seasons when demand spikes.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-mem-blue border-opacity-30">
              <div className="flex items-center mb-3">
                <div className="bg-mem-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  💲
                </div>
                <h4 className="font-bold">Optimize Costs</h4>
              </div>
              <p>Sharpen your negotiation skills to get the best rates and squeeze every ounce of value from your hourly rentals.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-mem-blue border-opacity-30">
              <div className="flex items-center mb-3">
                <div className="bg-mem-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  🚛
                </div>
                <h4 className="font-bold">Streamline Logistics</h4>
              </div>
              <p>Leverage technology to plot efficient truck routes and manage schedules, reducing downtime and revving up productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-50 mb-8">Case Study: The Impact of Efficient Resource Management</h2>
        
        <Card className="overflow-hidden border-mem-gray">
          <div className="md:flex">
            <div className="md:w-1/3 bg-mem-blue text-white p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Key Results</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-mem-babyBlue mr-2 mt-1">✓</span>
                  <span>15% reduction in operational costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-mem-babyBlue mr-2 mt-1">✓</span>
                  <span>30% improvement in project timeline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-mem-babyBlue mr-2 mt-1">✓</span>
                  <span>Increased client satisfaction</span>
                </li>
              </ul>
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-semibold text-mem-darkNavy mb-4">East Memphis Commercial Development</h3>
              <p className="mb-6 text-mem-darkGray">A commercial development in East Memphis cleverly utilized a fleet of Memphis dump trucks to streamline the removal of debris and the delivery of construction materials. This smart resource management significantly slashed project delays and boosted efficiency.</p>
              <p className="mb-6 text-mem-darkGray">Developers reported a striking 15% reduction in operational costs. It's a success story that underscores the financial perks of harnessing the right resources at the right time.</p>
              <div className="bg-mem-offWhite p-4 rounded-lg border-l-4 border-mem-blue">
                <p className="italic text-mem-darkGray">"The flexibility of hourly dump truck rentals allowed us to scale our operations up and down as needed, saving us significant costs while maintaining our aggressive timeline."</p>
                <p className="font-semibold mt-2 text-mem-darkNavy">— Project Manager, East Memphis Development</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Future Prospects Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-mem-darkNavy to-mem-blue text-white rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Future Prospects: Growth and Sustainability</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-mem-babyBlue mb-4">Sustainable Construction</h3>
              <p className="mb-6">The road ahead for Memphis's construction scene is promising, with growth and sustainability at its core. Environmentally friendly construction practices are no longer just a trend but a necessity, weaving sustainability into the very fabric of new projects.</p>
              <p>Professionals who keep an eye on such emerging trends and technologies will find themselves at the forefront of industry innovation.</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-mem-babyBlue mb-4">Mixed-Use Developments</h3>
              <p className="mb-6">The city also boasts a rise in mixed-use developments, seamlessly blending residential, commercial, and recreational spaces.</p>
              <p>These projects are a testament to Memphis's response to the increasing demand for urban living, opening doors to inventive construction solutions.</p>
            </div>
          </div>
          
          <div className="mt-12 bg-white bg-opacity-10 rounded-lg p-6 border border-mem-babyBlue border-opacity-30">
            <h3 className="text-xl font-semibold mb-4">Emerging Trends to Watch</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <span className="text-mem-babyBlue mr-3">🌱</span>
                <span>Green building materials</span>
              </div>
              <div className="flex items-center">
                <span className="text-mem-babyBlue mr-3">⚡</span>
                <span>Energy-efficient designs</span>
              </div>
              <div className="flex items-center">
                <span className="text-mem-babyBlue mr-3">📱</span>
                <span>Smart building technology</span>
              </div>
              <div className="flex items-center">
                <span className="text-mem-babyBlue mr-3">♻️</span>
                <span>Waste reduction strategies</span>
              </div>
              <div className="flex items-center">
                <span className="text-mem-babyBlue mr-3">💧</span>
                <span>Water conservation systems</span>
              </div>
              <div className="flex items-center">
                <span className="text-mem-babyBlue mr-3">☀️</span>
                <span>Renewable energy integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-slate-50 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index} open={openFaq === index} onOpenChange={() => toggleFaq(index)}>
              <Card className="border-mem-gray">
                <CollapsibleTrigger className="w-full p-6 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-mem-darkNavy">{faq.question}</h3>
                    <ChevronDown 
                      className={`text-mem-blue transition-transform duration-300 ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`} 
                      size={20} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <p className="text-mem-darkGray">{faq.answer}</p>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="bg-mem-darkNavy text-white rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Build in Memphis?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">The new construction landscape in Memphis is ripe with potential for those ready to take the plunge. By harnessing resources like Memphis dump trucks and honing in on strategic planning, business professionals can confidently navigate this dynamic market.</p>
        <p className="text-xl mb-10 max-w-3xl mx-auto">Staying informed and adaptable to industry trends will be key in thriving amid this wave of growth and innovation. So, are you ready to seize these opportunities?</p>
        <Button asChild className="bg-mem-blue hover:bg-mem-darkBlue text-lg py-3 px-8">
          <Link to="/contact">Contact Our Experts</Link>
        </Button>
      </section>
    </div>
  );
};

export default MemphisConstructionOpportunitiesContent;
