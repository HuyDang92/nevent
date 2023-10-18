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
  },
  {
    link: '/event-categories',
    icon: 'grid',
  },
  {
    link: '/test2',
    icon: 'search',
  },
  {
    link: '/user/profile',
    icon: 'person',
  },
];

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  const location = useLocation();

  return (
    <>
      <div className={`flex w-full items-center z-20 justify-around bg-white dark:bg-cs_lightDark dark:border-t p-3 shadow-border-blur sm:hidden ${className}`}>
        {dataNavigation.map((item, index) => (
          <motion.button key={index} whileTap={{ scale: 0.9 }}>
            <NavLink to={item.link} className={(nav) => `flex items-center justify-between`}>
              <Icon
                name={location.pathname === item.link ? item.icon : `${item.icon}-outline`}
                className="text-2xl text-cs_semi_green"
              />{' '}
            </NavLink>
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default NavbarMobile;
