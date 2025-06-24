
import { useState, useEffect } from "react";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Driver {
  id: string;
  name: string;
  hourly_rate: number;
  role: string;
}

interface WeeklyEarningsProps {
  driver: Driver;
}

const WeeklyEarnings = ({ driver }: WeeklyEarningsProps) => {
  const [weeklyData, setWeeklyData] = useState({
    totalHours: 0,
    regularHours: 0,
    overtimeHours: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyEarnings();
  }, [driver.id]);

  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek;
    const sunday = new Date(now.setDate(diff));
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    
    return {
      start: sunday.toISOString().split('T')[0],
      end: saturday.toISOString().split('T')[0]
    };
  };

  const fetchWeeklyEarnings = async () => {
    const { start } = getWeekDates();
    
    // First, calculate and store current week earnings
    const { error: calcError } = await supabase.rpc('calculate_weekly_earnings', {
      p_driver_id: driver.id,
      p_week_start: start
    });

    if (calcError) {
      console.error("Failed to calculate weekly earnings:", calcError);
    }

    // Then fetch the stored earnings data
    const { data, error } = await supabase
      .from("weekly_earnings")
      .select("*")
      .eq("driver_id", driver.id)
      .eq("week_start_date", start)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Failed to fetch weekly earnings:", error);
      setLoading(false);
      return;
    }

    if (data) {
      setWeeklyData({
        totalHours: data.total_hours || 0,
        regularHours: data.regular_hours || 0,
        overtimeHours: data.overtime_hours || 0,
        totalEarnings: data.total_earnings || 0
      });
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="mem-card text-center">
        <div className="text-white/90">Loading weekly earnings...</div>
      </div>
    );
  }

  return (
    <div className="mem-card">
      <div className="text-center mb-8">
        <DollarSign className="mx-auto mb-4 text-mem-babyBlue" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Weekly Earnings</h2>
        <p className="text-white/90">Current week summary</p>
        <div className="text-mem-babyBlue font-semibold mt-2">
          Hourly Rate: ${driver.hourly_rate}/hour
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-mem-blue/20 rounded-lg p-6 text-center">
          <Clock className="mx-auto mb-2 text-mem-babyBlue" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            {weeklyData.totalHours.toFixed(2)}
          </div>
          <div className="text-white/90">Total Hours</div>
        </div>

        <div className="bg-green-500/20 rounded-lg p-6 text-center">
          <Clock className="mx-auto mb-2 text-green-400" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            {weeklyData.regularHours.toFixed(2)}
          </div>
          <div className="text-white/90">Regular Hours</div>
        </div>

        <div className="bg-orange-500/20 rounded-lg p-6 text-center">
          <Clock className="mx-auto mb-2 text-orange-400" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            {weeklyData.overtimeHours.toFixed(2)}
          </div>
          <div className="text-white/90">Overtime Hours</div>
        </div>

        <div className="bg-purple-500/20 rounded-lg p-6 text-center">
          <DollarSign className="mx-auto mb-2 text-purple-400" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            ${weeklyData.totalEarnings.toFixed(2)}
          </div>
          <div className="text-white/90">Total Earnings</div>
        </div>
      </div>

      {weeklyData.overtimeHours > 0 && (
        <div className="mt-6 p-4 bg-orange-500/20 border border-orange-500/50 rounded-lg">
          <div className="text-orange-400 font-semibold text-center">
            ⚠️ You have {weeklyData.overtimeHours.toFixed(2)} overtime hours this week (1.5x rate)
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyEarnings;
