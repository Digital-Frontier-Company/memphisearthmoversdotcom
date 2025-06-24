import { useState, useEffect } from "react";
import { Edit3, Save, X, Calendar, Clock, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
    hoursWorked: "",
    truckNumber: "",
    jobAddress: "",
  });
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchWeekEntries();
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

  const fetchWeekEntries = async () => {
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
    const dateStr = date.toISOString().split('T')[0];
    return dateStr >= start && dateStr <= end;
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
      truckNumber: entry.truck_number || "",
      jobAddress: entry.job_address || "",
    });
  };

  const startCreating = () => {
    setIsCreating(true);
    setEditForm({
      clockIn: "",
      clockOut: "",
      hoursWorked: "",
      truckNumber: "",
      jobAddress: "",
    });
  };

  const cancelEditing = () => {
    setEditingEntry(null);
    setIsCreating(false);
    setEditForm({ clockIn: "", clockOut: "", hoursWorked: "", truckNumber: "", jobAddress: "" });
  };

  const calculateHours = (clockIn: string, clockOut: string) => {
    if (!clockIn || !clockOut) return 0;
    
    const today = new Date().toISOString().split('T')[0];
    const clockInTime = new Date(`${today}T${clockIn}:00`);
    const clockOutTime = new Date(`${today}T${clockOut}:00`);
    
    const diffMs = clockOutTime.getTime() - clockInTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return Math.max(0, Math.round(diffHours * 100) / 100);
  };

  const saveEntry = async (entryId: string) => {
    if (!editForm.clockIn || !editForm.truckNumber) {
      toast.error("Please fill in clock in time and truck number");
      return;
    }

    const entry = timeEntries.find(e => e.id === entryId);
    if (!entry) return;

    // Calculate hours if both times are provided
    const calculatedHours = editForm.clockOut ? 
      calculateHours(editForm.clockIn, editForm.clockOut) : 
      parseFloat(editForm.hoursWorked) || null;

    // Create full datetime strings
    const entryDate = entry.date;
    const clockInDateTime = new Date(`${entryDate}T${editForm.clockIn}:00`).toISOString();
    const clockOutDateTime = editForm.clockOut ? 
      new Date(`${entryDate}T${editForm.clockOut}:00`).toISOString() : null;

    const { error } = await supabase
      .from("time_entries")
      .update({
        clock_in_time: clockInDateTime,
        clock_out_time: clockOutDateTime,
        hours_worked: calculatedHours,
        truck_number: editForm.truckNumber,
        job_address: editForm.jobAddress || null,
      })
      .eq("id", entryId);

    if (error) {
      toast.error("Failed to update time entry");
      return;
    }

    toast.success("Time entry updated successfully!");
    setEditingEntry(null);
    fetchWeekEntries();
  };

  const createEntry = async () => {
    if (!editForm.clockIn || !editForm.truckNumber) {
      toast.error("Please fill in clock in time and truck number");
      return;
    }

    // Calculate hours if both times are provided
    const calculatedHours = editForm.clockOut ? 
      calculateHours(editForm.clockIn, editForm.clockOut) : 
      parseFloat(editForm.hoursWorked) || null;

    // Create full datetime strings
    const entryDate = selectedDate.toISOString().split('T')[0];
    const clockInDateTime = new Date(`${entryDate}T${editForm.clockIn}:00`).toISOString();
    const clockOutDateTime = editForm.clockOut ? 
      new Date(`${entryDate}T${editForm.clockOut}:00`).toISOString() : null;

    const { error } = await supabase
      .from("time_entries")
      .insert({
        driver_id: driver.id,
        date: entryDate,
        clock_in_time: clockInDateTime,
        clock_out_time: clockOutDateTime,
        hours_worked: calculatedHours,
        truck_number: editForm.truckNumber,
        job_address: editForm.jobAddress || null,
      });

    if (error) {
      toast.error("Failed to create time entry");
      return;
    }

    toast.success("Time entry created successfully!");
    setIsCreating(false);
    setEditForm({ clockIn: "", clockOut: "", hoursWorked: "", truckNumber: "", jobAddress: "" });
    fetchWeekEntries();
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
        <p className="text-white/90">Edit or create time entries for the current week</p>
      </div>

      {/* Date Picker and Add Entry Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-white/90">
            <label className="block text-sm mb-1">Select Date:</label>
            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal bg-white/10 border-mem-babyBlue/30 text-white hover:bg-white/20",
                    !selectedDate && "text-white/50"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }
                  }}
                  disabled={(date) => !isDateInCurrentWeek(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <Button
          onClick={startCreating}
          disabled={isCreating || !isDateInCurrentWeek(selectedDate)}
          className="bg-mem-blue text-white hover:bg-mem-darkBlue"
        >
          <Plus size={16} className="mr-2" />
          Add Entry for {format(selectedDate, "MMM d")}
        </Button>
      </div>

      {/* Create New Entry Form */}
      {isCreating && (
        <div className="bg-white/5 rounded-lg p-4 border border-mem-babyBlue/20 mb-6">
          <div className="text-white font-semibold mb-3">
            Create New Entry for {format(selectedDate, "MMMM d, yyyy")}
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-white/90 text-sm mb-1">Clock In *</label>
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
                  onChange={(e) => {
                    const newClockOut = e.target.value;
                    const calculatedHours = newClockOut && editForm.clockIn ? 
                      calculateHours(editForm.clockIn, newClockOut) : "";
                    setEditForm({ 
                      ...editForm, 
                      clockOut: newClockOut,
                      hoursWorked: calculatedHours.toString()
                    });
                  }}
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
              <div>
                <label className="block text-white/90 text-sm mb-1">Truck Number *</label>
                <input
                  type="text"
                  value={editForm.truckNumber}
                  onChange={(e) => setEditForm({ ...editForm, truckNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
                  placeholder="Truck #"
                />
              </div>
              <div>
                <label className="block text-white/90 text-sm mb-1">Job Address</label>
                <input
                  type="text"
                  value={editForm.jobAddress}
                  onChange={(e) => setEditForm({ ...editForm, jobAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
                  placeholder="Job site address"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={createEntry}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
              >
                <Save size={14} />
                Create Entry
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
        </div>
      )}

      {/* Existing Entries */}
      {timeEntries.length === 0 ? (
        <div className="text-center text-white/90 py-8">
          <Calendar className="mx-auto mb-4 text-mem-babyBlue/50" size={48} />
          <p>No time entries found for this week.</p>
          <p className="text-sm text-white/70 mt-2">Use the "Add Entry" button above to create one.</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
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
                        onChange={(e) => {
                          const newClockOut = e.target.value;
                          const calculatedHours = newClockOut && editForm.clockIn ? 
                            calculateHours(editForm.clockIn, newClockOut) : "";
                          setEditForm({ 
                            ...editForm, 
                            clockOut: newClockOut,
                            hoursWorked: calculatedHours.toString()
                          });
                        }}
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
                    <div>
                      <label className="block text-white/90 text-sm mb-1">Truck Number</label>
                      <input
                        type="text"
                        value={editForm.truckNumber}
                        onChange={(e) => setEditForm({ ...editForm, truckNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white/90 text-sm mb-1">Job Address</label>
                      <input
                        type="text"
                        value={editForm.jobAddress}
                        onChange={(e) => setEditForm({ ...editForm, jobAddress: e.target.value })}
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditHours;
