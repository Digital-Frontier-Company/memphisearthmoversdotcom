import { useState, useEffect } from "react";
import { Edit3, Save, X, Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

interface EditHoursProps {
  driver: Driver;
}

const EditHours = ({ driver }: EditHoursProps) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editForm, setEditForm] = useState({
    clockIn: "",
    clockOut: "",
    truckNumber: "",
    jobAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchWeekEntries();
  }, [driver.id]);

  // Get week dates in Central Time
  const getWeekDates = () => {
    const now = new Date();
    const centralDateStr = now.toLocaleDateString('en-CA', { timeZone: TIME_ZONE });
    const centralDate = new Date(centralDateStr + 'T12:00:00'); // Use noon to avoid DST issues
    
    const dayOfWeek = centralDate.getDay();
    const diff = centralDate.getDate() - dayOfWeek;
    
    const sunday = new Date(centralDate);
    sunday.setDate(diff);
    
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    
    return {
      start: format(sunday, 'yyyy-MM-dd'),
      end: format(saturday, 'yyyy-MM-dd')
    };
  };

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
      toast.error("Failed to fetch time entries");
      setLoading(false);
      return;
    }

    setTimeEntries(data || []);
    setLoading(false);
  };

  const isDateInCurrentWeek = (date: Date) => {
    const { start, end } = getWeekDates();
    const dateStr = format(date, 'yyyy-MM-dd');
    return dateStr >= start && dateStr <= end;
  };

  const startEditing = (entry: TimeEntry) => {
    setEditingEntry(entry.id);
    
    // Convert UTC times to Central Time for display
    const clockInDate = new Date(entry.clock_in_time);
    const clockInTime = clockInDate.toLocaleTimeString('en-US', {
      timeZone: TIME_ZONE,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    
    let clockOutTime = "";
    if (entry.clock_out_time) {
      const clockOutDate = new Date(entry.clock_out_time);
      clockOutTime = clockOutDate.toLocaleTimeString('en-US', {
        timeZone: TIME_ZONE,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    setEditForm({
      clockIn: clockInTime,
      clockOut: clockOutTime,
      truckNumber: entry.truck_number || "",
      jobAddress: entry.job_address || "",
    });
  };

  const startCreating = () => {
    setIsCreating(true);
    setEditForm({
      clockIn: "",
      clockOut: "",
      truckNumber: "",
      jobAddress: "",
    });
  };

  const cancelEditing = () => {
    setEditingEntry(null);
    setIsCreating(false);
    setEditForm({ clockIn: "", clockOut: "", truckNumber: "", jobAddress: "" });
  };

  // Convert Central Time input to UTC for storage
  const convertCentralTimeToUTC = (dateStr: string, timeStr: string): string | null => {
    if (!dateStr || !timeStr) return null;
    
    // Create a date string in Central Time
    const centralDateTimeStr = `${dateStr} ${timeStr}`;
    
    // Parse it as Central Time and convert to UTC
    const date = new Date(centralDateTimeStr);
    
    // Adjust for Central Time offset
    const centralOffset = new Date().toLocaleString('en-US', {
      timeZone: TIME_ZONE,
      timeZoneName: 'short'
    }).includes('CDT') ? 5 : 6; // CDT is UTC-5, CST is UTC-6
    
    date.setHours(date.getHours() + centralOffset);
    
    return date.toISOString();
  };

  const calculateHours = (startISO: string, endISO: string): number => {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.round(diffHours * 100) / 100;
  };

  const saveEntry = async (entryId: string) => {
    if (!editForm.clockIn || !editForm.truckNumber) {
      toast.error("Please fill in clock in time and truck number");
      return;
    }

    const entry = timeEntries.find(e => e.id === entryId);
    if (!entry) return;

    const clockInUTC = convertCentralTimeToUTC(entry.date, editForm.clockIn);
    const clockOutUTC = editForm.clockOut ? convertCentralTimeToUTC(entry.date, editForm.clockOut) : null;
    
    if (!clockInUTC) {
      toast.error("Invalid clock-in time");
      return;
    }

    const hoursWorked = clockInUTC && clockOutUTC ? calculateHours(clockInUTC, clockOutUTC) : null;

    const { error } = await supabase
      .from("time_entries")
      .update({
        clock_in_time: clockInUTC,
        clock_out_time: clockOutUTC,
        hours_worked: hoursWorked,
        truck_number: editForm.truckNumber,
        job_address: editForm.jobAddress || null,
      })
      .eq("id", entryId);

    if (error) {
      toast.error(`Failed to update: ${error.message}`);
      return;
    }

    toast.success("Time entry updated successfully!");
    cancelEditing();
    fetchWeekEntries();
  };

  const createEntry = async () => {
    if (!editForm.clockIn || !editForm.truckNumber) {
      toast.error("Please fill in clock in time and truck number");
      return;
    }

    const entryDateStr = format(selectedDate, 'yyyy-MM-dd');
    const clockInUTC = convertCentralTimeToUTC(entryDateStr, editForm.clockIn);
    const clockOutUTC = editForm.clockOut ? convertCentralTimeToUTC(entryDateStr, editForm.clockOut) : null;

    if (!clockInUTC) {
      toast.error("Invalid clock-in time");
      return;
    }
    
    const hoursWorked = clockInUTC && clockOutUTC ? calculateHours(clockInUTC, clockOutUTC) : null;

    const { error } = await supabase
      .from("time_entries")
      .insert({
        driver_id: driver.id,
        date: entryDateStr,
        clock_in_time: clockInUTC,
        clock_out_time: clockOutUTC,
        hours_worked: hoursWorked,
        truck_number: editForm.truckNumber,
        job_address: editForm.jobAddress || null,
      });

    if (error) {
      toast.error(`Failed to create: ${error.message}`);
      return;
    }

    toast.success("Time entry created successfully!");
    cancelEditing();
    fetchWeekEntries();
  };

  const deleteEntry = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    const { error } = await supabase
      .from("time_entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      toast.error(`Failed to delete: ${error.message}`);
      return;
    }

    toast.success("Entry deleted successfully!");
    fetchWeekEntries();
  };

  if (loading) {
    return (
      <div className="text-center text-white/90 p-8">Loading time entries...</div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="text-center mb-8">
        <Edit3 className="mx-auto mb-4 text-blue-400" size={40} />
        <h2 className="text-xl font-bold text-white mb-2">Edit Hours</h2>
        <p className="text-slate-400">Edit or create time entries for the current week</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date && isDateInCurrentWeek(date)) {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                } else {
                  toast.error("Please select a date within the current week");
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={startCreating}
          disabled={isCreating}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {isCreating && (
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-6">
          <div className="text-white font-semibold mb-3">
            Create New Entry for {format(selectedDate, "MMMM d, yyyy")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="time"
              value={editForm.clockIn}
              onChange={(e) => setEditForm({ ...editForm, clockIn: e.target.value })}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="Clock In"
            />
            <input
              type="time"
              value={editForm.clockOut}
              onChange={(e) => setEditForm({ ...editForm, clockOut: e.target.value })}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="Clock Out"
            />
            <input
              type="text"
              value={editForm.truckNumber}
              onChange={(e) => setEditForm({ ...editForm, truckNumber: e.target.value })}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="Truck Number *"
            />
            <input
              type="text"
              value={editForm.jobAddress}
              onChange={(e) => setEditForm({ ...editForm, jobAddress: e.target.value })}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="Job Address"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={createEntry} size="sm" className="bg-green-600 hover:bg-green-700">
              <Save className="mr-1 h-3 w-3" /> Save
            </Button>
            <Button onClick={cancelEditing} size="sm" variant="outline">
              <X className="mr-1 h-3 w-3" /> Cancel
            </Button>
          </div>
        </div>
      )}

      {timeEntries.length === 0 ? (
        <div className="text-center text-slate-400 py-8">
          <Calendar className="mx-auto mb-4 text-slate-600" size={48} />
          <p>No time entries found for this week.</p>
          <p className="text-sm mt-2">Use the "Add Entry" button above to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-white font-semibold">
                    {new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      timeZone: 'UTC'
                    })}
                  </div>
                  <div className="text-slate-400 text-sm">
                    Truck: {entry.truck_number} {entry.job_address && `• ${entry.job_address}`}
                  </div>
                </div>
                <div className="flex gap-2">
                  {editingEntry !== entry.id && (
                    <>
                      <Button
                        onClick={() => startEditing(entry)}
                        size="sm"
                        variant="outline"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => deleteEntry(entry.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingEntry === entry.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400">Clock In</label>
                      <input
                        type="time"
                        value={editForm.clockIn}
                        onChange={(e) => setEditForm({ ...editForm, clockIn: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Clock Out</label>
                      <input
                        type="time"
                        value={editForm.clockOut}
                        onChange={(e) => setEditForm({ ...editForm, clockOut: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Truck Number</label>
                      <input
                        type="text"
                        value={editForm.truckNumber}
                        onChange={(e) => setEditForm({ ...editForm, truckNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Job Address</label>
                      <input
                        type="text"
                        value={editForm.jobAddress}
                        onChange={(e) => setEditForm({ ...editForm, jobAddress: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => saveEntry(entry.id)} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="mr-1 h-3 w-3" /> Save
                    </Button>
                    <Button onClick={cancelEditing} size="sm" variant="outline">
                      <X className="mr-1 h-3 w-3" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditHours;