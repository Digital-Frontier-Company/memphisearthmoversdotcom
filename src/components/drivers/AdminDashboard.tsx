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
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Circle,
  User,
  Truck,
  MapPin
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  role?: string;
  totalHours: number;
  totalEarnings: number;
  regularHours: number;
  overtimeHours: number;
  lastActivity: string;
  status: 'Active' | 'Inactive' | 'On Break';
  activeTasks: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assigned_driver_id: string | null;
  created_by_id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date: string | null;
  truck_number: string | null;
  job_address: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  driver_name?: string;
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

interface ActivityLog {
  id: string;
  actor_name: string;
  action: string;
  target_type: string;
  target_name: string;
  description: string;
  created_at: string;
}

const AdminDashboard = ({ driver, onLogout }: AdminDashboardProps) => {
  const [driversData, setDriversData] = useState<DriverData[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'drivers' | 'time-tracking' | 'tasks' | 'earnings' | 'reports' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assigned_driver_id: '',
    priority: 'medium' as const,
    due_date: '',
    truck_number: '',
    job_address: '',
    estimated_hours: '',
    notes: ''
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchAllDriversData(), 
      fetchAllTimeEntries(), 
      fetchTasks(), 
      fetchActivityLogs()
    ]);
    setLoading(false);
  };

  const fetchAllDriversData = async () => {
    const { data: drivers, error: driversError } = await supabase
      .from("drivers")
      .select("*")
      .eq("active", true);

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

      // Get active tasks count
      const { count: activeTasksCount } = await supabase
        .from("tasks")
        .select("*", { count: 'exact', head: true })
        .eq("assigned_driver_id", driverRecord.id)
        .in("status", ["pending", "in_progress"]);

      driversWithData.push({
        id: driverRecord.id,
        name: driverRecord.name,
        hourly_rate: driverRecord.hourly_rate || 0,
        phone: driverRecord.phone,
        email: driverRecord.email,
        truck_assigned: driverRecord.truck_assigned,
        active: driverRecord.active,
        role: driverRecord.role,
        totalHours: earnings?.total_hours || 0,
        totalEarnings: earnings?.total_earnings || 0,
        regularHours: earnings?.regular_hours || 0,
        overtimeHours: earnings?.overtime_hours || 0,
        lastActivity: lastEntry?.created_at || "No activity",
        status: 'Active',
        activeTasks: activeTasksCount || 0
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

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select(`
        *,
        drivers!tasks_assigned_driver_id_fkey(name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch tasks:", error);
      return;
    }

    const tasksWithDriverNames = data?.map(task => ({
      ...task,
      priority: task.priority as 'low' | 'medium' | 'high' | 'urgent',
      status: task.status as 'pending' | 'in_progress' | 'completed' | 'cancelled',
      driver_name: task.drivers?.name || null
    })) || [];

    setTasks(tasksWithDriverNames);
  };

  const fetchActivityLogs = async () => {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Failed to fetch activity logs:", error);
      return;
    }

    setActivityLogs(data || []);
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

  const resetTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      assigned_driver_id: '',
      priority: 'medium',
      due_date: '',
      truck_number: '',
      job_address: '',
      estimated_hours: '',
      notes: ''
    });
    setEditingTask(null);
  };

  const handleCreateTask = async () => {
    if (!taskForm.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .insert({
        ...taskForm,
        created_by_id: driver.id,
        estimated_hours: taskForm.estimated_hours ? parseFloat(taskForm.estimated_hours) : null,
        assigned_driver_id: taskForm.assigned_driver_id || null
      });

    if (error) {
      toast.error("Failed to create task");
      console.error(error);
      return;
    }

    // Log activity
    await supabase.rpc('log_activity', {
      p_actor_id: driver.id,
      p_actor_name: driver.name,
      p_action: 'created',
      p_target_type: 'task',
      p_target_name: taskForm.title,
      p_description: `Created new task: ${taskForm.title}`
    });

    toast.success("Task created successfully");
    setShowTaskDialog(false);
    resetTaskForm();
    fetchTasks();
    fetchActivityLogs();
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updates: any = { 
      status: newStatus,
      updated_at: new Date().toISOString()
    };

    if (newStatus === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId);

    if (error) {
      toast.error("Failed to update task");
      return;
    }

    // Log activity
    await supabase.rpc('log_activity', {
      p_actor_id: driver.id,
      p_actor_name: driver.name,
      p_action: 'updated',
      p_target_type: 'task',
      p_target_id: taskId,
      p_target_name: task.title,
      p_description: `Changed task status to ${newStatus}`
    });

    toast.success("Task updated successfully");
    fetchTasks();
    fetchActivityLogs();
    if (activeTab === 'dashboard') {
      fetchAllDriversData(); // Refresh task counts
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (!confirm("Are you sure you want to delete this task?")) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      toast.error("Failed to delete task");
      return;
    }

    // Log activity
    await supabase.rpc('log_activity', {
      p_actor_id: driver.id,
      p_actor_name: driver.name,
      p_action: 'deleted',
      p_target_type: 'task',
      p_target_id: taskId,
      p_target_name: task.title,
      p_description: `Deleted task: ${task.title}`
    });

    toast.success("Task deleted successfully");
    fetchTasks();
    fetchActivityLogs();
    if (activeTab === 'dashboard') {
      fetchAllDriversData(); // Refresh task counts
    }
  };

  // Calculate metrics
  const totalDrivers = driversData.length;
  const totalHours = driversData.reduce((sum, driver) => sum + driver.totalHours, 0);
  const totalEarnings = driversData.reduce((sum, driver) => sum + driver.totalEarnings, 0);
  const activeTasks = tasks.filter(t => ['pending', 'in_progress'].includes(t.status)).length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const overdueTasks = tasks.filter(t => 
    t.due_date && 
    new Date(t.due_date) < new Date() && 
    !['completed', 'cancelled'].includes(t.status)
  ).length;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

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
                <p className="text-xs text-blue-400 mt-1">Active drivers</p>
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
                <p className="text-slate-300 text-sm font-medium">Active Tasks</p>
                <p className="text-3xl font-bold text-white">{activeTasks}</p>
                <p className="text-xs text-orange-400 mt-1">{overdueTasks} overdue</p>
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
                <p className="text-slate-300 text-sm font-medium">Total Hours</p>
                <p className="text-3xl font-bold text-white">{totalHours.toFixed(0)}</p>
                <p className="text-xs text-green-400 mt-1">This week</p>
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
                <p className="text-slate-300 text-sm font-medium">Total Earnings</p>
                <p className="text-3xl font-bold text-white">${totalEarnings.toFixed(0)}</p>
                <p className="text-xs text-emerald-400 mt-1">This week</p>
              </div>
              <div className="bg-emerald-500/30 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Performance & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-white">Driver Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driversData.slice(0, 5).map((driver) => (
                <div key={driver.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-white">{driver.name}</p>
                      <p className="text-xs text-slate-400">{driver.truck_assigned || 'No truck assigned'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{driver.totalHours.toFixed(1)}h</p>
                      <p className="text-xs text-slate-400">{driver.activeTasks} tasks</p>
                    </div>
                    <Badge variant={driver.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                      {driver.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">
                      <span className="font-medium">
                        {activity.actor_name}
                      </span>
                      {' '}{activity.action} {activity.target_type}
                      {activity.target_name && ` "${activity.target_name}"`}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const TasksContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Task Management</h2>
        <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetTaskForm();
              setShowTaskDialog(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new task and assign it to a driver.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Title *</label>
                <Input
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Description</label>
                <Textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter task description"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Assign to Driver</label>
                  <Select
                    value={taskForm.assigned_driver_id}
                    onValueChange={(value) => setTaskForm(prev => ({ ...prev, assigned_driver_id: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="">Unassigned</SelectItem>
                      {driversData.filter(d => d.role !== 'admin').map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Priority</label>
                  <Select
                    value={taskForm.priority}
                    onValueChange={(value: any) => setTaskForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Due Date</label>
                  <Input
                    type="date"
                    value={taskForm.due_date}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, due_date: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Estimated Hours</label>
                  <Input
                    type="number"
                    step="0.5"
                    value={taskForm.estimated_hours}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, estimated_hours: e.target.value }))}
                    placeholder="0.0"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Truck Number</label>
                  <Input
                    value={taskForm.truck_number}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, truck_number: e.target.value }))}
                    placeholder="e.g., TRUCK-01"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Job Address</label>
                  <Input
                    value={taskForm.job_address}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, job_address: e.target.value }))}
                    placeholder="Job site address"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Notes</label>
                <Textarea
                  value={taskForm.notes}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes or instructions"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowTaskDialog(false)}
                  className="border-slate-600 text-white"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Pending</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'pending').length}</p>
              </div>
              <Circle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">In Progress</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'in_progress').length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Completed</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Overdue</p>
                <p className="text-2xl font-bold">{overdueTasks}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-white">{task.title}</h3>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-sm text-slate-400 mb-2">{task.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      {task.driver_name && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{task.driver_name}</span>
                        </div>
                      )}
                      {task.truck_number && (
                        <div className="flex items-center space-x-1">
                          <Truck className="h-3 w-3" />
                          <span>{task.truck_number}</span>
                        </div>
                      )}
                      {task.job_address && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{task.job_address}</span>
                        </div>
                      )}
                      {task.due_date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </div>
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleUpdateTaskStatus(task.id, value)}
                    >
                      <SelectTrigger className="w-32 h-8 bg-slate-600 border-slate-500 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400">No tasks found. Create your first task!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DriversContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Driver Management</h2>
      <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {driversData.map((driver) => (
              <div key={driver.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{driver.name}</h3>
                      <p className="text-sm text-slate-400">
                        {driver.phone} • {driver.email}
                      </p>
                      <p className="text-sm text-slate-400">
                        Truck: {driver.truck_assigned || 'Not assigned'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-white">
                      ${driver.hourly_rate}/hr
                    </p>
                    <p className="text-sm text-slate-400">
                      {driver.totalHours.toFixed(1)}h this week
                    </p>
                    <p className="text-sm text-slate-400">
                      {driver.activeTasks} active tasks
                    </p>
                    <Badge variant={driver.active ? 'default' : 'secondary'}>
                      {driver.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TimeTrackingContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Time Tracking</h2>
      <Card className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Recent Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.slice(0, 20).map((entry) => (
              <div key={entry.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">{entry.driver_name}</h3>
                    <p className="text-sm text-slate-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-400">
                      Truck: {entry.truck_number}
                    </p>
                    {entry.job_address && (
                      <p className="text-sm text-slate-400">
                        Location: {entry.job_address}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">
                      {new Date(entry.clock_in_time).toLocaleTimeString()} - 
                      {entry.clock_out_time ? new Date(entry.clock_out_time).toLocaleTimeString() : 'Active'}
                    </p>
                    <p className="text-sm text-slate-400">
                      {entry.hours_worked ? `${entry.hours_worked} hours` : 'In progress'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen morphing-grid-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen morphing-grid-bg flex">
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
                  className="pl-10 w-64 bg-slate-700 border-slate-600 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative text-white">
                <Bell className="h-5 w-5" />
                {overdueTasks > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {overdueTasks}
                  </span>
                )}
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
                <Button variant="ghost" size="sm" onClick={onLogout} className="text-white">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 pt-12 max-w-none">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'tasks' && <TasksContent />}
          {activeTab === 'drivers' && <DriversContent />}
          {activeTab === 'time-tracking' && <TimeTrackingContent />}
          {['earnings', 'reports', 'settings'].includes(activeTab) && (
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