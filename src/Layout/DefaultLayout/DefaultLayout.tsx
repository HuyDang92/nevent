import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import NavbarMobile from '~/components/customs/NavbarMobile';

function DefaultLayout() {
  return (
<<<<<<< HEAD
    <div className="relative">
      <Header />
      <div className="relative mx-auto my-5 flex max-w-[1728px]">
        <aside className="hidden w-[20%] sm:block">
          <SideBar />
        </aside>
        <main className="w-full rounded-[15px] bg-white shadow-border-light 2xl:container sm:w-[80%]">
          <Outlet />
        </main>
=======
    <>
      <div className="relative flex">
        <aside className="w-[17%]">
          <SideBar />
        </aside>
        <div className="mx-auto w-[83%]">
          <Header />
          <main className="px-5">
            <Outlet />
          </main>
        </div>
>>>>>>> 8aabc77952ad82f429f312ffab6497dbfd1a5fc2
      </div>
      <Footer />
      <NavbarMobile className="fixed bottom-0 sm:hidden" />
    </>
  );
}

export default DefaultLayout;
