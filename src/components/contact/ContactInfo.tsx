
import { Mail, Phone, Clock, MapPin } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="mem-container">
        <h2 className="text-mem-darkNavy text-center mb-12">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <Phone className="text-mem-blue h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-mem-darkNavy">Phone</h3>
            <p className="text-mem-darkGray">
              <a href="tel:9014611011" className="hover:text-mem-blue transition-colors">
                (901) 461-1011
              </a>
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <Mail className="text-mem-blue h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-mem-darkNavy">Email</h3>
            <p className="text-mem-darkGray">
              <a href="mailto:David@memphisearthmovers.com" className="hover:text-mem-blue transition-colors">
                David@memphisearthmovers.com
              </a>
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <Clock className="text-mem-blue h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-mem-darkNavy">Hours</h3>
            <p className="text-mem-darkGray">Monday-Friday</p>
            <p className="text-mem-darkGray">7am-5pm</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-mem-blue/10 rounded-full">
                <MapPin className="text-mem-blue h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-mem-darkNavy">Service Area</h3>
            <p className="text-mem-darkGray">Memphis, TN</p>
            <p className="text-mem-darkGray">DeSoto County, MS</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="aspect-w-16 aspect-h-7 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206775.48610502288!2d-90.11883699139228!3d35.06991783559112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d57e1eea439745%3A0xd193f315601ab6fe!2sMemphis%2C%20TN!5e0!3m2!1sen!2sus!4v1651599198603!5m2!1sen!2sus" 
              className="w-full h-96 border-0" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Memphis Earth Movers Service Area"
              aria-label="Google Maps showing Memphis Earth Movers service area"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
