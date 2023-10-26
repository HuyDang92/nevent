import { Menu, MenuHandler, MenuList, MenuItem, IconButton, Avatar, Typography } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';

type NotificationData = {
  avatar: string;
  name: string;
  desc: string;
  time: string;
};

type NotificationProps = {
  data: NotificationData[];
  className?: string;
};

const Notifications = ({ data, className }: NotificationProps) => {
  return (
    <div className={className}>
      <Menu>
        <MenuHandler>
          <IconButton
            variant="text"
            className="relative items-center rounded-lg text-cs_semi_green transition hover:scale-110 hover:bg-transparent"
          >
            <div className="absolute -right-1 -top-1 z-50 rounded-full bg-red-500 px-[5px] text-[10px] text-cs_light xl:-right-2 xl:-top-2">
              2
            </div>
            <IonIcon name="notifications" className="text-2xl" />
          </IconButton>
        </MenuHandler>
        <MenuList className="flex flex-col gap-2">
          {data &&
            data.map((item, index) => (
              <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8" key={index}>
                <Avatar variant="circular" alt="tania andrew" src={item.avatar} />
                <div className="flex flex-col gap-1">
                  <Typography variant="small" color="gray" className="font-normal">
                    <span className="font-medium text-blue-gray-900">{item.name}</span> {item.desc}
                  </Typography>
                  <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                    <IonIcon name="time-outline" />
                    {item.time} ago
                  </Typography>
                </div>
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </div>
  );
};
export default Notifications;
