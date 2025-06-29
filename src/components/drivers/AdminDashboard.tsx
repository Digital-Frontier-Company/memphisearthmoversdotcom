import { useState, useEffect } from "react";
import { User, LogOut, Clock, FileText, Edit3, Archive } from "lucide-react";
import TimeClock from "./TimeClock";
import TimeLog from "./TimeLog";
import WeeklyHours from "./WeeklyHours";
import WeeklyEarnings from "./WeeklyEarnings";
import EditHours from "./EditHours";
import ArchivedData from "./ArchivedData";
import { supabase } from "@/integrations/supabase/client";

interface Driver {
  id: string;
  name: string;
  role?: string;
  hourly_rate: number;
}

interface AdminDashboardProps {
  driver: Driver;
  onLogout: () => void;
}

const AdminDashboard = ({ driver, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'clock' | 'log' | 'hours' | 'earnings' | 'edit' | 'archive'>('clock');
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

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'clock':
        return <TimeClock driver={driver} isClocked={isClocked} onStatusChange={setIsClocked} />;
      case 'log':
        return <TimeLog driver={driver} />;
      case 'hours':
        return <WeeklyHours driver={driver} />;
      case 'earnings':
        return <WeeklyEarnings driver={driver} />;
      case 'edit':
        return <EditHours driver={driver} />;
      case 'archive':
        return <ArchivedData />;
      default:
        return <TimeClock driver={driver} isClocked={isClocked} onStatusChange={setIsClocked} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mem-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="text-mem-babyBlue" size={24} />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/80">Welcome back, {driver.name}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mem-card">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('clock')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'clock'
                ? 'bg-mem-babyBlue text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Clock size={16} />
            <span>Time Clock</span>
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'log'
                ? 'bg-mem-babyBlue text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FileText size={16} />
            <span>Time Log</span>
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'hours'
                ? 'bg-mem-babyBlue text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Clock size={16} />
            <span>Weekly Hours</span>
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'earnings'
                ? 'bg-mem-babyBlue text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FileText size={16} />
            <span>Weekly Earnings</span>
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'edit'
                ? 'bg-mem-babyBlue text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Edit3 size={16} />
            <span>Edit Hours</span>
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              activeTab === 'archive'
                ? 'bg-mem-babyBlue text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Archive size={16} />
            <span>Archive</span>
          </button>
        </div>
      </div>

      {/* Active Component */}
      {renderActiveComponent()}
    </div>
  );
};

export default AdminDashboard;
