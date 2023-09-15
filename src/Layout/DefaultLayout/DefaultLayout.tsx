import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

function DefaultLayout() {
  return (
    <>
      <Header className="" />
      <div className="relative my-5 flex">
        <SideBar className="w-[25%]" />
        <main className="w-[75%] rounded-[15px] bg-white shadow-border-light 2xl:container">
          <Outlet />
        </main>
      </div>
      <Footer className="" />
    </>
  );
}

export default DefaultLayout;
