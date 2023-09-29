import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import NavbarMobile from '~/components/customs/NavbarMobile';
import { useCurrentViewportView } from '~/hooks/useViewPort';
function DefaultLayout() {
  const { width } = useCurrentViewportView();
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  useEffect(() => {
    if (width < 960) {
      setIsOpenSideBar(true);
    }
  }, [width]);
  return (
    <>
      <div className="relative flex">
        <aside className={`${isOpenSideBar ? 'w-[5%] min-w-[80px]' : 'w-[17%] min-w-[255px]'} transition-all`}>
          <SideBar open={isOpenSideBar} setOpen={setIsOpenSideBar} />
        </aside>
        <div className={`mx-auto ${isOpenSideBar ? 'w-[95%]' : 'w-[83%]'}`}>
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
