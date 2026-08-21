import React, { useState } from "react";
import { loginUser, registerUser } from "../api";
import {
  User,
  Mail,
  Lock,
  Calendar,
  UserCheck,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Page2() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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

        localStorage.setItem("token", res.data.token);
        setMessage({ type: "success", text: "Login Successful!" });
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

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="w-full max-w-4xl bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Visual Banner */}
        <div className="p-8 md:p-12 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-950 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
              Design Variant 02
            </h1>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Experience an asymmetric split-screen layout with glowing
              micro-interactions and clean field typography.
            </p>
          </div>

          <div className="mt-8 relative z-10">
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl">
              <p className="text-xs text-slate-400">
                "
                {isLogin
                  ? "Welcome back! Access your account dashboard."
                  : "Join our platform and manage your auth profile."}
                "
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-slate-900/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage({ type: "", text: "" });
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
            >
              {isLogin ? "Need an account?" : "Already registered?"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {message.text && (
            <div
              className={`p-3 rounded-xl text-xs mb-4 border ${
                message.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {!isLogin && (
              <>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Muhammad Ahmad"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Age
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="number"
                        name="age"
                        required
                        placeholder="18"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      Gender
                    </label>
                    <div className="relative">
                      <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option
                          value="male"
                          className="bg-slate-900 text-white"
                        >
                          Male
                        </option>
                        <option
                          value="female"
                          className="bg-slate-900 text-white"
                        >
                          Female
                        </option>
                        <option
                          value="other"
                          className="bg-slate-900 text-white"
                        >
                          Other
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs text-slate-400 block mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ahmad@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg py-2 pl-9 pr-8 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isLogin ? (
                "Continue to App"
              ) : (
                "Create Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page2;
