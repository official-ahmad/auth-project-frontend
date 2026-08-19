import axios from "axios";

// Node.js Backend Base URL
const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

export const loginUser = (formData) => API.post("/login", formData);
export const registerUser = (formData) => API.post("/register", formData);
