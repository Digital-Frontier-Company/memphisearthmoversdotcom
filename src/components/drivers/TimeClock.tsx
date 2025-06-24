
import { useState, useEffect } from "react";
import { Clock, MapPin, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
}

interface JobSite {
  id: string;
  site_name: string;
  site_code: string;
}

interface TimeClockProps {
  driver: Driver;
  isClocked: boolean;
  onStatusChange: (status: boolean) => void;
}

const TimeClock = ({ driver, isClocked, onStatusChange }: TimeClockProps) => {
  const [jobSites, setJobSites] = useState<JobSite[]>([]);
  const [selectedJobSite, setSelectedJobSite] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobSites();
  }, []);

  const fetchJobSites = async () => {
    const { data, error } = await supabase
      .from("job_sites")
      .select("*")
      .eq("active", true)
      .order("site_name");

    if (error) {
      toast.error("Failed to load job sites");
      return;
    }

    setJobSites(data || []);
  };

  const handleClockIn = async () => {
    if (!selectedJobSite || !truckNumber.trim()) {
      toast.error("Please select a job site and enter truck number");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("time_entries")
      .insert({
        driver_id: driver.id,
        job_site_id: selectedJobSite,
        truck_number: truckNumber.trim(),
        clock_in_time: new Date().toISOString(),
      });

    if (error) {
      toast.error("Failed to clock in");
    } else {
      toast.success("Clocked in successfully!");
      onStatusChange(true);
      setSelectedJobSite("");
      setTruckNumber("");
    }
    setLoading(false);
  };

  const handleClockOut = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    // Find the active time entry
    const { data: activeEntry } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("date", today)
      .is("clock_out_time", null)
      .single();

    if (!activeEntry) {
      toast.error("No active clock-in found");
      setLoading(false);
      return;
    }

    const clockOutTime = new Date();
    const clockInTime = new Date(activeEntry.clock_in_time);
    const hoursWorked = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

    const { error } = await supabase
      .from("time_entries")
      .update({
        clock_out_time: clockOutTime.toISOString(),
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
              Job Site
            </label>
            <select
              value={selectedJobSite}
              onChange={(e) => setSelectedJobSite(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white focus:outline-none focus:ring-2 focus:ring-mem-babyBlue"
              required
            >
              <option value="">Select job site...</option>
              {jobSites.map((site) => (
                <option key={site.id} value={site.id} className="text-gray-800">
                  {site.site_name} ({site.site_code})
                </option>
              ))}
            </select>
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
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white focus:outline-none focus:ring-2 focus:ring-mem-babyBlue"
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
