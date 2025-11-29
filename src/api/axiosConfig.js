import axios from "axios";

const BASE_URL = "https://threed-prints-ecommerce-backend.onrender.com/"; // adjust if needed

const api = axios.create({
  baseURL: BASE_URL,
});

// // Automatically attach token from localStorage
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

api.setAuthToken = (token) => {
if (token) api.defaults.headers.common['Authorization'] = token? `Bearer ${token}` : "";
else delete api.defaults.headers.common['Authorization'];
};

export default api;
