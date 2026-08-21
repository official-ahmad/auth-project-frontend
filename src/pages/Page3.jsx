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
  ShieldAlert,
} from "lucide-react";

function Page3() {
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Design Variant 03
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage({ type: "", text: "" });
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </div>

        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">
            {isLogin ? "System Authentication" : "Register Credentials"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isLogin
              ? "Provide your key to log in"
              : "Fill out your profile details"}
          </p>
        </div>

        {message.text && (
          <div
            className={`p-3 rounded-lg text-xs mb-4 flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Gender
                  </label>
                  <div className="relative">
                    <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
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

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                name="email"
                required
                placeholder="ahmad@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
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
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-8 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
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
            className="w-full mt-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-2 rounded-lg transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isLogin ? (
              "Submit"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page3;
