import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
type DropdownProps = {
  avatar?: string;
  logOut?: () => void;
};
const Dropdown = ({ avatar = './src/assets/images/default-avatar.jpg', logOut }: DropdownProps) => {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Avatar variant="circular" alt="tania andrew" className="h-10 w-10 cursor-pointer object-cover" src={avatar} />
      </MenuHandler>
      <MenuList className="w-64">
        {/* require route */}
        <Link to="./" className="outline-none">
          <MenuItem className="group flex items-center gap-2 border-none">
            <PersonOutlineOutlinedIcon className="group-hover:text-white" />
            <Typography variant="small" className="font-bold text-cs_dark group-hover:text-white ">
              Thông tin tài khoản
            </Typography>
          </MenuItem>
        </Link>
        {/* require route */}
        <Link to="./" className="outline-none">
          <MenuItem className="group flex items-center gap-2">
            <ConfirmationNumberOutlinedIcon className="group-hover:text-white" />
            <Typography variant="small" className="font-bold text-cs_dark group-hover:text-white ">
              Vé của tôi
            </Typography>
          </MenuItem>
        </Link>
        {/* require route */}
        <Link to="./" className="outline-none">
          <MenuItem className="group flex items-center gap-2">
            <CreditCardOutlinedIcon className="group-hover:text-white" />
            <Typography variant="small" className="font-bold text-cs_dark group-hover:text-white ">
              Thông tin thanh toán
            </Typography>
          </MenuItem>
        </Link>
        {/* require route */}
        <Link to="./" className="outline-none">
          <MenuItem className="group flex items-center gap-2">
            <AddBoxIcon className="group-hover:text-white" />
            <Typography variant="small" className="font-bold text-cs_dark group-hover:text-white ">
              Tạo sự kiện
            </Typography>
          </MenuItem>
        </Link>
        {/* <hr className="my-2 border-blue-gray-50" /> */}
        {/* Xử lý log out */}
        <MenuItem className="group flex items-center gap-2" onClick={logOut}>
          <ExitToAppOutlinedIcon className="group-hover:text-white" />
          <Typography variant="small" className="font-bold text-cs_dark group-hover:text-white ">
            Đăng xuất
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default Dropdown;
