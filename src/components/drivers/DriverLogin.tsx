
import { useState, useEffect } from "react";
import { Clock, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
  pin: string;
  role: string;
}

interface DriverLoginProps {
  onLogin: (driver: Driver) => void;
}

const DriverLogin = ({ onLogin }: DriverLoginProps) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [pin, setPin] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  useEffect(() => {
    fetchDrivers();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDrivers = async () => {
    console.log("Fetching drivers and admins...");
    setLoadingDrivers(true);
    
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select("id, name, pin, role")
        .eq("active", true)
        .order("name");

      console.log("Drivers and admins data:", data);
      console.log("Drivers and admins error:", error);

      if (error) {
        console.error("Error fetching drivers and admins:", error);
        toast.error("Failed to load users: " + error.message);
        return;
      }

      setDrivers(data || []);
      console.log("Set drivers and admins:", data?.length || 0, "users");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Unexpected error loading users");
    } finally {
      setLoadingDrivers(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDriver || !pin) {
      toast.error("Please select a user and enter PIN");
      return;
    }

    setLoading(true);
    
    try {
      // Use secure authentication edge function
      const { data: response, error } = await supabase.functions.invoke('secure-driver-auth', {
        body: {
          driverId: selectedDriver,
          pin: pin
        }
      });

      if (error || !response?.success) {
        const errorMessage = response?.error || error?.message || "Authentication failed";
        toast.error(errorMessage);
        setPin("");
        setLoading(false);
        return;
      }

      toast.success(response.message);
      onLogin(response.driver);
    } catch (err) {
      console.error("Authentication error:", err);
      toast.error("Authentication service error. Please try again.");
      setPin("");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="mem-card text-center max-w-md w-full ml-48">
        <div className="mb-8">
          <Clock className="mx-auto mb-4 text-mem-babyBlue" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Driver Login</h1>
          <p className="text-white/90">Memphis Earth Movers Time Clock</p>
        </div>

        <div className="mb-8 p-4 bg-mem-blue/20 rounded-lg">
          <div className="text-2xl font-bold text-mem-babyBlue">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-white/90">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/90 mb-2 text-left">
              <User className="inline mr-2" size={16} />
              Select User
            </label>
            {loadingDrivers ? (
              <div className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white/70">
                Loading users...
              </div>
            ) : (
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white/90 border border-mem-babyBlue/30 text-gray-800 focus:outline-none focus:ring-2 focus:ring-mem-babyBlue appearance-none"
                style={{ 
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em'
                }}
                required
              >
                <option value="">Choose your name...</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} {driver.role === 'admin' ? '(Admin)' : ''}
                  </option>
                ))}
              </select>
            )}
            {!loadingDrivers && drivers.length === 0 && (
              <p className="text-red-400 text-sm mt-1">No active users found. Please contact administrator.</p>
            )}
            {!loadingDrivers && drivers.length > 0 && (
              <p className="text-white/60 text-sm mt-1">{drivers.length} user(s) available</p>
            )}
          </div>

          <div>
            <label className="block text-white/90 mb-2 text-left">
              <Lock className="inline mr-2" size={16} />
              Enter PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              className="w-full px-4 py-3 rounded-md bg-white/90 border border-mem-babyBlue/30 text-gray-800 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-mem-babyBlue"
              placeholder="••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || loadingDrivers || !selectedDriver || !pin}
            className="w-full bg-mem-blue text-white font-bold py-4 px-6 rounded-md hover:bg-mem-darkBlue transition-colors duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Debug info for development */}
        <div className="mt-4 text-xs text-white/50">
          Debug: {drivers.length} users loaded (including {drivers.filter(d => d.role === 'admin').length} admin(s))
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
