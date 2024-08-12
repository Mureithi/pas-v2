"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#179ad6] text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          © {new Date().getFullYear()} Focused.com. All rights reserved.
        </div>
        <div className="text-sm">
          Version 1.0.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;
