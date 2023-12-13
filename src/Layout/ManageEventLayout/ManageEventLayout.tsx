import { Outlet } from 'react-router-dom';
import ManageEventSideBar from '../components/ManageEventSideBar';
// import NavbarMobile from '~/components/NavbarMobile';
import { Variants, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import Icon from '~/components/customs/Icon';

function ManageEventLayout() {
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  const ref = useRef<any>(null);
  useClickOutside(ref, () => {
    setIsOpenSideBar(false);
  });
  return (
    <>
      <div className="relative">
        <div className={`mx-auto flex`}>
          <ManageEventSideBar  className="hidden xl:block"  />
          <main className={`w-full bg-cs_semi_green px-2 py-2 dark:bg-cs_dark`}>
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
                <ManageEventSideBar />
              </motion.ul>
            </motion.nav>
            <Outlet />
          </main>
        </div>
      </div>
      {/* <NavbarMobile className="fixed bottom-0 sm:hidden" /> */}
    </>
  );
}

export default ManageEventLayout;
