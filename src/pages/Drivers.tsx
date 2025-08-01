import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DriverLogin from "@/components/drivers/DriverLogin";
import DriverDashboard from "@/components/drivers/DriverDashboard";
const Drivers = () => {
  const [loggedInDriver, setLoggedInDriver] = useState<any>(null);
  const handleLogout = () => {
    setLoggedInDriver(null);
  };
  return <>
      <Helmet>
        <title>Driver Login - Memphis Earth Movers</title>
        <meta name="description" content="Driver time tracking and clock-in system for Memphis Earth Movers employees." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-mem-darkNavy">
        <div className="py-[5px]">
          <div className="mem-container px-0 mx-[480px]">
            {!loggedInDriver ? <DriverLogin onLogin={setLoggedInDriver} /> : <DriverDashboard driver={loggedInDriver} onLogout={handleLogout} />}
          </div>
        </div>
      </main>
      
      <Footer />
    </>;
};
export default Drivers;