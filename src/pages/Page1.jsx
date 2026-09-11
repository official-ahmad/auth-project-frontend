import React, { useState, useRef } from "react";
import {
  loginUser,
  registerUser,
  verifyOtp,
  sendOtp,
  resetPassword,
} from "../api";
import {
  User,
  Mail,
  Lock,
  Calendar,
  UserCheck,
  Eye,
  EyeOff,
  Loader2,
  KeyRound,
  X,
} from "lucide-react";

function Page1() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // OTP Modal & 6-Digit Array State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpBoxes, setOtpBoxes] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    age: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 6 Boxes input handling (Auto-focus & Paste handling)
  const handleOtpBoxChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpBoxes];
    newOtp[index] = value.slice(-1);
    setOtpBoxes(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpBoxes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (isForgot) {
        // Forgot Password Flow
        await sendOtp(formData.email);
        setShowOtpModal(true);
        setMessage({
          type: "success",
          text: "OTP sent to your email for password reset!",
        });
      } else if (isLogin) {
        // Login Flow -> Credentials verify hotay hi OTP Popup show hoga
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        if (res.data.requireOtp) {
          setShowOtpModal(true);
        }
      } else {
        // Direct Signup Flow (No OTP)
        await registerUser(formData);
        setMessage({
          type: "success",
          text: "Account created successfully! Please Sign In.",
        });
        setIsLogin(true);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Handler inside Popup Modal
  const handleVerifyOtpModal = async (e) => {
    e.preventDefault();
    const fullOtp = otpBoxes.join("");
    if (fullOtp.length !== 6) {
      alert("Please enter full 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      if (isForgot) {
        await resetPassword({
          email: formData.email,
          otp: fullOtp,
          newPassword: formData.newPassword,
        });
        alert("Password Reset Successfully!");
        setShowOtpModal(false);
        setIsForgot(false);
        setIsLogin(true);
      } else {
        const res = await verifyOtp(formData.email, fullOtp);
        localStorage.setItem("token", res.data.token);
        alert("Login Successful!");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or Expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative font-sans">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Navigation Tabs */}
        {!isForgot && (
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl mb-8 border border-slate-800/80">
            <button
              onClick={() => {
                setIsLogin(true);
                setMessage({ type: "", text: "" });
              }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl ${isLogin ? "bg-indigo-600 text-white" : "text-slate-400"}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setMessage({ type: "", text: "" });
              }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl ${!isLogin ? "bg-indigo-600 text-white" : "text-slate-400"}`}
            >
              Sign Up
            </button>
          </div>
        )}

        <h2 className="text-2xl font-bold text-white mb-2">
          {isForgot
            ? "Reset Password 🔒"
            : isLogin
              ? "Welcome Back 👋"
              : "Create Account 🚀"}
        </h2>

        {message.text && (
          <div
            className={`p-3 rounded-xl text-sm mb-4 border ${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}
          >
            {message.text}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !isForgot && (
            <>
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="age"
                  required
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white text-sm"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </>
          )}

          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white text-sm"
          />

          {!isForgot ? (
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white text-sm"
            />
          ) : (
            <input
              type="password"
              name="newPassword"
              required
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-white text-sm"
            />
          )}

          {isLogin && !isForgot && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgot(true)}
                className="text-xs text-indigo-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : isForgot ? (
              "Send Reset OTP"
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {isForgot && (
            <button
              type="button"
              onClick={() => setIsForgot(false)}
              className="w-full text-xs text-slate-400 mt-2"
            >
              Back to Login
            </button>
          )}
        </form>
      </div>

      {/* 6-DIGIT OTP POPUP MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <KeyRound className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white">
              Enter Verification Code
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              6-digit OTP sent to{" "}
              <span className="text-indigo-400">{formData.email}</span>
            </p>

            <form onSubmit={handleVerifyOtpModal}>
              {/* 6 Single-Digit Boxes */}
              <div className="flex justify-between gap-2 mb-6">
                {otpBoxes.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpBoxChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-11 h-12 bg-slate-950 border border-slate-800 rounded-xl text-center text-xl font-bold text-white focus:border-indigo-500 focus:outline-none transition"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page1;
