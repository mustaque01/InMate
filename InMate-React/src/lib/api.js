import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Type definitions (for reference only, not enforced)
// User: { id, email, name, role, phone?, studentId?, roomNumber? }
// LoginResponse: { token, user }
// Room: { _id, roomNumber, type, capacity, currentOccupancy, floor, block, monthlyRent, amenities, status, description? }
// DashboardStats: { stats: { ... }, recentBookings, recentPayments }

// Authentication API
export const auth = {
  login: async (email, password, role) => {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Dashboard API
export const dashboard = {
  getAdminStats: async () => {
    const response = await api.get('/dashboard/admin');
    return response.data;
  },

  getStudentStats: async () => {
    const response = await api.get('/dashboard/student');
    return response.data;
  },
};

// Rooms API
export const rooms = {
  getAll: async () => {
    const response = await api.get('/rooms');
    return response.data;
  },

  create: async (roomData) => {
    const response = await api.post('/rooms', roomData);
    return response.data;
  },
};

// Users API
export const users = {
  getAll: async (params) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  update: async (id, updates) => {
    const response = await api.put(`/users/${id}`, updates);
    return response.data;
  },
};

export default api;
