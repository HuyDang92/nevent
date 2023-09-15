import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
function DefaultLayout() {
  return (
    <div className="relative grid grid-cols-12 gap-2">
      <Header className="col-span-12 bg-yellow-200 mb-20" />
      <SideBar className="col-span-2" />
      <main className="col-span-10 min-h-screen 2xl:container bg-red-50">
        <Outlet />
      </main>
      <Footer className="col-span-12" />
    </div>
  );
}

export default DefaultLayout;
