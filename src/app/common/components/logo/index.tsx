import React, { memo } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import light from './light-logo-big.png';
import dark from './dark-logo-big.png';
import das from './das-logo-big.png';

interface LogoProps {
  type?: 'light' | 'dark';
  register?: boolean;
  das?: boolean;
}

const Logo: React.FC<LogoProps> = ({ type = 'light', register = false, das = false }) => {
  const url = type === 'light' ? light : das ? das : dark;
  const style = type === 'light' ? `logo ${register ? 'register-logo' : ''}` : register ? `logo ${register ? 'register-logo' : ''}` : 'small-logo';

  return (
    <Box className={`flex items-center justify-center p-4 ${style}`}>
      <Image
        src={url}
        alt="Logo"
        width={300} // Adjust the width as needed
        height={100} // Adjust the height as needed
        className="object-contain"
      />
    </Box>
  );
};

Logo.propTypes = {
  type: PropTypes.string,
  register: PropTypes.bool,
  das: PropTypes.bool,
};

export default memo(Logo);
