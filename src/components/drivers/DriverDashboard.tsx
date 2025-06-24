
import { useState, useEffect } from "react";
import { Clock, LogOut, FileText, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import TimeClock from "./TimeClock";
import WeeklyHours from "./WeeklyHours";
import TimeLog from "./TimeLog";

interface Driver {
  id: string;
  name: string;
}

interface DriverDashboardProps {
  driver: Driver;
  onLogout: () => void;
}

const DriverDashboard = ({ driver, onLogout }: DriverDashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("clock");
  const [isClocked, setIsClocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    checkClockStatus();
    return () => clearInterval(timer);
  }, [driver.id]);

  const checkClockStatus = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("date", today)
      .is("clock_out_time", null)
      .single();

    setIsClocked(!!data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mem-card mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {driver.name}</h1>
            <div className="text-mem-babyBlue text-lg font-semibold">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-white/90">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-mem-gray text-white px-4 py-2 rounded-md hover:bg-mem-darkNavy transition-colors flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("clock")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === "clock" 
                ? "bg-mem-blue text-white" 
                : "bg-white/10 text-white/70 hover:text-white"
            }`}
          >
            <Clock size={16} />
            Time Clock
          </button>
          <button
            onClick={() => setActiveTab("hours")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === "hours" 
                ? "bg-mem-blue text-white" 
                : "bg-white/10 text-white/70 hover:text-white"
            }`}
          >
            <Calendar size={16} />
            Weekly Hours
          </button>
          <button
            onClick={() => setActiveTab("log")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === "log" 
                ? "bg-mem-blue text-white" 
                : "bg-white/10 text-white/70 hover:text-white"
            }`}
          >
            <FileText size={16} />
            Time Log
          </button>
        </div>

        {isClocked && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
            <div className="text-green-400 font-semibold">
              ✓ You are currently clocked in
            </div>
          </div>
        )}
      </div>

      {activeTab === "clock" && (
        <TimeClock 
          driver={driver} 
          isClocked={isClocked} 
          onStatusChange={setIsClocked} 
        />
      )}
      {activeTab === "hours" && <WeeklyHours driver={driver} />}
      {activeTab === "log" && <TimeLog driver={driver} />}
    </div>
  );
};

export default DriverDashboard;
