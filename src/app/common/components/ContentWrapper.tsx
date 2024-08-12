"use client";

import React from 'react';
import { Box } from '@mui/material';

interface ContentWrapperProps {
  children: React.ReactNode;
  activeMenu: string;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, activeMenu }) => {
  return (
    <Box
      sx={{
        padding: '16px',
        flexGrow: 1,
        backgroundColor: '#f4f4f4',
        minHeight: 'calc(100vh - 128px)', // Adjust this based on header and menu heights
      }}
    >
      <h2>{activeMenu}</h2>
      {children}
    </Box>
  );
};

export default ContentWrapper;
