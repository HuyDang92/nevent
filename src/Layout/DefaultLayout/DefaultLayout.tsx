import React, { ReactNode } from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
function DefaultLayout() {
  return (
    <div className="relative">
      <Header />
      <SideBar />
      {/* <main className="mx-auto min-h-screen 2xl:container">
        <Outlet />
      </main> */}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
