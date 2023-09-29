import IonIcon from '@reacticons/ionicons';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

type NavbarMobileProps = {
  className?: string;
};

type dataNavigationProps = {
  link: string;
  icon: 'home' | 'color-filter' | 'add-circle' | 'call' | 'person';
};

const dataNavigation: dataNavigationProps[] = [
  {
    link: '/',
    icon: 'home',
  },
  {
    link: '/test1',
    icon: 'color-filter',
  },
  {
    link: '/test2',
    icon: 'add-circle',
  },
  {
    link: '/test3',
    icon: 'call',
  },
  {
    link: '/test1',
    icon: 'person',
  },
];

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  return (
    <>
      <div
<<<<<<< HEAD
        className={`bg-white shadow-border-blur flex items-center w-full py-4 px-4 justify-around sm:hidden ${className}`}
=======
        className={`flex w-full items-center justify-around bg-white px-4 py-4 shadow-border-blur sm:hidden ${className}`}
>>>>>>> 4d858432ca561ffbdbc6689f4781e03f8e907b4b
      >
        {dataNavigation.map((item, index) => (
          <motion.button key={index} whileTap={{ scale: 0.9 }}>
            <NavLink
              to={item.link}
              className={(nav) =>
                nav.isActive
                  ? 'flex items-center  justify-center text-cs_purple duration-100'
                  : 'flex items-center justify-center'
              }
            >
              <IonIcon name={`${item.icon}-outline`} className="text-2xl " />
            </NavLink>
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default NavbarMobile;
