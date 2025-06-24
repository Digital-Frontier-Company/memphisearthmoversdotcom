
import { useState, useEffect } from "react";
import { Edit3, Save, X, Calendar, Clock } from "lucide-react";
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

interface EditHoursProps {
  driver: Driver;
}

const EditHours = ({ driver }: EditHoursProps) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    clockIn: "",
    clockOut: "",
    hoursWorked: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentEntries();
  }, [driver.id]);

  const fetchRecentEntries = async () => {
    // Get entries from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { data, error } = await supabase
      .from("time_entries")
      .select("*")
      .eq("driver_id", driver.id)
      .gte("date", sevenDaysAgo.toISOString().split('T')[0])
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

  const startEditing = (entry: TimeEntry) => {
    setEditingEntry(entry.id);
    setEditForm({
      clockIn: new Date(entry.clock_in_time).toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      clockOut: entry.clock_out_time ? new Date(entry.clock_out_time).toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }) : "",
      hoursWorked: entry.hours_worked?.toString() || "",
    });
  };

  const cancelEditing = () => {
    setEditingEntry(null);
    setEditForm({ clockIn: "", clockOut: "", hoursWorked: "" });
  };

  const saveEntry = async (entryId: string) => {
    if (!editForm.clockIn || !editForm.clockOut || !editForm.hoursWorked) {
      toast.error("Please fill in all fields");
      return;
    }

    const entry = timeEntries.find(e => e.id === entryId);
    if (!entry) return;

    // Create full datetime strings
    const entryDate = entry.date;
    const clockInDateTime = new Date(`${entryDate}T${editForm.clockIn}:00`).toISOString();
    const clockOutDateTime = new Date(`${entryDate}T${editForm.clockOut}:00`).toISOString();

    const { error } = await supabase
      .from("time_entries")
      .update({
        clock_in_time: clockInDateTime,
        clock_out_time: clockOutDateTime,
        hours_worked: parseFloat(editForm.hoursWorked),
      })
      .eq("id", entryId);

    if (error) {
      toast.error("Failed to update time entry");
      return;
    }

    toast.success("Time entry updated successfully!");
    setEditingEntry(null);
    fetchRecentEntries();
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
      <div className="text-center mb-8">
        <Edit3 className="mx-auto mb-4 text-mem-babyBlue" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Edit Hours</h2>
        <p className="text-white/90">Edit time entries from the last 7 days</p>
      </div>

      {timeEntries.length === 0 ? (
        <div className="text-center text-white/90 py-8">
          <Calendar className="mx-auto mb-4 text-mem-babyBlue/50" size={48} />
          <p>No time entries found for the last 7 days.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="bg-white/5 rounded-lg p-4 border border-mem-babyBlue/20">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-white font-semibold">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  {entry.job_address && (
                    <div className="text-white/70 text-sm">
                      {entry.job_address}
                    </div>
                  )}
                  <div className="text-white/70 text-sm">
                    Truck: {entry.truck_number}
                  </div>
                </div>
                {editingEntry !== entry.id && (
                  <button
                    onClick={() => startEditing(entry)}
                    className="text-mem-babyBlue hover:text-white transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                )}
              </div>

              {editingEntry === entry.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-white/90 text-sm mb-1">Clock In</label>
                      <input
                        type="time"
                        value={editForm.clockIn}
                        onChange={(e) => setEditForm({ ...editForm, clockIn: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm mb-1">Clock Out</label>
                      <input
                        type="time"
                        value={editForm.clockOut}
                        onChange={(e) => setEditForm({ ...editForm, clockOut: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm mb-1">Hours Worked</label>
                      <input
                        type="number"
                        step="0.25"
                        value={editForm.hoursWorked}
                        onChange={(e) => setEditForm({ ...editForm, hoursWorked: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEntry(entry.id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      <Save size={14} />
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Clock In:</div>
                    {new Date(entry.clock_in_time).toLocaleTimeString()}
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Clock Out:</div>
                    {entry.clock_out_time ? 
                      new Date(entry.clock_out_time).toLocaleTimeString() : 
                      <span className="text-yellow-400">In Progress</span>
                    }
                  </div>
                  <div className="text-white/90">
                    <div className="text-mem-babyBlue">Hours:</div>
                    <span className="font-semibold">
                      {entry.hours_worked ? `${entry.hours_worked.toFixed(2)}h` : "-"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditHours;
