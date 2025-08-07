
import { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getCentralWeekDates } from "@/utils/timezoneUtils";

const TIME_ZONE = 'America/Chicago';

interface Driver {
  id: string;
  name: string;
}

interface TimeEntry {
  id: string;
  date: string;
  clock_in_time: string;
  clock_out_time: string | null;
  hours_worked: number | null;
  truck_number: string;
  job_address: string | null;
}

interface WeeklyHoursProps {
  driver: Driver;
}

const WeeklyHours = ({ driver }: WeeklyHoursProps) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeekEntries();
  }, [driver.id]);

  const getWeekDates = () => getCentralWeekDates();

  const fetchWeekEntries = async () => {
    setLoading(true);
    const { start, end } = getWeekDates();
    
    const { data, error } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .gte("date", start)
      .lte("date", end)
      .order("date", { ascending: false })
      .order("clock_in_time", { ascending: false });

    if (error) {
      console.error("Failed to fetch time entries:", error);
      setLoading(false);
      return;
    }

    setTimeEntries(data || []);
    setLoading(false);
  };

  const totalHours = timeEntries.reduce((sum, entry) => sum + (entry.hours_worked || 0), 0);

  if (loading) {
    return (
      <div className="text-center text-white/90 p-8">Loading time entries...</div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="text-center mb-8">
        <Clock className="mx-auto mb-4 text-blue-400" size={40} />
        <h2 className="text-xl font-bold text-white mb-2">Weekly Hours</h2>
        <p className="text-slate-400">Your time entries for this week</p>
      </div>

      <div className="bg-blue-600/20 rounded-lg p-6 mb-6 border border-blue-500/30">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {totalHours.toFixed(2)} hours
          </div>
          <div className="text-slate-300">Total Hours This Week</div>
        </div>
      </div>

      {timeEntries.length === 0 ? (
        <div className="text-center text-slate-400 py-8">
          <Calendar className="mx-auto mb-4 text-slate-600" size={48} />
          <p>No time entries found for this week.</p>
          <p className="text-sm mt-2">Your entries will appear here after clocking in.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-white font-semibold">
                    {/* Display date directly from database - it's now correct thanks to our trigger */}
                    {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      timeZone: 'UTC' // Use UTC since we're adding T00:00:00
                    })}
                  </div>
                  <div className="text-slate-400 text-sm">
                    Truck: {entry.truck_number}
                    {entry.job_address && ` • ${entry.job_address}`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-slate-300">
                  <div className="text-blue-400">Clock In:</div>
                  {new Date(entry.clock_in_time).toLocaleTimeString('en-US', { 
                    timeZone: TIME_ZONE, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="text-slate-300">
                  <div className="text-blue-400">Clock Out:</div>
                  {entry.clock_out_time ? 
                    new Date(entry.clock_out_time).toLocaleTimeString('en-US', { 
                      timeZone: TIME_ZONE, 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : 
                    <span className="text-yellow-400">Not set</span>
                  }
                </div>
                <div className="text-slate-300">
                  <div className="text-blue-400">Hours:</div>
                  {entry.hours_worked ? entry.hours_worked.toFixed(2) : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyHours;
