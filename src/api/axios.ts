import axios from 'axios';

const baseURL = 'http://localhost:8081/api/v1';

// Public API instance
export const publicApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Private API instance with auth header
export const privateApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for private API
privateApi.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.data.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for both instances
const responseInterceptor = (response: any) => {
  return response.data;
};

const errorInterceptor = (error: any) => {
  const errorMessage = error.response?.data?.message || 'An error occurred';
  return Promise.reject(errorMessage);
};

publicApi.interceptors.response.use(responseInterceptor, errorInterceptor);
privateApi.interceptors.response.use(responseInterceptor, errorInterceptor);
