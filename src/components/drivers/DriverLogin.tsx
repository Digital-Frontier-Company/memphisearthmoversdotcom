
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
    <div className="min-h-screen flex items-center justify-center px-3 py-4">
      <div className="mem-card text-center w-full max-w-[360px] mx-auto">
        {/* Header */}
        <div className="mb-5">
          <div className="flex justify-center mb-3">
            <div className="bg-mem-blue/20 p-2.5 rounded-full">
              <Clock className="text-mem-babyBlue" size={28} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-white mb-1.5">Employee Login</h1>
          <p className="text-white/80 text-sm">Memphis Earth Movers Time Clock</p>
        </div>

        {/* Live Clock */}
        <div className="mb-5 p-3 bg-mem-blue/20 rounded-lg border border-mem-babyBlue/30">
          <div className="text-lg font-bold text-mem-babyBlue font-mono">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-white/80 text-xs mt-0.5">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Driver Selection */}
          <div>
            <label className="flex items-center text-white/90 mb-2 text-left text-sm">
              <User className="mr-2 flex-shrink-0" size={16} />
              Select Your Name
            </label>
            {loadingDrivers ? (
              <div className="w-full px-3 py-3.5 rounded-lg bg-white/10 border border-mem-babyBlue/30 text-white/70 flex items-center justify-center min-h-[56px]">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-mem-babyBlue mr-2"></div>
                Loading...
              </div>
            ) : (
              <>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full px-3 py-3.5 rounded-lg bg-white/95 border-2 border-mem-babyBlue/30 text-gray-800 focus:outline-none focus:ring-2 focus:ring-mem-babyBlue focus:border-mem-babyBlue appearance-none text-base transition-all duration-200 min-h-[56px]"
                  style={{ 
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.1em'
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
                {drivers.length === 0 && (
                  <div className="mt-2 p-2.5 bg-red-500/20 border border-red-400/30 rounded-lg">
                    <p className="text-red-400 text-xs">No active users found. Please contact administrator.</p>
                  </div>
                )}
                {drivers.length > 0 && (
                  <p className="text-white/60 text-xs mt-1.5">{drivers.length} employee{drivers.length !== 1 ? 's' : ''} available</p>
                )}
              </>
            )}
          </div>

          {/* PIN Input */}
          <div>
            <label className="flex items-center text-white/90 mb-2 text-left text-sm">
              <Lock className="mr-2 flex-shrink-0" size={16} />
              Enter Your 4-Digit PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                setPin(value);
              }}
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full px-3 py-4 rounded-lg bg-white/95 border-2 border-mem-babyBlue/30 text-gray-800 text-center text-2xl tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-mem-babyBlue focus:border-mem-babyBlue transition-all duration-200 font-mono min-h-[56px]"
              placeholder="••••"
              autoComplete="off"
              required
            />
            <p className="text-white/50 text-xs mt-1.5">Enter the 4-digit PIN provided by your supervisor</p>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading || loadingDrivers || !selectedDriver || pin.length !== 4}
              className="w-full bg-mem-blue text-white font-bold py-4 px-4 rounded-lg hover:bg-mem-darkBlue transition-all duration-300 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-mem-blue shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] min-h-[56px]"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Lock className="mr-2" size={18} />
                  Clock In
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Status Indicator */}
        {!loadingDrivers && (
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center text-white/60 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              System Online • {drivers.length} Active Employee{drivers.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-xs">
            Need help? Contact your supervisor or call (901) MOVE-DIRT
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
