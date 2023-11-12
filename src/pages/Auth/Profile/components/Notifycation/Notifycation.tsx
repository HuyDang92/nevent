import { Avatar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Icon from '~/components/customs/Icon';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import nothing from '~/assets/images/nothing.svg';
import useSocket from '~/hooks/useConnecrSocket';
import moment from 'moment';

interface UserInfoProp {
  className?: string;
  classNameTagHeader?: string;
  data?: IUserField | null;
  popup?: boolean;
}

const Notifycation = ({ data, className, classNameTagHeader, popup }: UserInfoProp) => {
  const socket = useSocket();
  const [notificationData, setNotificationData] = useState<INotify[]>([]);
  const [clickedItems, setClickedItems] = useState<any[]>([]); // Lưu trạng thái click của từng mục
  const [unClick, setUnclick] = useState<any[]>([]); // Lưu trạng thái click của từng mục
  const [showDeleteMenu, setShowDeleteMenu] = useState<any[]>([]);

  useEffect(() => {
    const unclickedItems = notificationData.filter((item, index: number) => !clickedItems.includes(item));
    setUnclick(unclickedItems);
  }, [clickedItems]);

  useEffect(() => {
    if (socket) {
      socket.emit('get-notifications', '');
      socket.on('get-notifications', (data) => {
        // Xử lý dữ liệu từ sự kiện
        console.log('Received data:', data);
        setNotificationData(data);
      });
    } else {
      console.log('Socket not connected');
    }
  }, []);
  function formatTimeDifference(timestamp: string): string {
    const currentTime = new Date();
    const compareTime = new Date(timestamp);

    const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - compareTime.getTime()) / 1000);

    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `Just now`;
    }
  }
  const handleItemClick = (item: any) => {
    setClickedItems((prevClickedItems) => {
      // Kiểm tra xem mục đã tồn tại trong mảng chưa
      if (!prevClickedItems.includes(item)) {
        // Nếu mục chưa tồn tại, thêm nó vào mảng
        return [...prevClickedItems, item];
      }
      // Nếu mục đã tồn tại, không thay đổi mảng
      return prevClickedItems;
    });
  };

  const handleRemoveItem = (item: any) => {
    setShowDeleteMenu((prevClickedItems) => {
      // Kiểm tra xem mục đã tồn tại trong mảng chưa
      if (!prevClickedItems.includes(item)) {
        // Nếu mục chưa tồn tại, thêm nó vào mảng
        return [...prevClickedItems, item];
      }
      // Nếu mục đã tồn tại, không thay đổi mảng
      return prevClickedItems;
    });
    setTimeout(() => {
      const updatedData = notificationData.filter((dataItem: any) => dataItem.id !== item.id);
      setNotificationData(updatedData);
    }, 300);
  };
  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold dark:text-cs_light">Thông báo</h1>
      <Tabs>
        <TabsHeader className={` mt-3 p-1 shadow-none ${classNameTagHeader} `}>
          <Tab className="flex items-center justify-center" index={0}>
            <span className="text-[16px] dark:text-cs_light">Tất cả</span>
          </Tab>
          <Tab className="relative flex items-center justify-center" index={1}>
            <span className="text-[16px] dark:text-cs_light">Chưa đọc</span>
            {unClick.length > 0 && <span className="absolute -right-0 -top-0 h-3 w-3 rounded-full bg-red-500"></span>}
          </Tab>
        </TabsHeader>
        <TabsBody className="shadow-none">
          <TabsContent index={0} className="overflow-hidden rounded-xl">
            {notificationData.length > 0 ? (
              notificationData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`${clickedItems.includes(item) ? 'bg-cs_light' : 'bg-[#f5f7fc] dark:bg-cs_lightDark'} ${
                    showDeleteMenu.includes(item) ? 'translate-x-[100%] transition-all' : ''
                  } flex cursor-pointer items-center  justify-between bg-[#f5f7fc] dark:bg-cs_dark`}
                >
                  <div className="flex items-center gap-4  py-2 pl-2 pr-8">
                    <Avatar variant="circular" alt="tania andrew" src={item?.sender?.avatar?.url} />
                    <div className="flex flex-col gap-1">
                      <Typography
                        variant="small"
                        color="gray"
                        className={`${clickedItems.includes(item) ? 'font-normal' : 'font-bold'} `}
                      >
                        {/* <span className=" font-semibold text-blue-gray-900 dark:text-cs_light">{item?.content}</span>{' '} */}
                        {item?.content}
                      </Typography>
                      <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="time-outline" />
                        {formatTimeDifference(item?.createdAt)}
                      </Typography>
                    </div>
                  </div>
                  {popup && (
                    <Icon onClick={() => handleRemoveItem(item)} name="trash-outline" className="px-5 text-red-500" />
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center py-5 text-center">
                <div>
                  <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
                  <h3 className="font-medium text-[#ccc]">Không có thông báo</h3>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent index={1} className="overflow-hidden rounded-xl">
            {unClick.length > 0 ? (
              unClick.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`${clickedItems.includes(item) ? 'bg-cs_light' : 'bg-[#f5f7fc] dark:bg-cs_lightDark'} ${
                    showDeleteMenu.includes(item) ? 'translate-x-[100%] transition-all' : ''
                  } flex cursor-pointer items-center  justify-between bg-[#f5f7fc] dark:bg-cs_dark`}
                >
                  <div className="flex items-center gap-4  py-2 pl-2 pr-8">
                    <Avatar variant="circular" alt="tania andrew" src={item.avatar} />
                    <div className="flex flex-col gap-1">
                      <Typography
                        variant="small"
                        color="gray"
                        className={`${clickedItems.includes(item) ? 'font-normal' : 'font-bold'} `}
                      >
                        <span className=" font-semibold text-blue-gray-900 dark:text-cs_light">{item.name}</span>{' '}
                        {item.desc}
                      </Typography>
                      <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="time-outline" />
                        {formatTimeDifference(item?.createdAt)}
                      </Typography>
                    </div>
                  </div>
                  {popup && (
                    <Icon onClick={() => handleRemoveItem(item)} name="trash-outline" className="px-5 text-red-500" />
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center py-5 text-center">
                <div>
                  <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
                  <h3 className="font-medium text-[#ccc]">Không có thông báo</h3>
                </div>
              </div>
            )}
          </TabsContent>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Notifycation;
