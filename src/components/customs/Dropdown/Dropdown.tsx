import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';
import avtDefault from '~/assets/images/default-avatar.jpg';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
};
type DropdownProps = {
  avatar?: string;
  logOut?: () => void;
};
const Dropdown = ({ avatar, logOut }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
        className="absolute right-0 top-[120%] z-20 w-20 bg-white p-3"
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
        <motion.li variants={itemVariants}>Item 1 </motion.li>
        <motion.li variants={itemVariants}>Item 2 </motion.li>
        <motion.li variants={itemVariants}>Item 3 </motion.li>
      </motion.ul>
    </motion.nav>
    // <Menu placement="bottom-end">
    //   <MenuHandler>
    //     <Avatar
    //       variant="circular"
    //       alt="tania andrew"
    //       className="h-10 w-10 cursor-pointer object-cover"
    //       src={avtDefault}
    //     />
    //   </MenuHandler>
    //   <MenuList className="w-64">
    //     {/* require route */}
    //     <Link to="./" className="outline-none">
    //       <MenuItem className="group flex items-center gap-2 border-none">
    //         <PersonOutlineOutlinedIcon className="group-hover:text-white" />
    //         <Typography variant="small" className="font-bold text-cs_semi_green group-hover:text-white ">
    //           Thông tin tài khoản
    //         </Typography>
    //       </MenuItem>
    //     </Link>
    //     {/* require route */}
    //     <Link to="./" className="outline-none">
    //       <MenuItem className="group flex items-center gap-2">
    //         <ConfirmationNumberOutlinedIcon className="group-hover:text-white" />
    //         <Typography variant="small" className="font-bold text-cs_semi_green group-hover:text-white ">
    //           Vé của tôi
    //         </Typography>
    //       </MenuItem>
    //     </Link>
    //     {/* require route */}
    //     <Link to="./" className="outline-none">
    //       <MenuItem className="group flex items-center gap-2">
    //         <CreditCardOutlinedIcon className="group-hover:text-white" />
    //         <Typography variant="small" className="font-bold text-cs_semi_green group-hover:text-white ">
    //           Thông tin thanh toán
    //         </Typography>
    //       </MenuItem>
    //     </Link>
    //     {/* require route */}
    //     <Link to="./" className="outline-none">
    //       <MenuItem className="group flex items-center gap-2">
    //         <AddBoxIcon className="group-hover:text-white" />
    //         <Typography variant="small" className="font-bold text-cs_semi_green group-hover:text-white ">
    //           Tạo sự kiện
    //         </Typography>
    //       </MenuItem>
    //     </Link>
    //     {/* <hr className="my-2 border-blue-gray-50" /> */}
    //     {/* Xử lý log out */}
    //     <MenuItem className="group flex items-center gap-2" onClick={logOut}>
    //       <ExitToAppOutlinedIcon className="group-hover:text-white" />
    //       <Typography variant="small" className="font-bold text-cs_semi_green group-hover:text-white ">
    //         Đăng xuất
    //       </Typography>
    //     </MenuItem>
    //   </MenuList>
    // </Menu>
  );
};
export default Dropdown;
