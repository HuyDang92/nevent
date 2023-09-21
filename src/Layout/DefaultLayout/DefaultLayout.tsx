import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import NavbarMobile from '~/components/customs/NavbarMobile';

function DefaultLayout() {
  return (
    <div className="relative">
      <Header />
      <div className="relative mx-auto my-5 flex max-w-[1728px]">
        <aside className="hidden w-[20%] sm:block">
          <SideBar />
        </aside>
        <main className="w-full rounded-[15px] bg-white shadow-border-light 2xl:container sm:w-[80%]">
          <Outlet />
        </main>
      </div>
      <Footer />
      <NavbarMobile className="fixed bottom-0 sm:hidden" />
    </div>
  );
}

export default DefaultLayout;
