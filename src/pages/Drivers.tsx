import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DriverLogin from "@/components/drivers/DriverLogin";
import DriverDashboard from "@/components/drivers/DriverDashboard";
import AnimatedBackground from "@/components/AnimatedBackground";
const Drivers = () => {
  const [loggedInDriver, setLoggedInDriver] = useState<any>(null);
  const handleLogout = () => {
    setLoggedInDriver(null);
  };
  return <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Helmet>
        <title>Driver Login - Memphis Earth Movers</title>
        <meta name="description" content="Driver time tracking and clock-in system for Memphis Earth Movers employees." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen relative z-10">
        <div className="py-0">
          <div className="w-full px-0">
            {!loggedInDriver ? <DriverLogin onLogin={setLoggedInDriver} /> : <DriverDashboard driver={loggedInDriver} onLogout={handleLogout} />}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Drivers;