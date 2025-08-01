import React from "react";
import { Helmet } from "react-helmet-async";

const HourlyDumpTruckRentalFaqSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does hourly dump truck rental work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You contact a rental provider and request a dump truck for a specified number of hours or days. The truck comes with a qualified driver and all operating costs covered. You schedule the date/time and duration needed, and after the job, the truck leaves. You're billed for the hours of use, often with a minimum like 4 hours."
        }
      },
      {
        "@type": "Question",
        "name": "What types of dump trucks can I rent in Memphis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most rental services offer tri-axle dump trucks (3-axle rigid trucks for city work, carrying 15-18 tons per load) and tractor-trailer dump trucks (road tractor with end-dump trailer for larger volume hauls of 20-25+ tons). Tri-axles work well for tight streets while tractor-trailers handle big loads efficiently."
        }
      },
      {
        "@type": "Question",
        "name": "Is the driver included with hourly dump truck rental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hourly rentals always include a professional CDL driver as part of the package. You're hiring an operated dump truck service, not just equipment. The rental company provides a licensed, experienced driver who operates the truck per your directions."
        }
      },
      {
        "@type": "Question",
        "name": "Do I pay for fuel and other costs separately?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generally no - the rental rate is all-inclusive, covering fuel, maintenance, insurance, and typical operating costs. At Memphis Earth Movers, our hourly price includes everything except unusual situations like overtime hours or out-of-area travel."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum rental time for dump trucks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most companies have a minimum rental duration of around 4 hours. Mobilizing a truck and driver isn't practical for extremely short periods. Daily and weekly rentals are also available for ongoing work projects."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should I schedule dump truck rental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While last-minute requests can often be accommodated, scheduling as early as possible is recommended. During busy construction season, trucks get booked quickly. Memphis Earth Movers keeps standby capacity and has dispatched trucks with just hours' notice."
        }
      },
      {
        "@type": "Question",
        "name": "Is renting cheaper than owning a dump truck?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In many cases yes, especially considering indirect ownership costs. Unless you have constant daily use, renting makes better financial sense. You avoid upfront purchase costs, year-round expenses like insurance and maintenance, and inefficiency of trucks sitting idle 30-40% of the year."
        }
      },
      {
        "@type": "Question",
        "name": "Can I rent multiple dump trucks at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. For big jobs requiring multiple trucks, rental services can supply convoys. With advance notice, providers like Memphis Earth Movers can assemble dozens of trucks through their fleet and network, then return them when the project is complete."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if a rented dump truck breaks down?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The rental company handles all breakdowns as part of the service. They either fix issues on-site quickly or send backup trucks to minimize downtime. You typically won't be billed for equipment failure time. Memphis Earth Movers provides rapid response to keep projects on schedule."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default HourlyDumpTruckRentalFaqSchema;