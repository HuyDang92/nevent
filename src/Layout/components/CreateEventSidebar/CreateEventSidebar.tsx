import { Card, List, Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoWhite from '~/assets/images/logoWhite.png';
import Button from '~/components/customs/Button';
import { useAppSelector } from '~/hooks/useActionRedux';
type CreateEventSidebarProps = {
  className?: string;
};

const CreateEventSidebar = ({ className }: CreateEventSidebarProps) => {
  const currentAuth = useAppSelector((state) => state.auth.currentUser);
  const cateList =
    currentAuth?.role?.name === 'user'
      ? [
          {
            name: 'Hồ sơ tổ chức',
            link: '/organization/organization-profile',
          },
        ]
      : [
          {
            name: 'Hồ sơ tổ chức',
            link: '/organization/organization-profile',
          },
          {
            name: 'Quản lý sự kiện',
            link: '/organization/event-list',
          },
          // {
          //   name: 'Tài khoản ví của tôi',
          //   link: '/organizer-my-pallet',
          // },
          {
            name: 'Thông tin ngân hàng',
            link: '/organizer-information-banking',
          },
        ];
  return (
    <Card
      className={`scrollbar-hide sticky top-0 flex h-[100vh] flex-col rounded-none bg-cs_semi_green pt-1 shadow-none dark:bg-cs_dark ${className}`}
    >
      <Link to="/" className="flex h-[10%] items-center p-5">
        <div className="flex items-center gap-2">
          <img src={logoWhite} alt="logo" className="h-[20px] w-[40px]" />
          <span className="text-xl font-extrabold text-cs_light">NEVENT</span>
        </div>
      </Link>
      <div className="flex h-[90%] flex-col items-center justify-between py-5">
        <List className={`px-4 pe-4 text-cs_semi_green`}>
          {cateList.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `} mt-2 rounded-xl transition-all hover:bg-white hover:text-cs_semi_green dark:hover:bg-cs_lightDark
               ${isActive ? ' bg-white text-cs_semi_green dark:bg-cs_lightDark' : 'text-cs_light'}`
              }
            >
              <div className={`flex items-center py-3 hover:bg-transparent`}>
                <Typography className={`ml-4 font-bold`}>{item.name}</Typography>
              </div>
            </NavLink>
          ))}
        </List>
        <Button
          value="Các câu hỏi thường gặp ?"
          rounded_full={false}
          className="!bg-cs_leaf-100 text-xs !text-white dark:!bg-cs_lightDark"
        />
      </div>
    </Card>
  );
};

export default CreateEventSidebar;
