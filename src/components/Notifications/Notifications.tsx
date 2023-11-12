import { Avatar, IconButton } from '@material-tailwind/react';
import { motion, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import Icon from '../customs/Icon';
import Notifycation from '~/pages/Auth/Profile/components/Notifycation';
import { Link } from 'react-router-dom';
import { useAppSelector } from '~/hooks/useActionRedux';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
};
type DropdownProps = {
  auth?: any;
};
const Notifycations = ({ auth }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const checkNoti = useAppSelector((state) => state.auth.notification);
  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} className="menu relative">
      <motion.div whileTap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)}>
        <IconButton
          variant="text"
          className="relative items-center rounded-lg text-cs_semi_green transition hover:scale-110 hover:bg-transparent"
        >
          {checkNoti && (
            <div className="absolute -right-1 -top-1 z-50 h-2 w-2 rounded-full bg-red-500 text-cs_light "></div>
          )}
          <Icon name="notifications" className="text-2xl" />
        </IconButton>
      </motion.div>
      <motion.ul
        className="absolute right-0 top-[140%] z-20 w-[350px] space-y-2  rounded-2xl border-2 bg-cs_light p-2 shadow-border-btn dark:border dark:bg-cs_lightDark"
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
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <motion.li variants={itemVariants} className="h-[18rem] space-y-2 overflow-hidden py-2 pb-0 text-center">
          <Notifycation />
        </motion.li>
        <motion.li variants={itemVariants} className="space-y-2 pb-0 text-center">
          <Link to="/user/profile/3" onClick={() => setIsOpen(false)} className="cursor-pointer text-sm">
            Xem tất cả
          </Link>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
export default Notifycations;
