"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopMenu from '../common/components/TopMenu';
import SideMenu from '../common/components/SideMenu';
import Footer from '../common/components/Footer';
import ContentWrapper from '../common/components/ContentWrapper';
import useLoginStore from '../../store/loginStore';

const Dashboard = () => {
  const router = useRouter();
  const { loggedIn } = useLoginStore();

  useEffect(() => {
    // Redirect to login page if the user is not logged in
    if (!loggedIn) {
      router.push('/login');
    }
  }, [loggedIn, router]);

  const [activeMenu, setActiveMenu] = useState('Menu 1');

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  //Sample Data - Switch with user object from login
  const user = {
    name: 'John Doe',
    avatarUrl: '', // Add the URL of the user's avatar if available
  };

  // Optionally render a loading indicator while checking login status
  if (!loggedIn) {
    return null; // or a loading indicator
  }

  return (
    <div className="flex flex-col h-screen">
      <TopMenu onMenuClick={handleMenuClick} user={user} />
      <div className="flex flex-grow mt-0">
        <SideMenu />
        <ContentWrapper activeMenu={activeMenu}>
          <p>Content for {activeMenu}</p>
        </ContentWrapper>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
