"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, RadioGroup, FormControlLabel, Radio, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import useLoginStore from '../../store/loginStore'; // Import the login store
import { appLogin } from '../services/auth';
import { encryptID } from '../../utils/encryption'; // Import encryption function
import { useRouter } from 'next/navigation';
import { loginRequests } from './data'; // Import the login data store
import { encode as base64_encode } from 'base-64';

const OTPForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [counter, setCounter] = useState(300); // 5 minutes countdown
  const otpValue = watch('otp');

  const router = useRouter();

  const {
    loginParams,
    setOtpFailed,
    userId,
  } = useLoginStore();

  // Countdown timer
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const formattedTime = `${Math.floor(counter / 60)}:${counter % 60 < 10 ? '0' : ''}${counter % 60}`;

  const handleResend = async () => {
    setCounter(300); // Reset the timer
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await loginRequests.getOtp({ user_id: userId });
      if (!response.success) {
        throw new Error(response.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      setErrorMessage('Failed to resend OTP. Please try again.');
      console.error('Resend OTP error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { otp, rememberDuration } = data;

      // Encrypt the app identifier and use the loginParams from the store
      const loginOtpDetails = {
        ...loginParams,
        app: encryptID('pas', process.env.NEXT_PUBLIC_HASHING_SALT || ''),
        otp,
        remember_me: rememberDuration,
      };

      const result = await appLogin(loginOtpDetails, loginParams);

      if (result) {
        // Redirect user to the dashboard
        router.push('/dashboard');
        useLoginStore.getState().setLoggedIn(true);
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error: any) {
      console.log('error :>> ', error);
      // Check if the error response contains specific error messages and display them
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Display the specific error message
      } else {
        setErrorMessage('Invalid OTP. Please try again or resend the OTP.');
      }
      setOtpFailed(true);
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-8 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-300"
    >
      {errorMessage && (
        <Alert severity="error" className="mb-4 bg-red-100 text-red-800 border-red-300">
          {errorMessage}
        </Alert>
      )}
      <Alert severity="info" className="mb-6 bg-blue-50 text-gray-700 border-blue-100 text-lg">
        Please enter the OTP sent to your email. The OTP is valid for <span className="text-gray-900">{formattedTime} minutes</span>. If the OTP expires, you can request a new one.
      </Alert>
      <div className="flex justify-center mb-6">
        <div className="clock">
          <div className="countdown text-gray-800 bg-gray-200 rounded-full p-3">
            <span className="font-mono text-3xl">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
      <Box className="mb-4">
        <TextField
          {...register('otp', { required: 'OTP is required' })}
          label="OTP"
          variant="outlined"
          fullWidth
          error={!!errors.otp}
          helperText={errors.otp ? errors.otp.message : ''}
          className="mb-4"
          InputProps={{
            className: 'text-gray-800',
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              color: 'black',
              '& fieldset': {
                borderColor: 'gray',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
            },
          }}
        />
      </Box>
      <RadioGroup
        {...register('rememberDuration', { required: true })}
        defaultValue="14"
        className="mb-6"
      >
        <FormControlLabel value="14" control={<Radio />} label={<span className="text-gray-800">Remember me for 14 days</span>} />
        <FormControlLabel value="30" control={<Radio />} label={<span className="text-gray-800">Remember me for 30 days</span>} />
      </RadioGroup>
      <Box className="text-center">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleFormSubmit}
          disabled={loading || !otpValue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full w-full max-w-xs"
        >
          {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
        </Button>
      </Box>
      <Box className="text-center mt-6">
        <Button
          variant="text"
          color="inherit"
          onClick={handleResend}
          disabled={counter > 0 || loading}
          className="text-blue-600 underline"
        >
          Resend OTP
        </Button>
        {counter > 0 && (
          <Typography variant="caption" className="text-gray-600">
            You can resend OTP after {formattedTime}.
          </Typography>
        )}
      </Box>
    </Box>

  );
};

export default OTPForm;
