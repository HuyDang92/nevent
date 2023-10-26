import IonIcon from '@reacticons/ionicons';

import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../customs/Icon';

type NavbarMobileProps = {
  className?: string;
};

const dataNavigation = [
  {
    link: '/',
    icon: 'home',
    title: 'Trang chủ',
  },
  {
    link: '/event-categories',
    icon: 'grid',
    title: 'Danh mục',
  },
  {
    link: '/test2',
    icon: 'search',
    title: 'Tìm kiếm',
  },
  {
    link: '/user/profile',
    icon: 'person',
    title: 'Tài khoản',
  },
];

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  const location = useLocation();

  return (
    <>
      <div
        className={`z-20 flex w-full items-center justify-around bg-white p-3 py-4 shadow-border-blur dark:border-t dark:bg-cs_lightDark sm:hidden ${className}`}
      >
        {dataNavigation.map((item, index) => (
          <motion.button key={index} whileTap={{ scale: 0.9 }}>
            <NavLink to={item.link} className={(nav) => `flex items-center justify-between`}>
              <Icon
                name={location.pathname === item.link ? item.icon : `${item.icon}-outline`}
                className="text-2xl text-cs_semi_green"
              />
            </NavLink>
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default NavbarMobile;
