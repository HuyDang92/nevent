import { Card, List, Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo.png';
import logoWhite from '~/assets/images/logoWhite.png';
type CreateEventSidebarProps = {
  className?: string;
};

const cateList = [
  {
    name: 'Hồ sơ tổ chức',
    link: 'create-event',
  },
  {
    name: 'Tạo sự kiện',
    link: '/',
  },
  {
    name: 'Tài khoản ví của tôi',
    link: '/',
  },
  {
    name: 'Thông tin ngân hàng',
    link: '/',
  },
];

const CreateEventSidebar = ({ className }: CreateEventSidebarProps) => {
  return (
    <Card
      className={`scrollbar-hide sticky flex h-[100vh] flex-col rounded-none bg-cs_leaf-400 pt-1 shadow-none ${className}`}
    >
      <Link to="/" className="flex items-center p-6">
        <div className="flex items-center gap-2">
          <img src={logoWhite} alt="logo" className="h-[20px] w-[40px]" />
          <span className="text-xl font-extrabold text-cs_light">NEVENT</span>
        </div>
      </Link>
      <List className={`px-4 pe-7 text-cs_semi_green`}>
        {cateList.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `} dark:hover:bg-cs-leaf-500 mt-4 rounded-xl transition-all hover:bg-cs_leaf-500 
             ${isActive ? ' bg-cs_leaf-500 text-cs_light' : 'text-cs_light'}`
            }
          >
            <div className={`flex items-center py-3 hover:bg-transparent`}>
              <Typography className={`ml-4 font-bold`}>{item.name}</Typography>
            </div>
          </NavLink>
        ))}
      </List>
    </Card>
  );
};

export default CreateEventSidebar;
