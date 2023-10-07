import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '~/components/customs/Icon';
import { logout } from '~/features/Auth/authSlice';
import { RootState } from '~/store/store';
type SideBarProp = {
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const cateList = [
  {
    name: 'Trang  chủ',
    link: '/',
    icon: 'home',
  },
  {
    name: 'Danh mục',
    link: '/event-categories/1',
    icon: 'grid',
  },
  {
    name: 'Hỗ trợ',
    link: '/support',
    icon: 'call',
  },
  {
    name: 'Cài đặt',
    link: '/setting',
    icon: 'settings',
  },
];
const cateListNoLayout = [
  {
    name: 'Giới thiệu',
    link: '/about',
    icon: 'alert-circle-outline',
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: 'help-circle-outline',
  },
  {
    name: 'Doanh nghiệp',
    link: '/business',
    icon: 'people-circle-outline',
  },
];

const SideBar = ({ className, open, setOpen }: SideBarProp) => {
  const auth = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <Card
      className={`scrollbar-hide sticky top-[66px] flex h-[calc(100vh-66px)] flex-col justify-between rounded-none bg-transparent pt-2 shadow-none ${className}`}
    >
      <List className={`${!open ? 'p-4 pt-2' : 'p-2'}  text-cs_semi_green`}>
        <button onClick={() => setOpen((prev) => !prev)} className="hidden xl:block">
          {!open ? (
            <Icon
              name="arrow-back-circle-outline"
              className="absolute right-0 top-[40px] translate-x-1/2 overflow-hidden rounded-full border bg-[#292D32] text-[25px] text-cs_light shadow-border-full"
            />
          ) : (
            <Icon
              name="arrow-forward-circle-outline"
              className="absolute right-0 top-[40px] translate-x-1/2 overflow-hidden rounded-full border bg-[#292D32] text-[25px] text-cs_light shadow-border-full"
            />
          )}
        </button>
        {cateList.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `rounded-xl  ${!open ? 'w-full' : 'w-fit'} ${
                isActive
                  ? ' bg-cs_light text-cs_semi_green shadow-border-light dark:bg-cs_lightDark  '
                  : 'text-cs_dark dark:bg-cs_dark dark:text-cs_light'
              }`
            }
          >
            <div className={`flex items-center py-3 hover:bg-transparent ${!open ? 'px-8' : 'px-5'}`}>
              <ListItemPrefix className="mr-0">
                <Icon name={item.icon as any} className={`text-xl`} />
              </ListItemPrefix>
              {!open && <Typography className={`ml-4 font-semibold`}>{item.name}</Typography>}
            </div>
          </NavLink>
        ))}
        {auth && (
          <div
            onClick={handleLogOut}
            className={`rounded-xl ${!open ? 'w-full' : 'w-fit'} cursor-pointer text-cs_dark`}
          >
            <div className={`flex items-center py-3 hover:bg-transparent ${!open ? 'px-8' : 'px-5'}`}>
              <ListItemPrefix className="mr-0">
                <Icon name="log-out" className={`text-xl`} />
              </ListItemPrefix>
              {!open && <Typography className={`ml-4 font-semibold`}>Đăng xuất</Typography>}
            </div>
          </div>
        )}
      </List>
      <List className={`${!open ? 'p-4' : 'p-2'}  text-cs_gray`}>
        {cateListNoLayout.map((item, index) => (
          <NavLink key={index} to={item.link}>
            <div className={`flex items-center rounded-xl py-3 hover:bg-cs_lightDark ${!open ? 'px-8' : 'px-5'}`}>
              <ListItemPrefix className="mr-0">
                <Icon name={item.icon as any} className={`text-xl`} />
              </ListItemPrefix>
              {!open && <Typography className={`ml-4 font-semibold`}>{item.name}</Typography>}
            </div>
          </NavLink>
        ))}
      </List>
    </Card>
  );
};

export default SideBar;
{
  /* <Accordion
          open={open === 1}
          icon={
            <Icon
              name="chevron-down-outline"
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className={`p-0 ${open === 1 ? 'bg-cs_light shadow-md' : ''}`} selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 px-7">
              <ListItemPrefix>
                <CategoryIcon
                  fontSize="small"
                  className={`text-xl ${open === 1 ? 'text-cs_semi_green' : 'text-cs_semi_green'}`}
                />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${open === 1 ? 'text-cs_semi_green' : 'text-cs_semi_green'}`}>
                Danh mục
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="py-2">
              {cateList.map((cate: CateProp) => (
                <Link to={`/`} key={cate.id}>
                  <ListItem className="px-10">
                    <ListItemPrefix>
                      <Icon name="ellipse" className="text-2xs" />
                    </ListItemPrefix>
                    {cate.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <Icon
              name="chevron-down-outline"
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className={`p-0  ${open === 2 ? 'bg-cs_light shadow-md' : ''}`} selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 px-7">
              <ListItemPrefix>
                <Icon
                  name="location-sharp"
                  className={`text-xl ${open === 2 ? 'text-cs_semi_green' : 'text-cs_semi_green'}`}
                />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${open === 2 ? 'text-cs_semi_green' : 'text-cs_semi_green'}`}>
                Địa điểm
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="py-2">
              <Link to={'/'}>
                <ListItem className="px-10">
                  <ListItemPrefix>
                    <Icon name="ellipse" className="text-2xs" />
                  </ListItemPrefix>
                  Thành phố Hồ Chí Minh
                </ListItem>
              </Link>
              <Link to={'/'}>
                <ListItem className="px-10">
                  <ListItemPrefix>
                    <Icon name="ellipse" className="text-2xs" />
                  </ListItemPrefix>
                  Thành phố Hà Nội
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion> */
}
