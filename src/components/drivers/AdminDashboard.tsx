
import { useState, useEffect } from "react";
import { Users, DollarSign, Clock, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Driver {
  id: string;
  name: string;
  hourly_rate: number;
  role: string;
}

interface AdminDashboardProps {
  driver: Driver;
  onLogout: () => void;
}

interface DriverData {
  id: string;
  name: string;
  hourly_rate: number;
  totalHours: number;
  totalEarnings: number;
  lastActivity: string;
}

const AdminDashboard = ({ driver, onLogout }: AdminDashboardProps) => {
  const [driversData, setDriversData] = useState<DriverData[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllDriversData();
  }, []);

  const fetchAllDriversData = async () => {
    // Get all active drivers (excluding admin)
    const { data: drivers, error: driversError } = await supabase
      .from("drivers")
      .select("*")
      .eq("active", true)
      .eq("role", "driver");

    if (driversError) {
      console.error("Failed to fetch drivers:", driversError);
      setLoading(false);
      return;
    }

    const driversWithData: DriverData[] = [];

    for (const driverRecord of drivers || []) {
      // Calculate current week earnings for each driver
      const { start } = getWeekDates();
      
      await supabase.rpc('calculate_weekly_earnings', {
        p_driver_id: driverRecord.id,
        p_week_start: start
      });

      // Get weekly earnings
      const { data: earnings } = await supabase
        .from("weekly_earnings")
        .select("*")
        .eq("driver_id", driverRecord.id)
        .eq("week_start_date", start)
        .single();

      // Get last activity
      const { data: lastEntry } = await supabase
        .from("time_entries")
        .select("created_at")
        .eq("driver_id", driverRecord.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      driversWithData.push({
        id: driverRecord.id,
        name: driverRecord.name,
        hourly_rate: driverRecord.hourly_rate || 0,
        totalHours: earnings?.total_hours || 0,
        totalEarnings: earnings?.total_earnings || 0,
        lastActivity: lastEntry?.created_at || "No activity"
      });
    }

    setDriversData(driversWithData);
    setLoading(false);
  };

  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek;
    const sunday = new Date(now.setDate(diff));
    
    return {
      start: sunday.toISOString().split('T')[0]
    };
  };

  if (loading) {
    return (
      <div className="mem-card text-center">
        <div className="text-white/90">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mem-card mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard - {driver.name}</h1>
            <p className="text-mem-babyBlue">Overview of all drivers and their earnings</p>
          </div>
          <Button onClick={onLogout} variant="outline" className="bg-mem-gray text-white hover:bg-mem-darkNavy">
            Logout
          </Button>
        </div>
      </div>

      <div className="mem-card">
        <div className="flex items-center gap-2 mb-6">
          <Users className="text-mem-babyBlue" size={24} />
          <h2 className="text-xl font-bold text-white">All Drivers Overview</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-mem-babyBlue/30">
                <th className="text-left py-3 px-4">Driver Name</th>
                <th className="text-left py-3 px-4">Hourly Rate</th>
                <th className="text-left py-3 px-4">This Week Hours</th>
                <th className="text-left py-3 px-4">This Week Earnings</th>
                <th className="text-left py-3 px-4">Last Activity</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {driversData.map((driverData) => (
                <tr key={driverData.id} className="border-b border-mem-babyBlue/10 hover:bg-white/5">
                  <td className="py-3 px-4 font-semibold">{driverData.name}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-400">${driverData.hourly_rate.toFixed(2)}/hr</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-mem-babyBlue" />
                      {driverData.totalHours.toFixed(2)}h
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} className="text-green-400" />
                      <span className="font-semibold text-green-400">
                        ${driverData.totalEarnings.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/70">
                    {driverData.lastActivity !== "No activity" 
                      ? new Date(driverData.lastActivity).toLocaleDateString()
                      : "No activity"
                    }
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-mem-blue/20 text-mem-babyBlue hover:bg-mem-blue/40"
                      onClick={() => setSelectedDriver(driverData.id)}
                    >
                      <Eye size={16} className="mr-1" />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {driversData.length === 0 && (
          <div className="text-center text-white/70 py-8">
            No driver data available
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
