import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const { CancelToken } = axios;
export const source = CancelToken.source();

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000, // 15 min
});

const env = process.env.NEXT_PUBLIC_ENV === 'production' ||
            process.env.NEXT_PUBLIC_ENV === 'staging' ||
            process.env.NEXT_PUBLIC_ENV === 'develop' ||
            process.env.NEXT_PUBLIC_ENV === 'uat';

// Base URLs based on environment
const baseURL = env ? process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_API_URL_DEV;
const reportBaseURL = env ? process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_REPORT_API_URL_DEV;

// Create `axios` instances
export const csrf = axios.create({
  baseURL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
});

export const api = axios.create({
  baseURL,
  responseType: 'json',
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' },
  cancelToken: source.token,
});

export const downloadApi = axios.create({
  baseURL,
  responseType: 'blob',
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  cancelToken: source.token,
});

export const reportApi = axios.create({
  baseURL: reportBaseURL,
  responseType: 'blob',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  cancelToken: source.token,
});
