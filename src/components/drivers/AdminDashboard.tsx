import { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  Clock, 
  Eye, 
  Download, 
  Edit3, 
  Plus, 
  Trash2, 
  Save, 
  X,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  FileText,
  Calendar,
  TrendingUp,
  Search,
  Bell,
  ChevronDown,
  MoreHorizontal
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Timezone helper
const TIME_ZONE = 'America/Chicago';

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
  status: 'Active' | 'Inactive' | 'On Break';
  tasks: number;
  performance: number;
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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'drivers' | 'time-tracking' | 'tasks' | 'earnings' | 'reports' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState("");
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', hours: 42 },
    { day: 'Tue', hours: 38 },
    { day: 'Wed', hours: 45 },
    { day: 'Thu', hours: 40 },
    { day: 'Fri', hours: 43 },
    { day: 'Sat', hours: 28 },
    { day: 'Sun', hours: 15 }
  ]);

  const pieData = [
    { name: 'Active Driving', value: 65, color: '#3B82F6' },
    { name: 'Loading/Unloading', value: 20, color: '#10B981' },
    { name: 'Breaks', value: 10, color: '#F59E0B' },
    { name: 'Maintenance', value: 3, color: '#F97316' },
    { name: 'Other', value: 2, color: '#EC4899' }
  ];

  const recentActivities = [
    { id: 1, driver: 'Michael Johnson', action: 'clocked in', time: 'Today, 8:05 AM', type: 'clock-in' },
    { id: 2, task: 'Task #1042', action: 'completed', time: 'Today, 10:23 AM', type: 'task' },
    { id: 3, driver: 'Sarah Williams', action: 'clocked out', time: 'Today, 5:15 PM', type: 'clock-out' },
    { id: 4, task: 'Task #1043', action: 'started', time: 'Today, 2:30 PM', type: 'task' }
  ];

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
        lastActivity: lastEntry?.created_at || "No activity",
        status: 'Active',
        tasks: Math.floor(Math.random() * 15) + 5,
        performance: Math.floor(Math.random() * 30) + 70
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

  const totalDrivers = driversData.length;
  const totalHours = driversData.reduce((sum, driver) => sum + driver.totalHours, 0);
  const totalEarnings = driversData.reduce((sum, driver) => sum + driver.totalEarnings, 0);
  const activeTasks = driversData.reduce((sum, driver) => sum + driver.tasks, 0);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Total Drivers</p>
                <p className="text-3xl font-bold text-white">{totalDrivers}</p>
                <p className="text-xs text-green-400 mt-1">↗ +4 this month</p>
              </div>
              <div className="bg-blue-500/30 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Total Hours</p>
                <p className="text-3xl font-bold text-white">{totalHours.toFixed(0)}</p>
                <p className="text-xs text-green-400 mt-1">↗ +87 this week</p>
              </div>
              <div className="bg-green-500/30 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Active Tasks</p>
                <p className="text-3xl font-bold text-white">{activeTasks}</p>
                <p className="text-xs text-orange-400 mt-1">⚠ 2 overdue</p>
              </div>
              <div className="bg-orange-500/30 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-white">${totalEarnings.toFixed(0)}</p>
                <p className="text-xs text-green-400 mt-1">↗ +12% this month</p>
              </div>
              <div className="bg-emerald-500/30 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Hours Tracked (Weekly)</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-blue-500 text-white border-blue-500">Week</Button>
              <Button variant="outline" size="sm">Month</Button>
              <Button variant="outline" size="sm">Year</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Driver Activity Distribution</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-blue-500 text-white border-blue-500">Week</Button>
              <Button variant="outline" size="sm">Month</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Driver Performance</CardTitle>
            <Select defaultValue="hours">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">Hours (High to Low)</SelectItem>
                <SelectItem value="earnings">Earnings</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driversData.slice(0, 5).map((driver) => (
                <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{driver.name}</p>
                      <p className="text-xs text-gray-500">ID: DRV-{driver.id.slice(-4)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{driver.totalHours.toFixed(1)}h</p>
                      <p className="text-xs text-gray-500">{driver.tasks}/10</p>
                    </div>
                    <Badge variant={driver.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                      {driver.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${driver.performance}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{driver.performance}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'clock-in' ? 'bg-green-500' : 
                    activity.type === 'clock-out' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">
                        {activity.driver || activity.task}
                      </span>
                      {' '}{activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.type === 'clock-in' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/60 backdrop-blur-sm shadow-lg border-r border-white/10">
        <div className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/lovable-uploads/8a4a7666-576c-423b-9b3e-9575ae58754f.png" 
              alt="Memphis Earth Movers Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-semibold text-white">Memphis Earth Movers</span>
          </div>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  isActive 
                    ? 'bg-white/20 backdrop-blur-sm text-white border-r-2 border-blue-400' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-black/60 backdrop-blur-sm shadow-sm border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{driver.name}</p>
                  <p className="text-xs text-white/60">Administrator</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 pt-12 max-w-none">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab !== 'dashboard' && (
            <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-xl font-semibold text-white mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label} Section
              </p>
              <p className="text-white/60">This section is under development</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;