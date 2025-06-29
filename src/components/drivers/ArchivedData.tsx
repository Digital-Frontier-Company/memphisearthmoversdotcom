
import { useState, useEffect } from "react";
import { Archive, Calendar, Clock, DollarSign, User, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ArchivedTimeEntry {
  id: string;
  original_entry_id: string;
  driver_name: string;
  date: string;
  clock_in_time: string;
  clock_out_time: string | null;
  hours_worked: number | null;
  truck_number: string;
  job_address: string | null;
  week_start_date: string;
  week_end_date: string;
  archived_at: string;
}

interface ArchivedEarnings {
  id: string;
  driver_name: string;
  week_start_date: string;
  week_end_date: string;
  total_hours: number;
  regular_hours: number;
  overtime_hours: number;
  hourly_rate: number;
  total_earnings: number;
  archived_at: string;
}

const ArchivedData = () => {
  const [archivedEntries, setArchivedEntries] = useState<ArchivedTimeEntry[]>([]);
  const [archivedEarnings, setArchivedEarnings] = useState<ArchivedEarnings[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'entries' | 'earnings'>('entries');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');

  useEffect(() => {
    fetchArchivedData();
  }, []);

  const fetchArchivedData = async () => {
    try {
      // Fetch archived time entries
      const { data: timeData, error: timeError } = await supabase
        .from("time_entries_archive")
        .select("*")
        .order("week_start_date", { ascending: false })
        .order("date", { ascending: false });

      if (timeError) throw timeError;

      // Fetch archived earnings
      const { data: earningsData, error: earningsError } = await supabase
        .from("weekly_earnings_archive")
        .select("*")
        .order("week_start_date", { ascending: false });

      if (earningsError) throw earningsError;

      setArchivedEntries(timeData || []);
      setArchivedEarnings(earningsData || []);
    } catch (error) {
      console.error("Error fetching archived data:", error);
      toast.error("Failed to fetch archived data");
    } finally {
      setLoading(false);
    }
  };

  const runArchiving = async () => {
    try {
      const { error } = await supabase.rpc('archive_completed_weeks');
      
      if (error) throw error;
      
      toast.success("Archiving completed successfully!");
      fetchArchivedData();
    } catch (error) {
      console.error("Error running archiving:", error);
      toast.error("Failed to run archiving process");
    }
  };

  const getUniqueWeeks = () => {
    const weeks = new Set<string>();
    archivedEntries.forEach(entry => {
      weeks.add(`${entry.week_start_date}_${entry.week_end_date}`);
    });
    return Array.from(weeks).sort().reverse();
  };

  const filteredEntries = selectedWeek === 'all' 
    ? archivedEntries 
    : archivedEntries.filter(entry => 
        `${entry.week_start_date}_${entry.week_end_date}` === selectedWeek
      );

  const filteredEarnings = selectedWeek === 'all'
    ? archivedEarnings
    : archivedEarnings.filter(earnings =>
        `${earnings.week_start_date}_${earnings.week_end_date}` === selectedWeek
      );

  if (loading) {
    return (
      <div className="mem-card text-center">
        <div className="text-white/90">Loading archived data...</div>
      </div>
    );
  }

  return (
    <div className="mem-card">
      <div className="text-center mb-8">
        <Archive className="mx-auto mb-4 text-mem-babyBlue" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Archived Data</h2>
        <p className="text-white/90">View historical time entries and payroll data</p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
          >
            <option value="all">All Weeks</option>
            {getUniqueWeeks().map((week) => {
              const [start, end] = week.split('_');
              return (
                <option key={week} value={week}>
                  {format(new Date(start), "MMM d")} - {format(new Date(end), "MMM d, yyyy")}
                </option>
              );
            })}
          </select>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={runArchiving}
            className="bg-mem-blue text-white hover:bg-mem-darkBlue"
          >
            <Archive size={16} className="mr-2" />
            Run Archiving
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b border-mem-babyBlue/20">
          <button
            onClick={() => setActiveTab('entries')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'entries'
                ? 'border-mem-babyBlue text-mem-babyBlue'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            Time Entries ({filteredEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'earnings'
                ? 'border-mem-babyBlue text-mem-babyBlue'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            Weekly Earnings ({filteredEarnings.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'entries' ? (
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center text-white/90 py-8">
              <Calendar className="mx-auto mb-4 text-mem-babyBlue/50" size={48} />
              <p>No archived time entries found.</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white/5 rounded-lg p-4 border border-mem-babyBlue/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <User size={16} />
                      {entry.driver_name}
                    </div>
                    <div className="text-white/90 text-sm">
                      {format(new Date(entry.date), "MMMM d, yyyy")}
                    </div>
                    <div className="text-white/70 text-sm flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Truck size={14} />
                        Truck: {entry.truck_number}
                      </span>
                      {entry.job_address && (
                        <span>Location: {entry.job_address}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-white/70">
                    <div>Week: {format(new Date(entry.week_start_date), "MMM d")} - {format(new Date(entry.week_end_date), "MMM d")}</div>
                    <div>Archived: {format(new Date(entry.archived_at), "MMM d, yyyy")}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue flex items-center gap-1">
                      <Clock size={14} />
                      Clock In:
                    </div>
                    {format(new Date(entry.clock_in_time), "h:mm a")}
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue flex items-center gap-1">
                      <Clock size={14} />
                      Clock Out:
                    </div>
                    {entry.clock_out_time ? 
                      format(new Date(entry.clock_out_time), "h:mm a") : 
                      <span className="text-yellow-400">Not set</span>
                    }
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Hours:</div>
                    <span className="font-semibold">
                      {entry.hours_worked ? `${entry.hours_worked.toFixed(2)}h` : "-"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEarnings.length === 0 ? (
            <div className="text-center text-white/90 py-8">
              <DollarSign className="mx-auto mb-4 text-mem-babyBlue/50" size={48} />
              <p>No archived earnings found.</p>
            </div>
          ) : (
            filteredEarnings.map((earnings) => (
              <div key={earnings.id} className="bg-white/5 rounded-lg p-4 border border-mem-babyBlue/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <User size={16} />
                      {earnings.driver_name}
                    </div>
                    <div className="text-white/90 text-sm">
                      Week: {format(new Date(earnings.week_start_date), "MMM d")} - {format(new Date(earnings.week_end_date), "MMM d, yyyy")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-mem-babyBlue">
                      ${earnings.total_earnings.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-sm">
                      Archived: {format(new Date(earnings.archived_at), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Total Hours:</div>
                    <span className="font-semibold">{earnings.total_hours.toFixed(2)}h</span>
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Regular Hours:</div>
                    <span className="font-semibold">{earnings.regular_hours.toFixed(2)}h</span>
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Overtime Hours:</div>
                    <span className="font-semibold">{earnings.overtime_hours.toFixed(2)}h</span>
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Hourly Rate:</div>
                    <span className="font-semibold">${earnings.hourly_rate.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ArchivedData;
