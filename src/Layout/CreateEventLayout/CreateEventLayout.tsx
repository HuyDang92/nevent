import { Link, Outlet } from 'react-router-dom';
import CreateEventSidebar from '../components/CreateEventSidebar';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import logo from '~/assets/images/logo.png';
import logoWhite from '~/assets/images/logoWhite.png';
import notUse from '~/assets/images/notUse.png';
import Button from '~/components/customs/Button';
import { Variants, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import Icon from '~/components/customs/Icon';

function CreateEventLayout() {
  // const { width } = useCurrentViewportView();
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  const ref = useRef<any>(null);
  useClickOutside(ref, () => {
    setIsOpenSideBar(false);
  });
  return (
    <>
      <div className="relative w-full">
        <div className={`mx-auto flex`}>
          <CreateEventSidebar className="hidden xl:block" />

          <main className={`relative w-full bg-cs_semi_green px-2 py-2 dark:bg-cs_dark`}>
            <motion.nav className="relative z-20 xl:hidden" initial={false} animate={isOpenSideBar ? 'open' : 'closed'}>
              <motion.button
                type="button"
                ref={ref}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpenSideBar(!isOpenSideBar)}
                className="h-10 w-10"
              >
                <Icon name="menu" className="text-cs_light" />
              </motion.button>

              <motion.ul
                variants={{
                  open: {
                    clipPath: 'inset(0% 0% 0% 0% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {
                    clipPath: 'inset(10% 50% 90% 50% round 10px)',
                    transition: {
                      type: 'spring',
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                className="absolute"
              >
                <CreateEventSidebar />
              </motion.ul>
            </motion.nav>
            <Outlet />
          </main>
        </div>
      </div>
      {/* {width > 1080 ? (
        
      ) : (
        <div className=" p-5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className=" h-[20px] w-[40px] dark:hidden" />
            <img src={logoWhite} alt="logo" className=" hidden h-[20px] w-[40px] dark:block" />
            <span className="text-xl font-extrabold text-cs_semi_green dark:text-cs_light">NEVENT</span>
          </div>
          <div className="py-36 text-center">
            <img src={notUse} alt="" className="mx-auto w-[50%]" />
            <h1 className="text-center font-bold dark:text-cs_light">
              Chức năng này chưa được phát triển trên điện thoại vui lòng sử dụng trên máy tính! Xin cảm ơn
            </h1>
            <Link to="/">
              <Button value="Trở về trang chủ" type="button" className="mx-auto my-5" mode="dark" />
            </Link>
          </div>
        </div>
      )} */}
    </>
  );
}

export default CreateEventLayout;
