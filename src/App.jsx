import React, { useState } from "react";
import { loginUser, registerUser } from "./api";
import Dashboard from "./Dashboard";
import {
  User,
  Mail,
  Lock,
  Calendar,
  UserCheck,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (isLogin) {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        // Token save aur user state set
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user || { email: formData.email });
      } else {
        await registerUser(formData);
        setMessage({
          type: "success",
          text: "Account created! You can now login.",
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Login successful hone par Dashboard render hoga
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  toast.success("Login Successful!");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Tab Switcher */}
        <div className="flex bg-slate-950/80 p-1.5 rounded-2xl mb-8 border border-slate-800/80">
          <button
            onClick={() => {
              setIsLogin(true);
              setMessage({ type: "", text: "" });
            }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
              isLogin
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setMessage({ type: "", text: "" });
            }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
              !isLogin
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isLogin
              ? "Enter your details to access your account"
              : "Fill in your details to get started"}
          </p>
        </div>

        {/* Alert Box */}
        {message.text && (
          <div
            className={`p-3.5 rounded-xl text-sm mb-6 border ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Age/Gender for Signup */}
          {!isLogin && (
            <>
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Muhammad Ahmad"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                    Age
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="number"
                      name="age"
                      required
                      placeholder="18"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                    Gender
                  </label>
                  <div className="relative">
                    <UserCheck className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value="male" className="bg-slate-900 text-white">
                        Male
                      </option>
                      <option
                        value="female"
                        className="bg-slate-900 text-white"
                      >
                        Female
                      </option>
                      <option value="other" className="bg-slate-900 text-white">
                        Other
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                name="email"
                required
                placeholder="ahmad@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-11 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
