import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Dashboard";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import OtpTester from "./components/OtpTester"; // OTP Component Import

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/page-1" replace />} />
            <Route path="/page-1" element={<Page1 />} />
            <Route path="/page-2" element={<Page2 />} />
            <Route path="/page-3" element={<Page3 />} />
            <Route path="/otp-test" element={<OtpTester />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
