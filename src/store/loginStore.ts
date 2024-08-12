import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginState {
  loginParams: any;
  error: { message: string } | null;
  userId: string | null;
  showSpinner: boolean;
  showOtpForm: boolean;
  rememberMe: boolean;
  loggedIn: boolean;
  success: string | null;
  history: any;
  counter: number;
  otpFailed: boolean;
  ipAddress: string | null;
  clearNotices: () => void;
  setLoginParams: (params: any) => void;
  setError: (error: { message: string } | null) => void;
  setUserId: (userId: string | null) => void;
  setShowSpinner: (showSpinner: boolean) => void;
  setShowOtpForm: (showOtpForm: boolean) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setSuccess: (success: string | null) => void;
  saveHistory: (history: any) => void;
  setCounter: (counter: number) => void;
  setOtpFailed: (otpFailed: boolean) => void;
  setIpAddress: (ipAddress: string) => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      loginParams: null,
      error: null,
      userId: null,
      showSpinner: false,
      showOtpForm: false,
      rememberMe: false,
      loggedIn: false,
      success: null,
      history: null,
      counter: 300, // default value
      otpFailed: false,
      ipAddress: null,

      clearNotices: () => set({ error: null, success: null }),

      setLoginParams: (params) => set({ loginParams: params }),

      setError: (error) => set({ error }),

      setUserId: (userId) => set({ userId }),

      setShowSpinner: (showSpinner) => set({ showSpinner }),

      setShowOtpForm: (showOtpForm) => set({ showOtpForm }),

      setRememberMe: (rememberMe) => set({ rememberMe }),

      setLoggedIn: (loggedIn) => set({ loggedIn }),

  // setLoggedIn: (loggedIn) => {
  //   Cookies.set('loggedIn', String(loggedIn), { expires: 30 }); // Expires in 7 days
  //   set({ loggedIn });
  // },

      setSuccess: (success) => set({ success }),

      saveHistory: (history) => set({ history }),

      setCounter: (counter) => set({ counter }),

      setOtpFailed: (otpFailed) => set({ otpFailed }),

      setIpAddress: (ipAddress) => set({ ipAddress }),

    }),
    {
      name: 'login-storage', // Name of the storage item in localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useLoginStore;
