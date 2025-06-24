
import { useState, useEffect } from "react";
import { Clock, LogOut, FileText, Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import TimeClock from "./TimeClock";
import WeeklyEarnings from "./WeeklyEarnings";
import TimeLog from "./TimeLog";
import AdminDashboard from "./AdminDashboard";

interface Driver {
  id: string;
  name: string;
  hourly_rate: number;
  role: string;
}

interface DriverDashboardProps {
  driver: Driver;
  onLogout: () => void;
}

const DriverDashboard = ({ driver, onLogout }: DriverDashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("earnings");
  const [isClocked, setIsClocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    if (driver.role === 'driver') {
      checkClockStatus();
    }
    return () => clearInterval(timer);
  }, [driver.id, driver.role]);

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

  // If admin user, show admin dashboard
  if (driver.role === 'admin') {
    return <AdminDashboard driver={driver} onLogout={onLogout} />;
  }

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
            <div className="text-green-400 font-semibold mt-2">
              Rate: ${driver.hourly_rate}/hour
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
            onClick={() => setActiveTab("earnings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === "earnings" 
                ? "bg-mem-blue text-white" 
                : "bg-white/10 text-white/70 hover:text-white"
            }`}
          >
            <DollarSign size={16} />
            Earnings
          </button>
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

      {activeTab === "earnings" && <WeeklyEarnings driver={driver} />}
      {activeTab === "clock" && (
        <TimeClock 
          driver={driver} 
          isClocked={isClocked} 
          onStatusChange={setIsClocked} 
        />
      )}
      {activeTab === "log" && <TimeLog driver={driver} />}
    </div>
  );
};

export default DriverDashboard;
