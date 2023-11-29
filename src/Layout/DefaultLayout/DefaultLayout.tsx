import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
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
      <div className="relative">
        <Header />
        <div className={`mx-auto  flex`}>
          <aside className={`${isOpenSideBar ? 'w-[5%] min-w-[80px]' : 'w-[15%]'} hidden transition-all sm:block `}>
            <SideBar open={isOpenSideBar} setOpen={setIsOpenSideBar} />
          </aside>
          <main
            className={`mx-1 my-5  rounded-2xl bg-cs_light px-2 py-2 shadow-border-light dark:bg-cs_lightDark sm:mx-0 sm:px-4 sm:py-4 ${
              isOpenSideBar ? 'w-full sm:w-[95%]' : 'w-[85%]'
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
