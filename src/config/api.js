import axios from "axios";
import { API_BASE_URL } from "./constants";

// Base URL for all API requests
export const BASE_URL = `${API_BASE_URL}/api`;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling common responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("authToken");
      // You can add redirect logic here if needed
    }
    return Promise.reject(error);
  },
);

// Referral API endpoints
export const referralAPI = {
  // Get user's referral info
  getReferralInfo: () => api.get("/referral/info"),

  // Get user's referral transactions
  getReferralTransactions: () => api.get("/referral/transactions"),

  // Withdraw referral earnings
  withdrawReferralEarnings: (data) => api.post("/referral/withdraw", data),

  // Admin: Update transaction status
  updateTransactionStatus: (id, data) =>
    api.put(`/referral/transactions/${id}`, data),
};

export default api;
