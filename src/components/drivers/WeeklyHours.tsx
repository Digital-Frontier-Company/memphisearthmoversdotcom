
import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Driver {
  id: string;
  name: string;
}

interface WeeklyHoursProps {
  driver: Driver;
}

const WeeklyHours = ({ driver }: WeeklyHoursProps) => {
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [regularHours, setRegularHours] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyHours();
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

  const fetchWeeklyHours = async () => {
    const { start, end } = getWeekDates();
    
    const { data, error } = await supabase
      .from("time_entries")
      .select("hours_worked")
      .eq("driver_id", driver.id)
      .gte("date", start)
      .lte("date", end)
      .not("hours_worked", "is", null);

    if (error) {
      console.error("Failed to fetch weekly hours:", error);
      setLoading(false);
      return;
    }

    const total = data?.reduce((sum, entry) => sum + (entry.hours_worked || 0), 0) || 0;
    const regular = Math.min(total, 40);
    const overtime = Math.max(total - 40, 0);

    setWeeklyHours(total);
    setRegularHours(regular);
    setOvertimeHours(overtime);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="mem-card text-center">
        <div className="text-white/90">Loading weekly hours...</div>
      </div>
    );
  }

  return (
    <div className="mem-card">
      <div className="text-center mb-8">
        <Calendar className="mx-auto mb-4 text-mem-babyBlue" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Weekly Hours Summary</h2>
        <p className="text-white/90">Current week totals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-mem-blue/20 rounded-lg p-6 text-center">
          <Clock className="mx-auto mb-2 text-mem-babyBlue" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            {weeklyHours.toFixed(2)}
          </div>
          <div className="text-white/90">Total Hours</div>
        </div>

        <div className="bg-green-500/20 rounded-lg p-6 text-center">
          <Clock className="mx-auto mb-2 text-green-400" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            {regularHours.toFixed(2)}
          </div>
          <div className="text-white/90">Regular Hours</div>
        </div>

        <div className="bg-orange-500/20 rounded-lg p-6 text-center">
          <Clock className="mx-auto mb-2 text-orange-400" size={32} />
          <div className="text-3xl font-bold text-white mb-1">
            {overtimeHours.toFixed(2)}
          </div>
          <div className="text-white/90">Overtime Hours</div>
        </div>
      </div>

      {overtimeHours > 0 && (
        <div className="mt-6 p-4 bg-orange-500/20 border border-orange-500/50 rounded-lg">
          <div className="text-orange-400 font-semibold text-center">
            ⚠️ You have {overtimeHours.toFixed(2)} overtime hours this week
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyHours;
