import axios from 'axios';

// Base configuration for gym registration API
const gymRegistrationClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://107.108.5.184:60',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
gymRegistrationClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
gymRegistrationClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // You can redirect to login page here if needed
    }
    
    return Promise.reject(error);
  }
);

export default gymRegistrationClient; 