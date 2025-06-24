
import { useState, useEffect } from "react";
import { FileText, Download, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

interface TimeLogProps {
  driver: Driver;
}

const TimeLog = ({ driver }: TimeLogProps) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeEntries();
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

  const fetchTimeEntries = async () => {
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
      toast.error("Failed to fetch time entries");
      setLoading(false);
      return;
    }

    setTimeEntries(data || []);
    setLoading(false);
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Job Address", "Truck", "Clock In", "Clock Out", "Hours"],
      ...timeEntries.map(entry => [
        entry.date,
        entry.job_address || "Not specified",
        entry.truck_number,
        new Date(entry.clock_in_time).toLocaleTimeString(),
        entry.clock_out_time ? new Date(entry.clock_out_time).toLocaleTimeString() : "Not clocked out",
        entry.hours_worked?.toFixed(2) || "0.00"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${driver.name.replace(/\s+/g, "_")}_timesheet_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Timesheet exported successfully!");
  };

  if (loading) {
    return (
      <div className="mem-card text-center">
        <div className="text-white/90">Loading time entries...</div>
      </div>
    );
  }

  return (
    <div className="mem-card">
      <div className="flex justify-between items-center mb-8">
        <div className="text-center flex-1">
          <FileText className="mx-auto mb-4 text-mem-babyBlue" size={48} />
          <h2 className="text-2xl font-bold text-white mb-2">Time Log</h2>
          <p className="text-white/90">Current week entries</p>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-mem-blue text-white px-4 py-2 rounded-md hover:bg-mem-darkBlue transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {timeEntries.length === 0 ? (
        <div className="text-center text-white/90 py-8">
          <Calendar className="mx-auto mb-4 text-mem-babyBlue/50" size={48} />
          <p>No time entries found for this week.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-mem-babyBlue/30">
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Job Address</th>
                <th className="text-left py-3 px-2">Truck</th>
                <th className="text-left py-3 px-2">Clock In</th>
                <th className="text-left py-3 px-2">Clock Out</th>
                <th className="text-left py-3 px-2">Hours</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-mem-babyBlue/10 hover:bg-white/5">
                  <td className="py-3 px-2">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2">
                    {entry.job_address || (
                      <span className="text-white/50 italic">Not specified</span>
                    )}
                  </td>
                  <td className="py-3 px-2">{entry.truck_number}</td>
                  <td className="py-3 px-2">
                    {new Date(entry.clock_in_time).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-2">
                    {entry.clock_out_time ? (
                      new Date(entry.clock_out_time).toLocaleTimeString()
                    ) : (
                      <span className="text-yellow-400">In Progress</span>
                    )}
                  </td>
                  <td className="py-3 px-2 font-semibold">
                    {entry.hours_worked ? `${entry.hours_worked.toFixed(2)}h` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimeLog;
