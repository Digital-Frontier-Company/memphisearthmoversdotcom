import { useState } from "react";
import { Clock, MapPin, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
}

interface TimeClockProps {
  driver: Driver;
  isClocked: boolean;
  onStatusChange: (status: boolean) => void;
}

const TimeClock = ({ driver, isClocked, onStatusChange }: TimeClockProps) => {
  const [jobAddress, setJobAddress] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClockIn = async () => {
    if (!truckNumber.trim()) {
      toast.error("Please enter truck number");
      return;
    }

    setLoading(true);
    const now = new Date();
    
    // Get local date in YYYY-MM-DD format (not UTC)
    const localDate = now.getFullYear() + '-' + 
      String(now.getMonth() + 1).padStart(2, '0') + '-' + 
      String(now.getDate()).padStart(2, '0');
    
    const { error } = await supabase
      .from("time_entries")
      .insert({
        driver_id: driver.id,
        job_address: jobAddress.trim() || null,
        job_site_id: null,
        truck_number: truckNumber.trim(),
        clock_in_time: now.toISOString(),
        date: localDate, // Fixed: Now explicitly sets the local date
      });

    if (error) {
      toast.error("Failed to clock in");
    } else {
      toast.success("Clocked in successfully!");
      onStatusChange(true);
      setJobAddress("");
      setTruckNumber("");
    }
    setLoading(false);
  };

  const handleClockOut = async () => {
    setLoading(true);
    
    // Get local date in YYYY-MM-DD format (not UTC)
    const now = new Date();
    const localDate = now.getFullYear() + '-' + 
      String(now.getMonth() + 1).padStart(2, '0') + '-' + 
      String(now.getDate()).padStart(2, '0');
    
    // Find the active time entry using LOCAL date
    const { data: activeEntry } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("date", localDate) // Fixed: Use local date instead of UTC date
      .is("clock_out_time", null)
      .single();

    if (!activeEntry) {
      toast.error("No active clock-in found");
      setLoading(false);
      return;
    }

    const clockInTime = new Date(activeEntry.clock_in_time);
    const hoursWorked = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

    const { error } = await supabase
      .from("time_entries")
      .update({
        clock_out_time: now.toISOString(),
        hours_worked: Math.round(hoursWorked * 100) / 100,
      })
      .eq("id", activeEntry.id);

    if (error) {
      toast.error("Failed to clock out");
    } else {
      toast.success(`Clocked out successfully! Hours worked: ${Math.round(hoursWorked * 100) / 100}`);
      onStatusChange(false);
    }
    setLoading(false);
  };

  return (
    <div className="mem-card">
      <div className="text-center mb-8">
        <Clock className="mx-auto mb-4 text-mem-babyBlue" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Time Clock</h2>
      </div>

      {!isClocked ? (
        <div className="space-y-6">
          <div>
            <label className="block text-white/90 mb-2">
              <MapPin className="inline mr-2" size={16} />
              Job Address (Optional)
            </label>
            <input
              type="text"
              value={jobAddress}
              onChange={(e) => setJobAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white focus:outline-none focus:ring-2 focus:ring-mem-babyBlue placeholder:text-white/50"
              placeholder="Enter job site address..."
            />
          </div>

          <div>
            <label className="block text-white/90 mb-2">
              <Truck className="inline mr-2" size={16} />
              Truck Number
            </label>
            <input
              type="text"
              value={truckNumber}
              onChange={(e) => setTruckNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white focus:outline-none focus:ring-2 focus:ring-mem-babyBlue placeholder:text-white/50"
              placeholder="Enter truck number..."
              required
            />
          </div>

          <button
            onClick={handleClockIn}
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-6 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 text-xl disabled:opacity-50"
          >
            {loading ? "Clocking In..." : "CLOCK IN"}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 mb-6">
            <div className="text-green-400 font-semibold text-lg mb-2">
              Currently Clocked In
            </div>
            <div className="text-white/90">
              Ready to clock out when your shift is complete
            </div>
          </div>

          <button
            onClick={handleClockOut}
            disabled={loading}
            className="w-full bg-red-600 text-white font-bold py-6 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 text-xl disabled:opacity-50"
          >
            {loading ? "Clocking Out..." : "CLOCK OUT"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeClock;