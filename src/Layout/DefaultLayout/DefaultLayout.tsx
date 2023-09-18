import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

function DefaultLayout() {
  return (
    <>
      <Header />
      <div className="relative mx-auto my-5 flex max-w-[1728px]">
        <aside className="w-[25%]">
          <SideBar />
        </aside>
        <main className="w-[75%] rounded-[15px] bg-white shadow-border-light 2xl:container">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
