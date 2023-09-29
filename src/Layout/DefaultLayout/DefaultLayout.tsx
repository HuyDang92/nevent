import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import NavbarMobile from '~/components/customs/NavbarMobile';
function DefaultLayout() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  return (
    <>
      <div className="relative flex">
        <aside className={`hidden transition-all md:block ${isOpenSideBar ? 'md:w-[17%]' : 'md:w-[5%]'}`}>
          <SideBar open={isOpenSideBar} setOpen={setIsOpenSideBar} />
        </aside>
        <div className={`mx-auto w-full ${isOpenSideBar ? 'md:w-[83%]' : 'md:w-[95%]'}`}>
          <Header />
          <main className="px-5">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <NavbarMobile className="fixed bottom-0 sm:hidden" />
    </>
  );
}

export default DefaultLayout;
