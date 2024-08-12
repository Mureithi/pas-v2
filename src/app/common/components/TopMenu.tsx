"use client";

import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Divider } from '@mui/material';
import { Settings, Logout, AccountCircle } from '@mui/icons-material';
import Link from 'next/link';
import Logo from '../../common/components/logo';

interface TopMenuProps {
  onMenuClick: (menu: string) => void;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

const TopMenu: React.FC<TopMenuProps> = ({ onMenuClick, user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState('Menu 1');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuClick(menu);
  };

  return (
    <div>
      {/* Primary Top Menu */}
      <div className="bg-white text-[#14143f] shadow-md">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            {/* Logo */}
            <Logo type="dark" />
          </div>

          <div>
            <IconButton onClick={handleClick}>
              <Avatar alt={user.name} src={user.avatarUrl || undefined}>
                {user.name.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar src={user.avatarUrl || undefined} /> {user.name}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <AccountCircle fontSize="small" />
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <Logout fontSize="small" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      {/* Secondary Horizontal Menu */}
      <div className="bg-[#179ad6] p-2 flex justify-around">
        {['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4'].map((menu) => (
          <span
            key={menu}
            className={`cursor-pointer text-sm ${
              activeMenu === menu ? 'text-white font-bold' : 'text-[#d5e7f2]'
            }`}
            onClick={() => handleMenuClick(menu)}
          >
            {menu}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopMenu;
