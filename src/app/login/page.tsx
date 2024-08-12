"use client";

import { useState, useEffect, memo } from 'react';
import { Typography } from '@mui/material';
import Logo from '../common/components/logo';
import LoginForm from './login-form';
import OTPForm from './otp-form';
import Carousel from './carousel';
import useLoginStore from '../../store/loginStore';
import { fetchIpAddress, fetchIpDetails, getBrowser } from '../../utils/helpers';

const Login = () => {
  const [lookup, setLookup] = useState<any | null>(null);
  const [browser, setBrowser] = useState<string>('Unknown');
  const [otpFormVisible, setOtpFormVisible] = useState(false);

  const {
    loggedIn,
    clearNotices,
    setShowOtpForm,
    setSuccess,
    setError,
    saveHistory,
    counter,
    setCounter,
    ipAddress, 
    setIpAddress,
  } = useLoginStore();

  const isProductionEnv = process.env.NEXT_PUBLIC_ENV === 'production' ||
                          process.env.NEXT_PUBLIC_ENV === 'staging' ||
                          process.env.NEXT_PUBLIC_ENV === 'develop' ||
                          process.env.NEXT_PUBLIC_ENV === 'uat';

  // Fetch IP address on component mount and set IP details
  useEffect(() => {
    const fetchAndSetIpData = async () => {
      const ip = await fetchIpAddress();
      setIpAddress(ip || '');
      if (ip) {
        const details = await fetchIpDetails(ip);
        setLookup(details);
      }
    };
    fetchAndSetIpData();
  }, [setIpAddress]);

  // Clear notices and fetch history when loggedIn, history, or ipAddress changes
  useEffect(() => {
    clearNotices();
    if (!loggedIn && isProductionEnv && ipAddress) {
      fetchIpDetails(ipAddress).then(setLookup).catch(console.error);
    }
    saveHistory(history);
  }, [loggedIn, ipAddress, clearNotices, isProductionEnv, saveHistory]);

  // Set browser information
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBrowser(getBrowser());
    }
  }, []);

  const configs = { browser: browser || 'Unknown', lookup };

  const resetFormState = () => {
    setShowOtpForm(false);
    setSuccess(null);
    setError(null);
    setCounter(300);
  };

  const renderHeading = () => otpFormVisible ? '2-Step Authentication' : 'Login';

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="lg:w-1/2 bg-[#14143f] text-white flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="mb-4 lg:mb-8">
          <Logo type="light" />
        </div>
        {/* <div className="hidden lg:block w-full max-w-lg">
          <Carousel />
        </div> */}
      </div>
      <div className="lg:w-1/2 bg-white flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-lg">
          <div className="flex flex-col justify-center min-h-screen">
            <div className="text-center mb-4 lg:mb-6">
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                {renderHeading()}
              </Typography>
            </div>
            {!otpFormVisible ? (
              <LoginForm {...configs} onLoginSuccess={() => setOtpFormVisible(true)} />
            ) : (
              <OTPForm onLoginSuccess={() => setOtpFormVisible(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
