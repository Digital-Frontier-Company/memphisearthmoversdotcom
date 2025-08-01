
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DriverLogin from "@/components/drivers/DriverLogin";
import AdminDashboard from "@/components/drivers/AdminDashboard";

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
    <>
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
          <main className="min-h-screen mesh-gradient-bg">
            <div className="py-16">
              <div className="mem-container">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">Admin Access</h1>
                    <p className="text-white/80">Please log in with admin credentials to access the management dashboard.</p>
                  </div>
                  <DriverLogin onLogin={handleLogin} />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <AdminDashboard driver={loggedInAdmin} onLogout={handleLogout} />
      )}
    </>
  );
};

export default Admin;
