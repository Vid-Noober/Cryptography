import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
      : "hover:text-blue-600 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      
      {/* Navbar (Now Global) */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-center gap-8 text-sm font-semibold">
          
          <button onClick={() => navigate("/")} className={linkClass("/")}>
            Home
          </button>

          <button onClick={() => navigate("/history")} className={linkClass("/history")}>
            Demo
          </button>

          <button onClick={() => navigate("/info")} className={linkClass("/info")}>
            Report
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;