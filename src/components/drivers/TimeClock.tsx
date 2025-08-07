import { useState, useEffect } from "react";
import { Clock, MapPin, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Use America/Chicago for Central Time (handles CST/CDT automatically)
const TIME_ZONE = 'America/Chicago';

interface Driver {
  id: string;
  name: string;
  hourly_rate: number;
}

interface TimeClockProps {
  driver: Driver;
  isClocked: boolean;
  onStatusChange: () => void;
}

const TimeClock = ({ driver, isClocked, onStatusChange }: TimeClockProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [truckNumber, setTruckNumber] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    fetchCurrentEntry();
    return () => clearInterval(timer);
  }, [driver.id]);

  // Get the current date in Central Time zone
  const getCentralDate = () => {
    return new Date().toLocaleDateString('en-CA', { 
      timeZone: TIME_ZONE 
    }); // en-CA gives YYYY-MM-DD format
  };

  // Get current time as ISO string (UTC)
  const getCurrentTimeUTC = () => {
    return new Date().toISOString();
  };

  const fetchCurrentEntry = async () => {
    const todayDate = getCentralDate();
    
    const { data } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("date", todayDate)
      .is("clock_out_time", null)
      .single();

    if (data) {
      setCurrentEntry(data);
      setTruckNumber(data.truck_number || "");
      setJobAddress(data.job_address || "");
    }
  };

  const handleClockIn = async () => {
    if (!truckNumber.trim()) {
      toast.error("Please enter truck number");
      return;
    }

    setLoading(true);
    const todayDate = getCentralDate();
    const currentTimeUTC = getCurrentTimeUTC();

    // First check if there's already an open entry for today
    const { data: existingEntry } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("date", todayDate)
      .is("clock_out_time", null)
      .single();

    if (existingEntry) {
      toast.error("You are already clocked in!");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("time_entries")
      .insert({
        driver_id: driver.id,
        date: todayDate,
        clock_in_time: currentTimeUTC,
        truck_number: truckNumber.trim(),
        job_address: jobAddress.trim() || null,
      })
      .select()
      .single();

    if (error) {
      toast.error(`Failed to clock in: ${error.message}`);
    } else {
      toast.success("Successfully clocked in!");
      setCurrentEntry(data);
      onStatusChange();
    }

    setLoading(false);
  };

  const handleClockOut = async () => {
    if (!currentEntry) {
      toast.error("No active clock-in found");
      return;
    }

    setLoading(true);
    const currentTimeUTC = getCurrentTimeUTC();
    
    // Calculate hours worked
    const clockInTime = new Date(currentEntry.clock_in_time);
    const clockOutTime = new Date(currentTimeUTC);
    const hoursWorked = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
    const roundedHours = Math.round(hoursWorked * 100) / 100;

    const { error } = await supabase
      .from("time_entries")
      .update({
        clock_out_time: currentTimeUTC,
        hours_worked: roundedHours,
        truck_number: truckNumber.trim() || currentEntry.truck_number,
        job_address: jobAddress.trim() || currentEntry.job_address,
      })
      .eq("id", currentEntry.id);

    if (error) {
      toast.error(`Failed to clock out: ${error.message}`);
    } else {
      toast.success(`Successfully clocked out! Hours worked: ${roundedHours.toFixed(2)}`);
      setCurrentEntry(null);
      setTruckNumber("");
      setJobAddress("");
      onStatusChange();
    }

    setLoading(false);
  };

  // Format time for display in Central Time
  const formatTimeForDisplay = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: TIME_ZONE,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: TIME_ZONE,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="text-center mb-8">
        <Clock className="mx-auto mb-4 text-blue-400" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Time Clock</h2>
        <p className="text-slate-400">Clock in and out to track your hours</p>
      </div>

      {/* Live Clock Display */}
      <div className="bg-slate-900/50 rounded-lg p-6 mb-6 text-center border border-slate-600">
        <div className="text-4xl font-bold text-blue-400 mb-2 font-mono">
          {formatTimeForDisplay(currentTime)}
        </div>
        <div className="text-slate-300">
          {formatDateForDisplay(currentTime)}
        </div>
        <div className="text-sm text-slate-400 mt-2">
          Central Time (CT)
        </div>
      </div>

      {/* Current Status */}
      {isClocked && currentEntry && (
        <div className="bg-blue-600/20 rounded-lg p-4 mb-6 border border-blue-500/30">
          <div className="text-center">
            <div className="text-green-400 font-semibold mb-2">Currently Clocked In</div>
            <div className="text-slate-300 text-sm">
              Since: {new Date(currentEntry.clock_in_time).toLocaleTimeString('en-US', {
                timeZone: TIME_ZONE,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            {currentEntry.truck_number && (
              <div className="text-slate-300 text-sm">
                Truck: {currentEntry.truck_number}
              </div>
            )}
            {currentEntry.job_address && (
              <div className="text-slate-300 text-sm">
                Location: {currentEntry.job_address}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="flex items-center text-slate-300 mb-2">
            <Truck className="mr-2" size={16} />
            Truck Number *
          </label>
          <input
            type="text"
            value={truckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter truck number (e.g., TRUCK-01)"
            disabled={isClocked && currentEntry}
          />
        </div>

        <div>
          <label className="flex items-center text-slate-300 mb-2">
            <MapPin className="mr-2" size={16} />
            Job Address (Optional)
          </label>
          <input
            type="text"
            value={jobAddress}
            onChange={(e) => setJobAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job site address"
          />
        </div>
      </div>

      {/* Clock In/Out Button */}
      <button
        onClick={isClocked ? handleClockOut : handleClockIn}
        disabled={loading || (!isClocked && !truckNumber.trim())}
        className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 ${
          isClocked
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <Clock className="mr-2" size={20} />
            {isClocked ? "Clock Out" : "Clock In"}
          </span>
        )}
      </button>

      {/* Helper Text */}
      <div className="mt-4 text-center">
        <p className="text-slate-400 text-sm">
          {isClocked 
            ? "Remember to clock out when you finish your shift"
            : "Enter truck number and click Clock In to start tracking"}
        </p>
      </div>
    </div>
  );
};

export default TimeClock;