"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress, Box, Typography, Alert } from '@mui/material';
import { loginRequests } from './data'; // Import the Axios store
import { encryptID } from '../../utils/encryption'; // Import encryption function
import { encode as base64_encode } from 'base-64';
import useLoginStore from '../../store/loginStore';

interface LoginFormProps {
  browser: string;
  lookup: any;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ browser, lookup, onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false); // State to handle the shake animation

  const {
    setLoginParams,
    setUserId,
  } = useLoginStore();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage(null);
    setShake(false); // Reset shake before attempting login

    try {
      const params = { ...data, browser, lookup };
      setLoginParams(params);

      // Encrypt the app identifier
      const loginOtpDetails = { ...params, app: encryptID("pas", process.env.NEXT_PUBLIC_HASHING_SALT || '') };

      // Call loginOtp to get the userId
      const loginOtpResponse = await loginRequests.loginOtp(loginOtpDetails);
      if (!loginOtpResponse || !loginOtpResponse.data.user_id) {
        throw new Error(loginOtpResponse.message || 'Failed to login');
      }

      const userId = loginOtpResponse.data.user_id;
      setUserId(userId);

      const otpParams = { user_id: base64_encode(userId) };

      // Call the OTP function with the encoded userId
      const otpResponse = await loginRequests.getOtp(otpParams);

      if (otpResponse.data && otpResponse.data.user_id) {
        onLoginSuccess();
      } else {
        throw new Error('Failed to generate OTP');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      // Differentiating the error message based on response
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data?.error || 'Invalid Credentials. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }

      setShake(true); // Trigger shake animation on error
      setLoading(false);
    }
  };

  const getErrorMessage = (error: any) => {
    if (error && typeof error.message === 'string') {
      return error.message;
    }
    return '';
  };

  // Reset the shake effect after the animation completes
  useEffect(() => {
    if (shake) {
      const timeout = setTimeout(() => setShake(false), 600); // Duration of the shake animation
      return () => clearTimeout(timeout);
    }
  }, [shake]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={`p-8 bg-white shadow-md rounded border border-gray-200 ${shake ? 'shake' : ''}`}
    >
      <Typography variant="h5" component="h2" className="mb-4">
        Login
      </Typography>
      {errorMessage && (
        <Alert severity="error" className="mb-4">
          {errorMessage}
        </Alert>
      )}
      <Box className="mb-4">
        <TextField
          {...register('email', { required: 'Email is required' })}
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={getErrorMessage(errors.email)}
          className="mb-4"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </Box>
      <Box className="mb-4">
        <TextField
          {...register('password', { required: 'Password is required' })}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={getErrorMessage(errors.password)}
          className="mb-4"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </Box>
      <Box className="text-center">
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
