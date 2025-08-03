
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DriverLogin from "@/components/drivers/DriverLogin";
import AdminDashboard from "@/components/drivers/AdminDashboard";
import AnimatedBackground from "@/components/AnimatedBackground";

const Admin = () => {
  const [loggedInAdmin, setLoggedInAdmin] = useState<any>(null);

  const handleLogout = () => {
    setLoggedInAdmin(null);
  };

  const handleLogin = (driver: any) => {
    // Only allow admin role users to access this page
    if (driver.role === 'admin') {
      setLoggedInAdmin(driver);
    } else {
      alert('Access denied. Admin privileges required.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Helmet>
        <title>Admin Dashboard - Memphis Earth Movers</title>
        <meta 
          name="description" 
          content="Administrative dashboard for managing drivers, time entries, and payroll at Memphis Earth Movers." 
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {!loggedInAdmin ? (
        <>
          <Header />
          <main className="min-h-screen relative z-10">
            <div className="py-0">
              <div className="w-full px-0">
                <div className="w-full">
                  <DriverLogin onLogin={handleLogin} />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <div className="relative z-10">
          <AdminDashboard driver={loggedInAdmin} onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default Admin;
