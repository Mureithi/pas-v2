import { loginRequests } from '../app/login/data';

/**
 * Fetches the user's IP address.
 * @returns {Promise<string | null>} The IP address or null if an error occurs.
 */
export const fetchIpAddress = async (): Promise<string | null> => {
  try {
    const data = await loginRequests.getIPAddress();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
};

/**
 * Fetches IP details based on the IP address.
 * @param ipaddress The IP address to fetch details for.
 * @returns {Promise<any | null>} The IP details or null if an error occurs.
 */
export const fetchIpDetails = async (ipaddress: string | null): Promise<any | null> => {
  if (ipaddress) {
    try {
      const data = await loginRequests.getIP({ ip: ipaddress });
      return data;
    } catch (error) {
      console.error('Error fetching IP details:', error);
      return null;
    }
  }
  return null;
};

/**
 * Detects the user's browser.
 * @returns {string} The name of the browser.
 */
export const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Opera') || userAgent.includes(' OPR/')) return 'Opera';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('MSIE') || !!document.documentMode) return 'IE';
  return 'Unknown';
};
