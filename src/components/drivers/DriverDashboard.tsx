import { useState, useEffect } from "react";
import { LogOut, User, Clock, Plus, Edit, DollarSign, Home, Settings } from "lucide-react";
import TimeClock from "./TimeClock";
import TimeLog from "./TimeLog";
import WeeklyHours from "./WeeklyHours";
import WeeklyEarnings from "./WeeklyEarnings";
import EditHours from "./EditHours";
import AdminDashboard from "./AdminDashboard";
import { supabase } from "@/integrations/supabase/client";

// --- START OF FIXES ---

// FIX 1: Define a constant for the target timezone for consistency.
const TIME_ZONE = 'America/Chicago';

// --- END OF FIXES ---

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
const DriverDashboard = ({
  driver,
  onLogout
}: DriverDashboardProps) => {
  if (driver.role === 'admin') {
    return <AdminDashboard driver={driver} onLogout={onLogout} />;
  }
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isClocked, setIsClocked] = useState(false);
  const [weeklyData, setWeeklyData] = useState({
    totalHours: 0,
    totalEarnings: 0
  });
  useEffect(() => {
    checkClockStatus();
    fetchWeeklyData();
  }, [driver.id]);
  const checkClockStatus = async () => {
    // FIX 2: Determine the current date in the specified timezone to prevent errors across different user timezones.
    // The 'en-CA' locale reliably gives a YYYY-MM-DD format.
    const todayInCentralTz = new Date().toLocaleDateString('en-CA', {
      timeZone: TIME_ZONE
    });
    const {
      data
    } = await supabase.from("time_entries").select("*").eq("driver_id", driver.id).eq("date", todayInCentralTz) // Check against the correct, timezone-aware date.
    .is("clock_out_time", null).single();
    setIsClocked(!!data);
  };
  const fetchWeeklyData = async () => {
    // FIX 3: Calculate the start of the week based on the current date in the US Central timezone.
    const now = new Date();
    // Create a new Date object that reflects the "wall time" in the target timezone.
    const centralNow = new Date(now.toLocaleString('en-US', {
      timeZone: TIME_ZONE
    }));
    const dayOfWeek = centralNow.getDay(); // 0=Sunday, 1=Monday, etc.
    const diff = centralNow.getDate() - dayOfWeek;
    const sunday = new Date(centralNow.setDate(diff));

    // Format the date into YYYY-MM-DD for the database query.
    const start = sunday.toISOString().split('T')[0];
    await supabase.rpc('calculate_weekly_earnings', {
      p_driver_id: driver.id,
      p_week_start: start
    });
    const {
      data
    } = await supabase.from("weekly_earnings").select("*").eq("driver_id", driver.id).eq("week_start_date", start).single();
    if (data) {
      setWeeklyData({
        totalHours: data.total_hours || 0,
        totalEarnings: data.total_earnings || 0
      });
    }
  };
  const menuItems = [{
    id: "dashboard",
    label: "Dashboard",
    icon: Home
  }, {
    id: "clock",
    label: "Clock In/Out",
    icon: Clock
  }, {
    id: "edit",
    label: "Edit Time",
    icon: Edit
  }, {
    id: "earnings",
    label: "Earnings",
    icon: DollarSign
  }, {
    id: "log",
    label: "Time Log",
    icon: Plus
  }];
  const getCurrentDate = () => {
    // FIX 4: Display the current date in the header using the US Central timezone.
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: TIME_ZONE
    });
  };

  // --- The rest of the component remains unchanged ---

  const renderDashboardView = () => <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Total Hours This Week</p>
              <p className="text-2xl font-bold text-white">{weeklyData.totalHours.toFixed(1)}</p>
              <p className="text-green-400 text-sm">↑ 4.2% from last week</p>
            </div>
            <Clock className="text-blue-400" size={24} />
          </div>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Weekly Earnings</p>
              <p className="text-2xl font-bold text-white">${weeklyData.totalEarnings.toFixed(2)}</p>
              <p className="text-green-400 text-sm">↑ $125 from last week</p>
            </div>
            <DollarSign className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Clock Status</p>
              <p className="text-2xl font-bold text-white">{isClocked ? "Clocked In" : "Clocked Out"}</p>
              <p className={`text-sm ${isClocked ? "text-green-400" : "text-slate-400"}`}>
                {isClocked ? "Currently working" : "Ready to start"}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${isClocked ? "bg-green-400" : "bg-slate-400"}`} />
          </div>
        </div>

        <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Hourly Rate</p>
              <p className="text-2xl font-bold text-white">${driver.hourly_rate}</p>
              <p className="text-slate-400 text-sm">Per hour</p>
            </div>
            <Settings className="text-purple-400" size={24} />
          </div>
        </div>
      </div>

      {/* Recent Time Entries */}
      <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Time Entries</h3>
          <button onClick={() => setActiveTab("log")} className="text-blue-400 hover:text-blue-300 text-sm">
            View All →
          </button>
        </div>
        <TimeLog driver={driver} />
      </div>
    </div>;
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardView();
      case "clock":
        // Pass the corrected checkClockStatus and fetchWeeklyData to update status and data after clocking in/out
        return <TimeClock driver={driver} isClocked={isClocked} onStatusChange={() => {
          checkClockStatus();
          fetchWeeklyData();
        }} />;
      case "edit":
        return <EditHours driver={driver} />;
      case "earnings":
        return <WeeklyEarnings driver={driver} />;
      case "log":
        return <TimeLog driver={driver} />;
      default:
        return renderDashboardView();
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/60 backdrop-blur-sm border-r border-white/10">
        {/* Logo and Company Name */}
        <div className="p-6">
          <div className="justify-center ">
            <img src="/lovable-uploads/8a4a7666-576c-423b-9b3e-9575ae58754f.png" alt="Memphis Earth Movers Logo" className="24-w-24-h-object-contain " />
            <span className="text-white font-semibold">Memphis EM</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => <li key={item.id}>
                <button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id ? "bg-white/20 backdrop-blur-sm text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
                  <item.icon size={18} />
                  {item.label}
                </button>
              </li>)}
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{driver.name}</p>
              <p className="text-xs text-white/60 capitalize">{driver.role}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-2 text-white/80 hover:text-white text-sm">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black/60 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Employee Time Tracker</h1>
              <p className="text-white/60">{getCurrentDate()}</p>
            </div>
            <button onClick={() => setActiveTab("clock")} className={`px-4 py-2 rounded-lg font-medium transition-colors ${isClocked ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}>
              {isClocked ? "Clock Out" : "Clock In"}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>;
};
export default DriverDashboard;