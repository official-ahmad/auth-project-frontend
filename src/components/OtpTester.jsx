import React, { useState } from "react";
import { sendOtp, verifyOtp } from "../api";

const OtpTester = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendOtp(email);
      alert(res.data.message || "OTP Sent!");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-slate-900 rounded-xl border border-slate-800 space-y-4 my-10 text-white">
      <h2 className="text-xl font-bold text-center">OTP Verification Test</h2>

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-3">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-3">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-center tracking-widest text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default OtpTester;
