import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
import { Dispatch, SetStateAction } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '~/assets/images/logoDarkDesktop.png';
import logoMobile from '~/assets/images/logo.svg';
import { LogoWhite, LogoWhiteDesktop, LogoDarkDesktop } from '~/assets/icon';
import Icon from '~/components/customs/Icon';
type SideBarProp = {
  className?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const SideBar = ({ className, open, setOpen }: SideBarProp) => {
  const auth = false;
  return (
    <Card
      className={`scrollbar-hide sticky top-0 h-[100vh] rounded-none shadow-border-light dark:bg-cs_lightDark ${className}`}
    >
      <Link to="/" className="px-4 pt-2">
        <Typography className="cursor-pointer">
          {open ? (
            <>
              <img src={logoMobile} alt="logo" className="hidden dark:hidden sm:block" />
              <span className="hidden py-2 dark:block">
                <LogoWhite />
              </span>
            </>
          ) : (
            <>
              <img src={logo} alt="logo" className="hidden dark:hidden sm:block" />
              <span className="hidden dark:block">
                <LogoWhiteDesktop />
              </span>
            </>
          )}
          {/* <img src={logoMobile} alt="logo" className="sm:hidden" /> */}
        </Typography>
      </Link>
      <List className={`${!open ? 'p-4' : 'p-2'}  text-cs_dark`}>
        <h2 className="py-2 font-medium text-cs_gray dark:text-white">MENU</h2>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `rounded-xl  ${!open ? 'w-full' : 'w-fit'} ${
              isActive
                ? ' bg-cs_dark text-cs_light shadow-border-light dark:bg-cs_light dark:text-cs_dark'
                : 'dark:bg-cs_dark dark:text-cs_light'
            }`
          }
        >
          <ListItem className={`${!open ? 'px-8' : 'px-5'}`}>
            <ListItemPrefix className="mr-0">
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            {!open && <Typography className={`ml-4 font-semibold`}>Trang chủ</Typography>}
          </ListItem>
        </NavLink>
        <NavLink
          to={'/category'}
          className={({ isActive }) =>
            `rounded-xl ${!open ? 'w-full' : 'w-fit'} ${
              isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : 'dark:text-cs_light'
            }`
          }
        >
          <ListItem className={`${!open ? 'px-8' : 'px-5'}`}>
            <ListItemPrefix className="mr-0">
              <IonIcon name="grid" className={`text-xl`} />
            </ListItemPrefix>
            {!open && <Typography className={`ml-4 font-semibold`}>Danh mục</Typography>}
          </ListItem>
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) =>
            `rounded-xl ${!open ? 'w-full' : 'w-fit'} ${
              isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : 'dark:text-cs_light'
            }`
          }
        >
          <ListItem className={`${!open ? 'px-8' : 'px-5'}`}>
            <ListItemPrefix className="mr-0">
              <IonIcon name="alert-circle-outline" className={`text-xl`} />
            </ListItemPrefix>
            {!open && <Typography className={`ml-4 font-semibold`}>Giới thiệu</Typography>}
          </ListItem>
        </NavLink>
        <NavLink
          to={'/support'}
          className={({ isActive }) =>
            `rounded-xl ${!open ? 'w-full' : 'w-fit'} ${
              isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : 'dark:text-cs_light'
            }`
          }
        >
          <ListItem className={`${!open ? 'px-8' : 'px-5'}`}>
            <ListItemPrefix className="mr-0">
              <IonIcon name="call" className={`text-xl`} />
            </ListItemPrefix>
            {!open && <Typography className={`ml-4 font-semibold`}>Hỗ trợ</Typography>}
          </ListItem>
        </NavLink>
      </List>
      <List className={`${!open ? 'p-4' : 'p-2'}  text-cs_dark`}>
        <h2 className="py-2 font-medium text-cs_gray dark:text-white">SETTING</h2>
        <NavLink
          to={'/sdfdg '}
          className={({ isActive }) =>
            `rounded-xl ${!open ? 'w-full' : 'w-fit'} ${
              isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : 'dark:text-cs_light'
            }`
          }
        >
          <ListItem className={`${!open ? 'px-8' : 'px-5'}`}>
            <ListItemPrefix className="mr-0">
              <IonIcon name="settings" className={`text-xl`} />
            </ListItemPrefix>
            {!open && <Typography className={`ml-4 font-semibold`}>Cài đặt</Typography>}
          </ListItem>
        </NavLink>
        {auth && (
          <NavLink
            to={'/category'}
            className={({ isActive }) =>
              `rounded-xl ${!open ? 'w-full' : 'w-fit'} ${
                isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : 'dark:text-cs_light'
              }`
            }
          >
            <ListItem className={`${!open ? 'px-8' : 'px-5'}`}>
              <ListItemPrefix className="mr-0">
                <IonIcon name="log-out" className={`text-xl`} />
              </ListItemPrefix>
              {!open && <Typography className={`ml-4 font-semibold`}>Đăng xuất</Typography>}
            </ListItem>
          </NavLink>
        )}
      </List>
      <button onClick={() => setOpen((prev) => !prev)}>
        {!open ? (
          <Icon
            name="arrow-back-circle-outline"
            className="absolute right-0 top-[80px] translate-x-1/2 overflow-hidden rounded-full border bg-[#292D32] text-[30px] text-cs_light shadow-border-full"
          />
        ) : (
          <Icon
            name="arrow-forward-circle-outline"
            className="absolute right-0 top-[80px] translate-x-1/2 overflow-hidden rounded-full border bg-[#292D32] text-[30px] text-cs_light shadow-border-full"
          />
        )}
      </button>
    </Card>
  );
};

export default SideBar;
{
  /* <Accordion
          open={open === 1}
          icon={
            <IonIcon
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
                  className={`text-xl ${open === 1 ? 'text-cs_dark' : 'text-cs_dark'}`}
                />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${open === 1 ? 'text-cs_dark' : 'text-cs_dark'}`}>
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
                      <IonIcon name="ellipse" className="text-2xs" />
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
            <IonIcon
              name="chevron-down-outline"
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className={`p-0  ${open === 2 ? 'bg-cs_light shadow-md' : ''}`} selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 px-7">
              <ListItemPrefix>
                <IonIcon
                  name="location-sharp"
                  className={`text-xl ${open === 2 ? 'text-cs_dark' : 'text-cs_dark'}`}
                />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${open === 2 ? 'text-cs_dark' : 'text-cs_dark'}`}>
                Địa điểm
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="py-2">
              <Link to={'/'}>
                <ListItem className="px-10">
                  <ListItemPrefix>
                    <IonIcon name="ellipse" className="text-2xs" />
                  </ListItemPrefix>
                  Thành phố Hồ Chí Minh
                </ListItem>
              </Link>
              <Link to={'/'}>
                <ListItem className="px-10">
                  <ListItemPrefix>
                    <IonIcon name="ellipse" className="text-2xs" />
                  </ListItemPrefix>
                  Thành phố Hà Nội
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion> */
}
