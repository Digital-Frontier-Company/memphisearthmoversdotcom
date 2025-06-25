
import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import TimeClock from "./TimeClock";
import TimeLog from "./TimeLog";
import WeeklyHours from "./WeeklyHours";
import WeeklyEarnings from "./WeeklyEarnings";
import EditHours from "./EditHours";
import AdminDashboard from "./AdminDashboard";
import { supabase } from "@/integrations/supabase/client";

interface Driver {
  id: string;
  name: string;
  role: string;
  hourly_rate: number;
  active: boolean;
}

interface DriverDashboardProps {
  driver: Driver;
  onLogout: () => void;
}

const DriverDashboard = ({ driver, onLogout }: DriverDashboardProps) => {
  // Show admin dashboard for ANY user with admin role
  if (driver.role === 'admin') {
    return <AdminDashboard driver={driver} onLogout={onLogout} />;
  }

  // For regular drivers only, show the regular driver interface
  const [activeTab, setActiveTab] = useState("clock");
  const [isClocked, setIsClocked] = useState(false);

  useEffect(() => {
    checkClockStatus();
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

  const tabs = [
    { id: "clock", label: "Time Clock", component: TimeClock },
    { id: "edit", label: "Edit Hours", component: EditHours },
    { id: "log", label: "Time Log", component: TimeLog },
    { id: "hours", label: "Weekly Hours", component: WeeklyHours },
    { id: "earnings", label: "Weekly Earnings", component: WeeklyEarnings },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-mem-darkNavy">
      <div className="mem-container py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <User className="text-mem-babyBlue" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome, {driver.name}</h1>
              <p className="text-white/70 capitalize">{driver.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Status Indicator */}
        {isClocked && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <div className="text-green-400 font-semibold text-center">
              🟢 Currently Clocked In
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-mem-blue text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Component */}
        <div>
          {ActiveComponent && (
            <ActiveComponent 
              driver={driver} 
              isClocked={isClocked}
              onStatusChange={setIsClocked}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
