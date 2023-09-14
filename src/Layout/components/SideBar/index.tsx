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
import categoryIcon from '~/assets/svg/iconamoon_category-fill.svg'
import IonIcon from '@reacticons/ionicons';

const SideBar = () => {
  const [open, setOpen] = useState(0);
  console.log(open);

  const handleOpen = (value: number) => {
    setOpen(value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-[20vw] bg-transparent p-4 text-cs_dark shadow-xl">
      <List>
        <ListItem>
          <ListItemPrefix>
            <IonIcon name="home" className={`h-5 w-5 ${open === 0 ? 'text-cs_purple' : 'text-cs_dark'} `} />
          </ListItemPrefix>
          Trang chủ
        </ListItem>
        <Accordion
          open={open === 1}
          icon={
            <IonIcon
              name="chevron-down-outline"
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <img src={categoryIcon} alt="" className="h-5 w-5"/>
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <IonIcon name="chevron-forward" className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <IonIcon name="chevron-forward" className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <IonIcon name="chevron-forward" className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
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
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <IonIcon name="location-sharp" className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Địa điểm
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <IonIcon name="chevron-forward" className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <IonIcon name="chevron-forward" className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>
    </Card>
  );
};

export default SideBar;
