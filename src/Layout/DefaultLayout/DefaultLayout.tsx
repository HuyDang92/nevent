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
        <aside className={`${isOpenSideBar ? 'w-[17%]' : 'w-[5%]'} transition-all`}>
          <SideBar open={isOpenSideBar} setOpen={setIsOpenSideBar} />
        </aside>
        <div className={`mx-auto ${isOpenSideBar ? 'w-[83%]' : 'w-[95%]'}`}>
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
