"use client";

import React, { useState } from 'react';
import {
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Home,
  School,
  Business,
  Menu as MenuIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Home', icon: <Home /> },
  {
    text: 'Academy',
    icon: <School />,
    subItems: [
      { text: 'Group Academy', icon: <Business /> },
      { text: 'Business Academy', icon: <Business /> },
    ],
  },
  // Add more items here
];

const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (text: string) => {
    setOpenItems((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  return (
    <div className={`flex-shrink-0 bg-[#14143f] text-white transition-all duration-300 ${open ? 'w-60' : 'w-16'} min-h-screen`}>
      <div className="flex justify-end p-2">
        <IconButton onClick={handleDrawerToggle} className="text-white">
          <MenuIcon />
        </IconButton>
      </div>
      <hr className="border-white opacity-20" />
      <ul className="flex-grow">
        {menuItems.map((item) => (
          <li key={item.text} className="group">
            <button
              onClick={() => handleItemClick(item.text)}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-[#179ad6] transition-all"
            >
              <span className="text-white">{item.icon}</span>
              {open && <span className="ml-4">{item.text}</span>}
              {item.subItems && (
                <span className="ml-auto">
                  {openItems[item.text] ? <ExpandLess /> : <ExpandMore />}
                </span>
              )}
            </button>
            {item.subItems && (
              <Collapse in={openItems[item.text]} timeout="auto" unmountOnExit>
                <ul className="pl-8">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.text} className="group">
                      <button className="flex items-center w-full px-4 py-2 text-left hover:bg-[#179ad6] transition-all">
                        <span className="text-white">{subItem.icon}</span>
                        {open && <span className="ml-4">{subItem.text}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </Collapse>
            )}
            <hr className="border-white opacity-20" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
