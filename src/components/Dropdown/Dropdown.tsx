import { Avatar } from '@material-tailwind/react';
import avtDefault from '~/assets/images/default-avatar.jpg';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import Button from '../customs/Button';
import { logout } from '~/features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/hooks/useActionRedux';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
};
type DropdownProps = {
  auth?: Object;
};
const Dropdown = ({ auth }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} className="menu relative">
      <motion.button whileTap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)}>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="h-10 w-10 cursor-pointer object-cover"
          src={avtDefault}
        />
      </motion.button>
      <motion.ul
        className="absolute right-0 top-[140%] z-20 w-44 bg-white p-2 shadow-border-btn"
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
        <motion.li variants={itemVariants} className="">
          <Button onClick={handleLogOut} value="Đăng xuất" mode="dark" className="w-full" />
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
export default Dropdown;
