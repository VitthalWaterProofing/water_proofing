import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Essential for sending and receiving HTTP-only cookies
  timeout: 60000, // 60 second timeout for large image uploads
});

export default api;
