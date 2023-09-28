import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import NavbarMobile from '~/components/customs/NavbarMobile';

function DefaultLayout() {
  return (
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
      </div>
      <Footer />
      <NavbarMobile className="fixed bottom-0 sm:hidden" />
    </>
  );
}

export default DefaultLayout;
