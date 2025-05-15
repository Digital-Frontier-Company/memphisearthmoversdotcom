
const GravelDeliveryBenefits = () => {
  return (
    <section id="benefits" className="mem-section bg-white text-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-mem-darkNavy">
          Why Recycled Asphalt Millings Beat Fresh Gravel
        </h2>
        
        <ul className="max-w-3xl mx-auto space-y-6">
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mem-blue text-white flex items-center justify-center mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold text-mem-darkNavy">
                Costs 80–90% less per ton
              </p>
              <p className="text-mem-darkGray">
                Milled asphalt averages $10–$20/ton versus $100–$200 for new hot-mix.
              </p>
            </div>
          </li>
          
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mem-blue text-white flex items-center justify-center mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold text-mem-darkNavy">
                Compacts tightly
              </p>
              <p className="text-mem-darkGray">
                Forms a dust-free, storm-resistant surface that's ideal for rural drives and equipment yards.
              </p>
            </div>
          </li>
          
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mem-blue text-white flex items-center justify-center mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold text-mem-darkNavy">
                Eco-friendly
              </p>
              <p className="text-mem-darkGray">
                Diverts pavement from landfills and lowers carbon emissions per the EPA's recycled-materials guidance.
              </p>
            </div>
          </li>
          
          <li className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mem-blue text-white flex items-center justify-center mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold text-mem-darkNavy">
                TDOT-approved aggregate sizes
              </p>
              <p className="text-mem-darkGray">
                Conforms to No. 57/67 gradations for surface courses.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default GravelDeliveryBenefits;
