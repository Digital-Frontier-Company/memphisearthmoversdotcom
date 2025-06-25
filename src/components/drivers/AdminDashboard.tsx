
import { useState, useEffect } from "react";
import { Users, DollarSign, Clock, Eye, Download, Edit3, Plus, Trash2, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    setTimeEntryForm({
      driver_id: entry.driver_id,
      date: entry.date,
      clock_in_time: new Date(entry.clock_in_time).toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      clock_out_time: entry.clock_out_time ? new Date(entry.clock_out_time).toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }) : "",
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

    const calculateHours = (clockIn: string, clockOut: string) => {
      if (!clockIn || !clockOut) return 0;
      const today = timeEntryForm.date;
      const clockInTime = new Date(`${today}T${clockIn}:00`);
      const clockOutTime = new Date(`${today}T${clockOut}:00`);
      const diffMs = clockOutTime.getTime() - clockInTime.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return Math.max(0, Math.round(diffHours * 100) / 100);
    };

    const calculatedHours = timeEntryForm.clock_out_time ? 
      calculateHours(timeEntryForm.clock_in_time, timeEntryForm.clock_out_time) : 
      parseFloat(timeEntryForm.hours_worked) || null;

    const clockInDateTime = new Date(`${timeEntryForm.date}T${timeEntryForm.clock_in_time}:00`).toISOString();
    const clockOutDateTime = timeEntryForm.clock_out_time ? 
      new Date(`${timeEntryForm.date}T${timeEntryForm.clock_out_time}:00`).toISOString() : null;

    const entryData = {
      driver_id: timeEntryForm.driver_id,
      date: timeEntryForm.date,
      clock_in_time: clockInDateTime,
      clock_out_time: clockOutDateTime,
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
      toast.error(`Failed to ${entryId ? 'update' : 'create'} time entry`);
      return;
    }

    toast.success(`Time entry ${entryId ? 'updated' : 'created'} successfully!`);
    setEditingTimeEntry(null);
    setIsCreatingTimeEntry(false);
    setTimeEntryForm({ driver_id: "", date: "", clock_in_time: "", clock_out_time: "", hours_worked: "", truck_number: "", job_address: "" });
    fetchAllTimeEntries();
  };

  const deleteDriver = async (driverId: string, driverName: string) => {
    if (!confirm(`Are you sure you want to delete driver ${driverName}? This will also delete all their time entries.`)) {
      return;
    }

    // First delete time entries
    const { error: timeEntriesError } = await supabase
      .from("time_entries")
      .delete()
      .eq("driver_id", driverId);

    if (timeEntriesError) {
      toast.error("Failed to delete driver's time entries");
      return;
    }

    // Then delete weekly earnings
    const { error: earningsError } = await supabase
      .from("weekly_earnings")
      .delete()
      .eq("driver_id", driverId);

    if (earningsError) {
      toast.error("Failed to delete driver's earnings records");
      return;
    }

    // Finally delete the driver
    const { error } = await supabase
      .from("drivers")
      .delete()
      .eq("id", driverId);

    if (error) {
      toast.error("Failed to delete driver");
      return;
    }

    toast.success(`Driver ${driverName} deleted successfully!`);
    fetchAllDriversData();
  };

  const deleteTimeEntry = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this time entry?")) {
      return;
    }

    const { error } = await supabase
      .from("time_entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      toast.error("Failed to delete time entry");
      return;
    }

    toast.success("Time entry deleted successfully!");
    fetchAllTimeEntries();
  };

  const exportToCSV = async () => {
    setExportLoading(true);
    try {
      const { start } = getWeekDates();
      const weekEnd = new Date(start);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      const headers = [
        'Driver Name',
        'Hourly Rate',
        'Regular Hours',
        'Overtime Hours',
        'Total Hours',
        'Regular Pay',
        'Overtime Pay',
        'Total Earnings',
        'Week Start',
        'Week End'
      ];

      const rows = driversData.map(driver => [
        driver.name,
        `$${driver.hourly_rate.toFixed(2)}`,
        driver.regularHours.toFixed(2),
        driver.overtimeHours.toFixed(2),
        driver.totalHours.toFixed(2),
        `$${(driver.regularHours * driver.hourly_rate).toFixed(2)}`,
        `$${(driver.overtimeHours * driver.hourly_rate * 1.5).toFixed(2)}`,
        `$${driver.totalEarnings.toFixed(2)}`,
        start,
        weekEnd.toISOString().split('T')[0]
      ]);

      const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `payroll_week_${start}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Payroll data exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export payroll data");
    } finally {
      setExportLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mem-card text-center">
        <div className="text-white/90">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mem-card mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard - {driver.name}</h1>
            <p className="text-mem-babyBlue">Complete management system for drivers and time tracking</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={exportToCSV}
              disabled={exportLoading || driversData.length === 0}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Download size={16} className="mr-2" />
              {exportLoading ? "Exporting..." : "Export CSV"}
            </Button>
            <Button onClick={onLogout} variant="outline" className="bg-mem-gray text-white hover:bg-mem-darkNavy">
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'drivers', label: 'Manage Drivers', icon: Users },
            { id: 'timeentries', label: 'Manage Time Entries', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-mem-blue text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="mem-card">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-mem-babyBlue" size={24} />
            <h2 className="text-xl font-bold text-white">All Drivers Overview</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-mem-babyBlue/30">
                  <TableHead className="text-white">Driver Name</TableHead>
                  <TableHead className="text-white">Hourly Rate</TableHead>
                  <TableHead className="text-white">Regular Hours</TableHead>
                  <TableHead className="text-white">Overtime Hours</TableHead>
                  <TableHead className="text-white">Total Hours</TableHead>
                  <TableHead className="text-white">Total Earnings</TableHead>
                  <TableHead className="text-white">Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {driversData.map((driverData) => (
                  <TableRow key={driverData.id} className="border-b border-mem-babyBlue/10 hover:bg-white/5">
                    <TableCell className="text-white font-semibold">{driverData.name}</TableCell>
                    <TableCell className="text-green-400">${driverData.hourly_rate.toFixed(2)}/hr</TableCell>
                    <TableCell className="text-white">{driverData.regularHours.toFixed(2)}h</TableCell>
                    <TableCell className="text-yellow-400">{driverData.overtimeHours.toFixed(2)}h</TableCell>
                    <TableCell className="text-mem-babyBlue">{driverData.totalHours.toFixed(2)}h</TableCell>
                    <TableCell className="text-green-400 font-semibold">${driverData.totalEarnings.toFixed(2)}</TableCell>
                    <TableCell className="text-white/70">
                      {driverData.lastActivity !== "No activity" 
                        ? new Date(driverData.lastActivity).toLocaleDateString()
                        : "No activity"
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {driversData.length === 0 && (
            <div className="text-center text-white/70 py-8">
              No driver data available
            </div>
          )}
        </div>
      )}

      {/* Drivers Management Tab */}
      {activeTab === 'drivers' && (
        <div className="mem-card">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Users className="text-mem-babyBlue" size={24} />
              <h2 className="text-xl font-bold text-white">Manage Drivers</h2>
            </div>
            <Button 
              onClick={() => setIsCreatingDriver(true)}
              className="bg-mem-blue text-white hover:bg-mem-darkBlue"
            >
              <Plus size={16} className="mr-2" />
              Add New Driver
            </Button>
          </div>

          {/* Create New Driver Form */}
          {isCreatingDriver && (
            <div className="bg-white/5 rounded-lg p-4 border border-mem-babyBlue/20 mb-6">
              <h3 className="text-white font-semibold mb-3">Create New Driver</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-white/90">Name *</Label>
                  <Input
                    value={driverForm.name}
                    onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Hourly Rate *</Label>
                  <Input
                    type="number"
                    step="0.25"
                    value={driverForm.hourly_rate}
                    onChange={(e) => setDriverForm({ ...driverForm, hourly_rate: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">PIN *</Label>
                  <Input
                    value={driverForm.pin}
                    onChange={(e) => setDriverForm({ ...driverForm, pin: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                    placeholder="4-digit PIN"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Phone</Label>
                  <Input
                    value={driverForm.phone}
                    onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Email</Label>
                  <Input
                    value={driverForm.email}
                    onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Truck Assigned</Label>
                  <Input
                    value={driverForm.truck_assigned}
                    onChange={(e) => setDriverForm({ ...driverForm, truck_assigned: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => saveDriver()} className="bg-green-600 hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Create Driver
                </Button>
                <Button 
                  onClick={() => {
                    setIsCreatingDriver(false);
                    setDriverForm({ name: "", hourly_rate: "", phone: "", email: "", truck_assigned: "", pin: "" });
                  }}
                  variant="outline"
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-mem-babyBlue/30">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Hourly Rate</TableHead>
                  <TableHead className="text-white">Phone</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Truck</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {driversData.map((driverData) => (
                  <TableRow key={driverData.id} className="border-b border-mem-babyBlue/10">
                    {editingDriver === driverData.id ? (
                      <>
                        <TableCell>
                          <Input
                            value={driverForm.name}
                            onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.25"
                            value={driverForm.hourly_rate}
                            onChange={(e) => setDriverForm({ ...driverForm, hourly_rate: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={driverForm.phone}
                            onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={driverForm.email}
                            onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={driverForm.truck_assigned}
                            onChange={(e) => setDriverForm({ ...driverForm, truck_assigned: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => saveDriver(driverData.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => setEditingDriver(null)}
                              variant="outline"
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-white font-semibold">{driverData.name}</TableCell>
                        <TableCell className="text-green-400">${driverData.hourly_rate.toFixed(2)}</TableCell>
                        <TableCell className="text-white/70">{driverData.phone || 'N/A'}</TableCell>
                        <TableCell className="text-white/70">{driverData.email || 'N/A'}</TableCell>
                        <TableCell className="text-white/70">{driverData.truck_assigned || 'N/A'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => startEditingDriver(driverData)}
                              className="bg-mem-blue hover:bg-mem-darkBlue"
                            >
                              <Edit3 size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => deleteDriver(driverData.id, driverData.name)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Time Entries Management Tab */}
      {activeTab === 'timeentries' && (
        <div className="mem-card">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clock className="text-mem-babyBlue" size={24} />
              <h2 className="text-xl font-bold text-white">Manage Time Entries</h2>
            </div>
            <Button 
              onClick={() => setIsCreatingTimeEntry(true)}
              className="bg-mem-blue text-white hover:bg-mem-darkBlue"
            >
              <Plus size={16} className="mr-2" />
              Add Time Entry
            </Button>
          </div>

          {/* Create New Time Entry Form */}
          {isCreatingTimeEntry && (
            <div className="bg-white/5 rounded-lg p-4 border border-mem-babyBlue/20 mb-6">
              <h3 className="text-white font-semibold mb-3">Create New Time Entry</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-4">
                <div>
                  <Label className="text-white/90">Driver *</Label>
                  <select
                    value={timeEntryForm.driver_id}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, driver_id: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/10 border border-mem-babyBlue/30 text-white"
                  >
                    <option value="">Select Driver</option>
                    {driversData.map(driver => (
                      <option key={driver.id} value={driver.id}>{driver.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-white/90">Date *</Label>
                  <Input
                    type="date"
                    value={timeEntryForm.date}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, date: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Clock In *</Label>
                  <Input
                    type="time"
                    value={timeEntryForm.clock_in_time}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, clock_in_time: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Clock Out</Label>
                  <Input
                    type="time"
                    value={timeEntryForm.clock_out_time}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, clock_out_time: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Hours</Label>
                  <Input
                    type="number"
                    step="0.25"
                    value={timeEntryForm.hours_worked}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, hours_worked: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Truck *</Label>
                  <Input
                    value={timeEntryForm.truck_number}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, truck_number: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/90">Job Address</Label>
                  <Input
                    value={timeEntryForm.job_address}
                    onChange={(e) => setTimeEntryForm({ ...timeEntryForm, job_address: e.target.value })}
                    className="bg-white/10 border-mem-babyBlue/30 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => saveTimeEntry()} className="bg-green-600 hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Create Entry
                </Button>
                <Button 
                  onClick={() => {
                    setIsCreatingTimeEntry(false);
                    setTimeEntryForm({ driver_id: "", date: "", clock_in_time: "", clock_out_time: "", hours_worked: "", truck_number: "", job_address: "" });
                  }}
                  variant="outline"
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-mem-babyBlue/30">
                  <TableHead className="text-white">Driver</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Clock In</TableHead>
                  <TableHead className="text-white">Clock Out</TableHead>
                  <TableHead className="text-white">Hours</TableHead>
                  <TableHead className="text-white">Truck</TableHead>
                  <TableHead className="text-white">Job Address</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeEntries.map((entry) => (
                  <TableRow key={entry.id} className="border-b border-mem-babyBlue/10">
                    {editingTimeEntry === entry.id ? (
                      <>
                        <TableCell className="text-white">{entry.driver_name}</TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            value={timeEntryForm.date}
                            onChange={(e) => setTimeEntryForm({ ...timeEntryForm, date: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={timeEntryForm.clock_in_time}
                            onChange={(e) => setTimeEntryForm({ ...timeEntryForm, clock_in_time: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={timeEntryForm.clock_out_time}
                            onChange={(e) => setTimeEntryForm({ ...timeEntryForm, clock_out_time: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.25"
                            value={timeEntryForm.hours_worked}
                            onChange={(e) => setTimeEntryForm({ ...timeEntryForm, hours_worked: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={timeEntryForm.truck_number}
                            onChange={(e) => setTimeEntryForm({ ...timeEntryForm, truck_number: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={timeEntryForm.job_address}
                            onChange={(e) => setTimeEntryForm({ ...timeEntryForm, job_address: e.target.value })}
                            className="bg-white/10 border-mem-babyBlue/30 text-white text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              onClick={() => saveTimeEntry(entry.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save size={12} />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => setEditingTimeEntry(null)}
                              variant="outline"
                            >
                              <X size={12} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-white font-semibold">{entry.driver_name}</TableCell>
                        <TableCell className="text-white">{new Date(entry.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-white">{new Date(entry.clock_in_time).toLocaleTimeString()}</TableCell>
                        <TableCell className="text-white">
                          {entry.clock_out_time ? 
                            new Date(entry.clock_out_time).toLocaleTimeString() : 
                            <span className="text-yellow-400">In Progress</span>
                          }
                        </TableCell>
                        <TableCell className="text-white font-semibold">
                          {entry.hours_worked ? `${entry.hours_worked.toFixed(2)}h` : "-"}
                        </TableCell>
                        <TableCell className="text-white">{entry.truck_number}</TableCell>
                        <TableCell className="text-white/70">{entry.job_address || 'N/A'}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              onClick={() => startEditingTimeEntry(entry)}
                              className="bg-mem-blue hover:bg-mem-darkBlue"
                            >
                              <Edit3 size={12} />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => deleteTimeEntry(entry.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {timeEntries.length === 0 && (
            <div className="text-center text-white/70 py-8">
              No time entries found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
