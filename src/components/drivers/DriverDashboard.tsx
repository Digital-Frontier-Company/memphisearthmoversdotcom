import { useState, useEffect } from "react";
import { LogOut, User, Clock, Plus, Edit, DollarSign, Home, Settings } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isClocked, setIsClocked] = useState(false);
  const [weeklyData, setWeeklyData] = useState({ totalHours: 0, totalEarnings: 0 });

  useEffect(() => {
    checkClockStatus();
    fetchWeeklyData();
  }, [driver.id]);

  const checkClockStatus = async () => {
    // Get local date in YYYY-MM-DD format (not UTC)
    const now = new Date();
    const localDate = now.getFullYear() + '-' + 
      String(now.getMonth() + 1).padStart(2, '0') + '-' + 
      String(now.getDate()).padStart(2, '0');
    
    const { data } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("date", localDate) // Fixed: Use local date instead of UTC date
      .is("clock_out_time", null)
      .single();

    setIsClocked(!!data);
  };

  const fetchWeeklyData = async () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek;
    const sunday = new Date(now.setDate(diff));
    const start = sunday.toISOString().split('T')[0];
    
    // Calculate and fetch weekly earnings
    await supabase.rpc('calculate_weekly_earnings', {
      p_driver_id: driver.id,
      p_week_start: start
    });

    const { data } = await supabase
      .from("weekly_earnings")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("week_start_date", start)
      .single();

    if (data) {
      setWeeklyData({
        totalHours: data.total_hours || 0,
        totalEarnings: data.total_earnings || 0
      });
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "clock", label: "Clock In/Out", icon: Clock },
    { id: "edit", label: "Edit Time", icon: Edit },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "log", label: "Time Log", icon: Plus },
  ];

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderDashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Hours This Week</p>
              <p className="text-2xl font-bold text-white">{weeklyData.totalHours.toFixed(1)}</p>
              <p className="text-green-400 text-sm">↑ 4.2% from last week</p>
            </div>
            <Clock className="text-blue-400" size={24} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Weekly Earnings</p>
              <p className="text-2xl font-bold text-white">${weeklyData.totalEarnings.toFixed(2)}</p>
              <p className="text-green-400 text-sm">↑ $125 from last week</p>
            </div>
            <DollarSign className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Clock Status</p>
              <p className="text-2xl font-bold text-white">{isClocked ? "Clocked In" : "Clocked Out"}</p>
              <p className={`text-sm ${isClocked ? "text-green-400" : "text-slate-400"}`}>
                {isClocked ? "Currently working" : "Ready to start"}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${isClocked ? "bg-green-400" : "bg-slate-600"}`} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Hourly Rate</p>
              <p className="text-2xl font-bold text-white">${driver.hourly_rate}</p>
              <p className="text-slate-400 text-sm">Per hour</p>
            </div>
            <Settings className="text-purple-400" size={24} />
          </div>
        </div>
      </div>

      {/* Recent Time Entries */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Time Entries</h3>
          <button 
            onClick={() => setActiveTab("log")}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            View All →
          </button>
        </div>
        <TimeLog driver={driver} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardView();
      case "clock":
        return <TimeClock driver={driver} isClocked={isClocked} onStatusChange={setIsClocked} />;
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

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700">
        {/* Logo and Company Name */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MEM</span>
            </div>
            <span className="text-white font-semibold">Memphis EM</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-slate-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{driver.name}</p>
              <p className="text-xs text-slate-400 capitalize">{driver.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-slate-300 hover:text-white text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Employee Time Tracker</h1>
              <p className="text-slate-400">{getCurrentDate()}</p>
            </div>
            <button
              onClick={() => setActiveTab("clock")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isClocked
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isClocked ? "Clock Out" : "Clock In"}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;