import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../customs/Icon';
import { useAppSelector } from '~/hooks/useActionRedux';

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
    link: '/search',
    icon: 'search',
    title: 'Tìm kiếm',
  },
];

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <div
        className={`z-20 flex w-full items-center justify-around bg-white p-3 py-4 shadow-border-blur dark:border-t dark:bg-cs_lightDark sm:hidden ${className}`}
      >
        {dataNavigation.map((item, index) => (
          <motion.button key={index} whileTap={{ scale: 0.9 }}>
            <NavLink to={item.link} className={`flex items-center justify-between`}>
              <Icon
                name={location.pathname === item.link ? item.icon : `${item.icon}-outline`}
                className="text-2xl text-cs_semi_green"
              />
            </NavLink>
          </motion.button>
        ))}

        {auth.loggedIn && auth.currentUser?.role?.name === 'user' ? (
          <motion.button whileTap={{ scale: 0.9 }}>
            <NavLink to={'/user/profile/0'} className={`flex items-center justify-between`}>
              <Icon
                name={location.pathname === '/user/profile/0' ? 'person' : 'person-outline'}
                className="text-2xl text-cs_semi_green"
              />
            </NavLink>
          </motion.button>
        ) : (
          <motion.button whileTap={{ scale: 0.9 }}>
            <NavLink to={'/user/profile/0'} className={`flex items-center justify-between`}>
              <Icon
                name={location.pathname === '/user/profile/0' ? 'person' : 'person-outline'}
                className="text-2xl text-cs_semi_green"
              />
            </NavLink>
          </motion.button>
        )}
        {!auth.loggedIn && (
          <motion.button whileTap={{ scale: 0.9 }}>
            <NavLink to={'/login'} className={`flex items-center justify-between`}>
              <Icon name={`person-outline`} className="text-2xl text-cs_semi_green" />
            </NavLink>
          </motion.button>
        )}
      </div>
    </>
  );
};

export default NavbarMobile;
