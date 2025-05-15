
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const GravelDeliveryPricing = () => {
  return (
    <section id="pricing" className="mem-section bg-gray-100 text-mem-darkNavy">
      <div className="mem-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-mem-darkNavy">
          Simple, Transparent Pricing
        </h2>
        
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-mem-darkNavy text-white">
                <th className="px-6 py-4 text-left">Service</th>
                <th className="px-6 py-4 text-left">Rate</th>
                <th className="px-6 py-4 text-left">What's Included</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium">15-Ton Milled Asphalt Delivery</p>
                  <p className="text-sm text-gray-500">(within 25 mi)</p>
                </td>
                <td className="px-6 py-4 font-bold text-lg">$400 / load</td>
                <td className="px-6 py-4">Material, trucking, and fuel surcharge—all in.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">On-Site Spreading</td>
                <td className="px-6 py-4">Quote after walk-through</td>
                <td className="px-6 py-4">Skid-steer, operator &amp; finish grade to ±½&nbsp;in.</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium">Custom Hauling</p>
                  <p className="text-sm text-gray-500">(any pit you choose)</p>
                </td>
                <td className="px-6 py-4">$125 / hr*</td>
                <td className="px-6 py-4">Tri-axle dump with CDL driver. *Avg. Memphis rate.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default GravelDeliveryPricing;
