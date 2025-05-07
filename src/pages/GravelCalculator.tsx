
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

const GravelCalculator = () => {
  return (
    <>
      <Helmet>
        <title>Gravel Calculator | Memphis Earth Movers</title>
        <meta name="description" content="Calculate how much gravel you need for your project with our free gravel calculator. Memphis Earth Movers provides reliable delivery services throughout Memphis." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="mem-section bg-white">
            <div className="mem-container max-w-4xl">
              <h1 className="text-mem-darkNavy text-center mb-8">Gravel Calculator</h1>
              <p className="text-mem-darkGray text-center mb-12">
                Calculate how much material you need for your project. Our calculator helps estimate the amount of gravel, sand, limestone, and other materials needed.
              </p>
              
              <div className="mem-card p-8">
                <h2 className="text-white text-xl mb-6">Estimate Your Material Needs</h2>
                <p className="text-white/80 mb-8">
                  Coming soon! Our material calculator will help you determine how much gravel, limestone, sand or other materials you need for your project. 
                  Meanwhile, please call us at (901) 461-1011 for assistance with your calculations.
                </p>
                <div className="text-center">
                  <a href="tel:9014611011" className="mem-btn-primary">
                    Call For Assistance
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
};

export default GravelCalculator;
