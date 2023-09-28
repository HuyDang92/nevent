import { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import CategoryIcon from '@mui/icons-material/Category';
import IonIcon from '@reacticons/ionicons';
import { Link, NavLink } from 'react-router-dom';
import logo from '~/assets/images/logoDarkDesktop.png';

type SideBarProp = {
  className?: string;
};
const SideBar = ({ className }: SideBarProp) => {
  return (
    <Card className={`scrollbar-hide sticky  top-0 h-[100vh] rounded-none shadow-border-light ${className}`}>
      <Link to="/" className="px-4 pt-2">
        <Typography className="cursor-pointer">
          <img src={logo} alt="logo" className="hidden sm:block" />
          <img src={logo} alt="logo" className="sm:hidden" />
        </Typography>
      </Link>
      <List className=" p-4 text-cs_dark">
        <h2 className="py-2 font-medium text-cs_gray">MENU</h2>
        <NavLink
          to={'/'}
          className={({ isActive }) => `rounded-xl ${isActive ? ' bg-cs_dark  text-cs_light shadow-border-light' : ''}`}
        >
          <ListItem className="px-8">
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            <Typography className={`font-semibold`}>Trang chủ</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to={'/category'}
          className={({ isActive }) => `rounded-xl ${isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : ''}`}
        >
          <ListItem className="px-8">
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            <Typography className={`font-semibold`}>Trang chủ</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) => `rounded-xl ${isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : ''}`}
        >
          <ListItem className="px-8">
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            <Typography className={`font-semibold`}>Trang chủ</Typography>
          </ListItem>
        </NavLink>
      </List>
      <List className=" p-4 text-cs_dark">
        <h2 className="py-2 font-medium text-cs_gray">SETTING</h2>
        <NavLink
          to={'/sdfdg '}
          className={({ isActive }) =>
            `rounded-xl ${isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : 'text-cs_dark'}`
          }
        >
          <ListItem className="px-8">
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            <Typography className={`font-semibold`}>Trang chủ</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to={'/category'}
          className={({ isActive }) => `rounded-xl ${isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : ''}`}
        >
          <ListItem className="px-8">
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            <Typography className={`font-semibold`}>Trang chủ</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) => `rounded-xl ${isActive ? ' bg-cs_dark text-cs_light shadow-border-light' : ''}`}
        >
          <ListItem className="px-8">
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl`} />
            </ListItemPrefix>
            <Typography className={`font-semibold`}>Trang chủ</Typography>
          </ListItem>
        </NavLink>
      </List>
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
