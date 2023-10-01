import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import NavbarMobile from '~/components/customs/NavbarMobile';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import { motion } from 'framer-motion';

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
<<<<<<< HEAD
      <div className="relative flex">
        <aside className={`hidden transition-all md:block ${isOpenSideBar ? 'md:w-[17%]' : 'md:w-[5%]'}`}>
          <SideBar open={isOpenSideBar} setOpen={setIsOpenSideBar} />
        </aside>
        <div className={`mx-auto w-full ${isOpenSideBar ? 'md:w-[83%]' : 'md:w-[95%]'}`}>
=======
      <div className="relative sm:flex">
        <motion.aside
          className={`${
            isOpenSideBar ? 'w-[5%] min-w-[80px]' : 'w-[17%] min-w-[255px]'
          } hidden transition-all sm:block `}
        >
          <SideBar open={isOpenSideBar} setOpen={setIsOpenSideBar} />
        </motion.aside>
        <div className={`mx-auto ${isOpenSideBar ? 'w-[95%]' : 'w-[83%]'}`}>
>>>>>>> 4c7658a70ab13303ec5781baacb66990ff45c338
          <Header />
          <main className="sm:px-5">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
<<<<<<< HEAD
      <NavbarMobile className="fixed bottom-0 sm:hidden" />
=======
      <Footer />
      <NavbarMobile className="fixed bottom-0 z-50 sm:hidden" />
>>>>>>> 4c7658a70ab13303ec5781baacb66990ff45c338
    </>
  );
}

export default DefaultLayout;
