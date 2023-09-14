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
import { Link } from 'react-router-dom';
type CateProp = {
  id: string;
  name: string;
};
type SideBarProp = {
  className?: string;
};
const SideBar = ({ className }: SideBarProp) => {
  const [open, setOpen] = useState(0);
  const cateList = [
    { id: '1', name: 'Âm nhạc' },
    { id: '2', name: 'Thể thao' },
    { id: '3', name: 'Nghệ thuật và biểu diễn' },
    { id: '4', name: 'Hội họp và hội thảo' },
    { id: '5', name: 'Giải trí và vui chơi' },
  ];
  const handleOpen = (value: number) => {
    setOpen(value);
  };

  return (
    <Card className={`h-[calc(100vh-2rem)] justify-between bg-transparent p-4 w-[20vw] ${className}`}>
      <List className="min-w-full">
        <Link to={'/'}>
          <ListItem
            onClick={() => handleOpen(0)}
            className={`focus:bg-cs_light ${open === 0 ? 'bg-cs_light shadow-md' : ''}`}
          >
            <ListItemPrefix>
              <IonIcon name="home" className={`text-xl ${open === 0 ? 'text-cs_purple' : 'text-cs_dark'}`} />
            </ListItemPrefix>
            <Typography className={`mr-auto font-normal ${open === 0 ? 'text-cs_purple' : 'text-cs_dark'}`}>
              Trang chủ
            </Typography>
          </ListItem>
        </Link>
        <Accordion
          open={open === 1}
          icon={
            <IonIcon
              name="chevron-down-outline"
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className={`p-0 ${open === 1 ? 'bg-cs_light shadow-md' : ''}`} selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <CategoryIcon
                  fontSize="small"
                  className={`text-xl ${open === 1 ? 'text-cs_purple' : 'text-cs_dark'}`}
                />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${open === 1 ? 'text-cs_purple' : 'text-cs_dark'}`}>
                Danh mục
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {cateList.map((cate: CateProp) => (
                <Link to={`/`} key={cate.id}>
                  <ListItem>
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
          <ListItem className={`p-0 ${open === 2 ? 'bg-cs_light shadow-md' : ''}`} selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <IonIcon
                  name="location-sharp"
                  className={`text-xl ${open === 2 ? 'text-cs_purple' : 'text-cs_dark'}`}
                />
              </ListItemPrefix>
              <Typography className={`mr-auto font-normal ${open === 2 ? 'text-cs_purple' : 'text-cs_dark'}`}>
                Địa điểm
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link to={'/'}>
                <ListItem>
                  <ListItemPrefix>
                    <IonIcon name="ellipse" className="text-2xs" />
                  </ListItemPrefix>
                  Thành phố Hồ Chí Minh
                </ListItem>
              </Link>
              <Link to={'/'}>
                <ListItem>
                  <ListItemPrefix>
                    <IonIcon name="ellipse" className="text-2xs" />
                  </ListItemPrefix>
                  Thành phố Hà Nội
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Link to={'/help'}>
          <ListItem
            onClick={() => handleOpen(3)}
            className={`focus:bg-cs_light ${open === 3 ? 'bg-cs_light shadow-md' : ''}`}
          >
            <ListItemPrefix>
              <IonIcon name="call-sharp" className={`text-xl ${open === 3 ? 'text-cs_purple' : 'text-cs_dark'}`} />
            </ListItemPrefix>
            <Typography className={`mr-auto font-normal ${open === 3 ? 'text-cs_purple' : 'text-cs_dark'}`}>
              Hỗ trợ
            </Typography>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to={'/'}>
          <ListItem>
            <ListItemPrefix>
              <IonIcon name="people-circle" className="text-xl" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal">Người tổ chức</Typography>
          </ListItem>
        </Link>
        <Link to={'/about'}>
          <ListItem>
            <ListItemPrefix>
              <IonIcon name="alert-circle-outline" className="text-xl" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal">Giới thiệu</Typography>
          </ListItem>
        </Link>
        <Link to={'/'}>
          <ListItem>
            <ListItemPrefix>
              <IonIcon name="help-circle-outline" className="text-xl" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal">FAQs</Typography>
          </ListItem>
        </Link>
      </List>
    </Card>
  );
};

export default SideBar;
