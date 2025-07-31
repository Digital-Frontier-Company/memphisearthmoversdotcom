import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns"; // Import the date-fns format function

// --- START OF FIXES ---

// FIX 1: Define a constant for the target timezone.
const TIME_ZONE = 'America/Chicago';

// --- END OF FIXES ---

interface Driver {
  id: string;
  name: string;
}

interface WeeklyHoursProps {
  driver: Driver;
}

const WeeklyHours = ({ driver }: WeeklyHoursProps) => {
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyHours();
  }, [driver.id]);

  // FIX 2: Calculate the week's start and end based on the current date in Central Time.
  const getWeekDates = () => {
    const now = new Date();
    const centralNow = new Date(now.toLocaleString('en-US', { timeZone: TIME_ZONE }));
    const dayOfWeek = centralNow.getDay();
    const diff = centralNow.getDate() - dayOfWeek;

    const sunday = new Date(centralNow.setDate(diff));
    const saturday = new Date(new Date(sunday).setDate(sunday.getDate() + 6));
    
    return {
      start: format(sunday, 'yyyy-MM-dd'),
      end: format(saturday, 'yyyy-MM-dd')
    };
  };

  const fetchWeeklyHours = async () => {
    setLoading(true);
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

    setWeeklyHours(total);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-slate-800 p-6 rounded-lg text-center">
        <div className="text-slate-400">Loading weekly hours...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="text-center mb-6">
        <Calendar className="mx-auto mb-4 text-blue-400" size={40} />
        <h2 className="text-xl font-bold text-white mb-1">Weekly Hours Summary</h2>
        <p className="text-slate-400">Your total hours for the current week.</p>
      </div>

      <div className="bg-blue-600/20 rounded-lg p-6 text-center border border-blue-500/30">
        <Clock className="mx-auto mb-2 text-blue-400" size={32} />
        <div className="text-4xl font-bold text-white mb-1">
          {weeklyHours.toFixed(2)}
        </div>
        <div className="text-slate-300">Total Hours</div>
      </div>
    </div>
  );
};

export default WeeklyHours;
