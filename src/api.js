import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData) => API.post("/login", formData);
export const registerUser = (formData) => API.post("/register", formData);
export const getProfile = () => API.get("/profile");
