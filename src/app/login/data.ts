import { api, csrf } from '../services/axiosConfig';

export const loginRequests = {
  // Get user IP, browser, and geo location data
  getIP: async (details: { ip: string | null }) => {
    try {
      const response = await api.post('/api/lookup', details);
      return response.data;
    } catch (error) {
      console.error('Error fetching IP details:', error);
      throw error;
    }
  },

  // Get user IP address
  getIPAddress: async () => {
    try {
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      throw error;
    }
  },

  // Get all login tracker data
  tracker: async () => {
    try {
      const response = await api.get('/api/v1/tracker');
      return response.data;
    } catch (error) {
      console.error('Error fetching tracker data:', error);
      throw error;
    }
  },

  // CSRF token initialization (if needed)
  apiLogin: async () => {
    try {
      const response = await csrf.get('/sanctum/csrf-cookie');
      return response.data;
    } catch (error) {
      console.error('Error initializing CSRF token:', error);
      throw error;
    }
  },

  // User login
  login: async (user: any) => {
    try {
      const response = await api.post('/api/auth/login', user);
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Login OTP
  loginOtp: async (details: any) => {
    try {
      const response = await api.post('/api/auth/loginotp', details);
      return response.data;
    } catch (error) {
      console.error('Error during login OTP:', error);
      throw error;
    }
  },

  // Get OTP
  getOtp: async (details: any) => {
    try {
      const response = await api.post('/api/auth/generateOTP', details);
      return response.data;
    } catch (error) {
      console.error('Error generating OTP:', error);
      throw error;
    }
  },

  // Verify OTP
  verifyOtp: async (details: any) => {
    try {
      const response = await api.post('/api/v1/verifyOTP', details);
      return response.data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  // Check OTP Status
  checkOtpStatus: async (details: any) => {
    try {
      const response = await api.post('/api/v1/checkOtpStatus', details);
      return response.data;
    } catch (error) {
      console.error('Error checking OTP status:', error);
      throw error;
    }
  },
};
