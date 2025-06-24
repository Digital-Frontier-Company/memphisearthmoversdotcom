
import { useState, useEffect } from "react";
import { Clock, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
  pin: string;
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

  useEffect(() => {
    fetchDrivers();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDrivers = async () => {
    const { data, error } = await supabase
      .from("drivers")
      .select("id, name, pin")
      .eq("active", true)
      .order("name");

    if (error) {
      toast.error("Failed to load drivers");
      return;
    }

    setDrivers(data || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDriver || !pin) {
      toast.error("Please select a driver and enter PIN");
      return;
    }

    setLoading(true);
    const driver = drivers.find(d => d.id === selectedDriver);
    
    if (driver && driver.pin === pin) {
      toast.success(`Welcome, ${driver.name}!`);
      onLogin(driver);
    } else {
      toast.error("Invalid PIN. Please try again.");
      setPin("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mem-card text-center">
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
              Select Driver
            </label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white focus:outline-none focus:ring-2 focus:ring-mem-babyBlue"
              required
            >
              <option value="">Choose your name...</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id} className="text-gray-800">
                  {driver.name}
                </option>
              ))}
            </select>
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
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-mem-babyBlue/30 text-white text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-mem-babyBlue"
              placeholder="••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mem-blue text-white font-bold py-4 px-6 rounded-md hover:bg-mem-darkBlue transition-colors duration-300 text-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverLogin;
