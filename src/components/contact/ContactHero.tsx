
import React from "react";

const ContactHero = () => {
  return (
    <section className="relative bg-mem-darkNavy text-white py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/5f5ed940-bb93-40f8-8281-aea0d6b01ee5.png" 
          alt="Memphis Earth Movers tri-axle dump truck on highway - professional hauling services in Memphis and DeSoto County"
          className="w-full h-full object-cover object-center" 
          width="1200"
          height="800"
        />
        <div className="absolute inset-0 bg-black/55"></div>
      </div>
      <div className="mem-container relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extra-bold mb-6 font-extrabold 
            text-[#060606] 
            drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]
            [-webkit-text-stroke:2px_white]">
            I Need a Dump Truck
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Contact Memphis Earth Movers for all your dump truck needs in Memphis and DeSoto County. 
            We're here to help with your project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
