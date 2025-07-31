import { useState, useEffect } from "react";
import { Users, DollarSign, Clock, Eye, Download, Edit3, Plus, Trash2, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- START OF FIXES ---

// FIX 1: Define a constant for the target timezone for consistency and maintainability.
const TIME_ZONE = 'America/Chicago';

/**
 * Helper function to create a Date object from form inputs, assuming the inputs are in a specific timezone.
 * It works by finding the correct offset from UTC for that timezone on that specific date.
 * @param {string} dateStr - The date string, e.g., "2024-07-04".
 * @param {string} timeStr - The time string, e.g., "10:30".
 * @returns {Date | null} A timezone-correct Date object or null if inputs are invalid.
 */
const createDateInTimeZone = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;

  // Create a naive Date object by combining the date and time and treating it as a UTC value.
  // This avoids any interference from the browser's local timezone.
  const naiveDate = new Date(`${dateStr}T${timeStr}:00.000Z`);

  // A trick to find the offset: compare the time in UTC vs. the target timezone.
  const utcTime = new Date(naiveDate.toLocaleString('en-US', { timeZone: 'UTC' })).getTime();
  const tzTime = new Date(naiveDate.toLocaleString('en-US', { timeZone: TIME_ZONE })).getTime();
  const offsetMilliseconds = utcTime - tzTime;

  // Apply the offset to the naive UTC date to get the true UTC equivalent of the wall time.
  return new Date(naiveDate.getTime() - offsetMilliseconds);
};

// --- END OF FIXES ---

interface Driver {
  id: string;
  name: string;
  hourly_rate: number;
  role: string;
  phone?: string;
  email?: string;
  truck_assigned?: string;
  active: boolean;
}

interface AdminDashboardProps {
  driver: Driver;
  onLogout: () => void;
}

interface DriverData {
  id: string;
  name: string;
  hourly_rate: number;
  phone?: string;
  email?: string;
  truck_assigned?: string;
  active: boolean;
  totalHours: number;
  totalEarnings: number;
  regularHours: number;
  overtimeHours: number;
  lastActivity: string;
}

interface TimeEntry {
  id: string;
  date: string;
  clock_in_time: string;
  clock_out_time: string | null;
  hours_worked: number | null;
  truck_number: string;
  job_address: string | null;
  driver_id: string;
  driver_name?: string;
}

const AdminDashboard = ({ driver, onLogout }: AdminDashboardProps) => {
  const [driversData, setDriversData] = useState<DriverData[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'timeentries'>('overview');
  const [editingDriver, setEditingDriver] = useState<string | null>(null);
  const [editingTimeEntry, setEditingTimeEntry] = useState<string | null>(null);
  const [isCreatingDriver, setIsCreatingDriver] = useState(false);
  const [isCreatingTimeEntry, setIsCreatingTimeEntry] = useState(false);

  const [driverForm, setDriverForm] = useState({
    name: "",
    hourly_rate: "",
    phone: "",
    email: "",
    truck_assigned: "",
    pin: ""
  });

  const [timeEntryForm, setTimeEntryForm] = useState({
    driver_id: "",
    date: "",
    clock_in_time: "",
    clock_out_time: "",
    hours_worked: "",
    truck_number: "",
    job_address: ""
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([fetchAllDriversData(), fetchAllTimeEntries()]);
    setLoading(false);
  };

  const fetchAllDriversData = async () => {
    const { data: drivers, error: driversError } = await supabase
      .from("drivers")
      .select("*")
      .eq("active", true)
      .eq("role", "driver");

    if (driversError) {
      console.error("Failed to fetch drivers:", driversError);
      return;
    }

    const driversWithData: DriverData[] = [];

    for (const driverRecord of drivers || []) {
      const { start } = getWeekDates();
      
      await supabase.rpc('calculate_weekly_earnings', {
        p_driver_id: driverRecord.id,
        p_week_start: start
      });

      const { data: earnings } = await supabase
        .from("weekly_earnings")
        .select("*")
        .eq("driver_id", driverRecord.id)
        .eq("week_start_date", start)
        .single();

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
        phone: driverRecord.phone,
        email: driverRecord.email,
        truck_assigned: driverRecord.truck_assigned,
        active: driverRecord.active,
        totalHours: earnings?.total_hours || 0,
        totalEarnings: earnings?.total_earnings || 0,
        regularHours: earnings?.regular_hours || 0,
        overtimeHours: earnings?.overtime_hours || 0,
        lastActivity: lastEntry?.created_at || "No activity"
      });
    }

    setDriversData(driversWithData);
  };

  const fetchAllTimeEntries = async () => {
    const { data, error } = await supabase
      .from("time_entries")
      .select(`
        *,
        drivers(name)
      `)
      .order("date", { ascending: false })
      .order("clock_in_time", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Failed to fetch time entries:", error);
      return;
    }

    const entriesWithDriverNames = data?.map(entry => ({
      ...entry,
      driver_name: entry.drivers?.name || 'Unknown Driver'
    })) || [];

    setTimeEntries(entriesWithDriverNames);
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

  const startEditingDriver = (driverData: DriverData) => {
    setEditingDriver(driverData.id);
    setDriverForm({
      name: driverData.name,
      hourly_rate: driverData.hourly_rate.toString(),
      phone: driverData.phone || "",
      email: driverData.email || "",
      truck_assigned: driverData.truck_assigned || "",
      pin: ""
    });
  };

  const startEditingTimeEntry = (entry: TimeEntry) => {
    setEditingTimeEntry(entry.id);

    // FIX 2: When populating the form for editing, convert the UTC time from the database
    // into the local time string for the US Central timezone.
    const commonTimeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
    const formatInCentralTime = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleTimeString('en-US', { ...commonTimeOptions, timeZone: TIME_ZONE });
    };
    
    setTimeEntryForm({
      driver_id: entry.driver_id,
      date: entry.date,
      clock_in_time: formatInCentralTime(entry.clock_in_time),
      clock_out_time: formatInCentralTime(entry.clock_out_time),
      hours_worked: entry.hours_worked?.toString() || "",
      truck_number: entry.truck_number,
      job_address: entry.job_address || ""
    });
  };

  const saveDriver = async (driverId?: string) => {
    if (!driverForm.name || !driverForm.hourly_rate) {
      toast.error("Please fill in name and hourly rate");
      return;
    }

    const driverData = {
      name: driverForm.name,
      hourly_rate: parseFloat(driverForm.hourly_rate),
      phone: driverForm.phone || null,
      email: driverForm.email || null,
      truck_assigned: driverForm.truck_assigned || null,
      ...(driverForm.pin && { pin: driverForm.pin })
    };

    let error;
    
    if (driverId) {
      const { error: updateError } = await supabase
        .from("drivers")
        .update(driverData)
        .eq("id", driverId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("drivers")
        .insert({
          ...driverData,
          pin: driverForm.pin || '0000',
          role: 'driver',
          active: true
        });
      error = insertError;
    }

    if (error) {
      toast.error(`Failed to ${driverId ? 'update' : 'create'} driver`);
      return;
    }

    toast.success(`Driver ${driverId ? 'updated' : 'created'} successfully!`);
    setEditingDriver(null);
    setIsCreatingDriver(false);
    setDriverForm({ name: "", hourly_rate: "", phone: "", email: "", truck_assigned: "", pin: "" });
    fetchAllDriversData();
  };

  const saveTimeEntry = async (entryId?: string) => {
    if (!timeEntryForm.driver_id || !timeEntryForm.date || !timeEntryForm.clock_in_time || !timeEntryForm.truck_number) {
      toast.error("Please fill in all required fields");
      return;
    }

    // FIX 3: Convert form inputs (assumed to be Central Time) into correct UTC Date objects.
    const clockInDate = createDateInTimeZone(timeEntryForm.date, timeEntryForm.clock_in_time);
    const clockOutDate = createDateInTimeZone(timeEntryForm.date, timeEntryForm.clock_out_time);

    if (!clockInDate) {
      toast.error("Invalid clock-in time provided.");
      return;
    }
    
    // FIX 4: Calculate hours worked using the accurate, timezone-aware Date objects.
    const calculateHours = (start, end) => {
      if (!start || !end) return 0;
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return Math.max(0, Math.round(diffHours * 100) / 100);
    };

    const calculatedHours = clockOutDate ? 
      calculateHours(clockInDate, clockOutDate) : 
      parseFloat(timeEntryForm.hours_worked) || null;

    const entryData = {
      driver_id: timeEntryForm.driver_id,
      date: timeEntryForm.date,
      // Convert the timezone-correct Date object to an ISO string for database storage.
      clock_in_time: clockInDate.toISOString(),
      clock_out_time: clockOutDate ? clockOutDate.toISOString() : null,
      hours_worked: calculatedHours,
      truck_number: timeEntryForm.truck_number,
      job_address: timeEntryForm.job_address || null
    };

    let error;
    
    if (entryId) {
      const { error: updateError } = await supabase
        .from("time_entries")
        .update(entryData)
        .eq("id", entryId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("time_entries")
        .insert(entryData);
      error = insertError;
    }

    if (error) {
      toast.error(`Failed to ${entryId ? 'update' : 'create'} time entry: ${error.message}`);
      return;
    }

    toast.success(`Time entry ${entryId ? 'updated' : 'created'} successfully!`);
    setEditingTimeEntry(null);
    setIsCreatingTimeEntry(false);
    setTimeEntryForm({ driver_id: "", date: "", clock_in_time: "", clock_out_time: "", hours_worked: "", truck_number: "", job_address: "" });
    fetchAllTimeEntries();
  };
  
  // ... (rest of the component is unchanged until the table rendering)

  // Omitted unchanged code for brevity (deleteDriver, exportToCSV, main layout...)
  
  // Inside the returned JSX for the `timeentries` tab:
  // ...
  <TableBody>
    {timeEntries.map((entry) => (
      <TableRow key={entry.id} className="border-b border-mem-babyBlue/10">
        {editingTimeEntry === entry.id ? (
          <>
          {/* Editing row remains the same, as startEditingTimeEntry handles the conversion */}
          </>
        ) : (
          <>
            <TableCell className="text-white font-semibold">{entry.driver_name}</TableCell>
            <TableCell className="text-white">
              {
                // FIX 5: Display the date by parsing it as UTC to avoid off-by-one-day errors.
                new Date(entry.date + 'T00:00:00Z').toLocaleDateString('en-US', { timeZone: TIME_ZONE })
              }
            </TableCell>
            <TableCell className="text-white">
              {
                // FIX 6: Display the clock-in time converted to the correct Central timezone.
                new Date(entry.clock_in_time).toLocaleTimeString('en-US', { timeZone: TIME_ZONE })
              }
            </TableCell>
            <TableCell className="text-white">
              {entry.clock_out_time ? 
                // FIX 7: Display the clock-out time converted to the correct Central timezone.
                new Date(entry.clock_out_time).toLocaleTimeString('en-US', { timeZone: TIME_ZONE }) : 
                <span className="text-yellow-400">In Progress</span>
              }
            </TableCell>
            {/* ... other cells ... */}
          </>
        )}
      </TableRow>
    ))}
  </TableBody>
  // ...
};

export default AdminDashboard;

// NOTE: The full component code was long, so I've only shown the functions that needed changes
// and the specific lines within the JSX that required updates. You should replace the corresponding
// functions and JSX snippets in your original file with these corrected versions. The overall
// structure, state management, and other functions like `deleteDriver` remain the same.
