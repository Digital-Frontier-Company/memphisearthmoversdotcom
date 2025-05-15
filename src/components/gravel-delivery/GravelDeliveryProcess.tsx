
const GravelDeliveryProcess = () => {
  return (
    <section id="process" className="mem-section bg-white text-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-mem-darkNavy">
          How Our Gravel Delivery Works
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l border-mem-blue">
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-mem-blue rounded-full -left-4 ring-4 ring-white">
                <span className="text-white font-bold">1</span>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-mem-darkNavy">
                Book online or call
              </h3>
              <p className="mb-4 text-mem-darkGray">
                Pick a date/time window with as little as 24-hour notice.
              </p>
            </li>
            
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-mem-blue rounded-full -left-4 ring-4 ring-white">
                <span className="text-white font-bold">2</span>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-mem-darkNavy">
                Pre-haul call
              </h3>
              <p className="mb-4 text-mem-darkGray">
                We confirm drop-zone clearance (12&nbsp;ft wide × 20&nbsp;ft high) and material choice.
                Choose our $400 milled-asphalt special or any rock from over <em>10 local suppliers</em>.
              </p>
            </li>
            
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-mem-blue rounded-full -left-4 ring-4 ring-white">
                <span className="text-white font-bold">3</span>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-mem-darkNavy">
                Pit pickup or yard load
              </h3>
              <p className="mb-4 text-mem-darkGray">
                For custom rock, our driver scales at your chosen pit; hourly trucking begins once loaded.
              </p>
            </li>
            
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-mem-blue rounded-full -left-4 ring-4 ring-white">
                <span className="text-white font-bold">4</span>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-mem-darkNavy">
                Precision dump
              </h3>
              <p className="mb-4 text-mem-darkGray">
                Gate-controlled for ribbon spreads up to 30 ft (tri-axle carries 14–15 tons, 10 yd³).
              </p>
            </li>
            
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-mem-blue rounded-full -left-4 ring-4 ring-white">
                <span className="text-white font-bold">5</span>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-mem-darkNavy">
                Optional spreading
              </h3>
              <p className="text-mem-darkGray">
                Our skid-steer finishes to grade; quote on site.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryProcess;
