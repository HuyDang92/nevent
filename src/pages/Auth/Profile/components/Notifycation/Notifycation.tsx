import { Avatar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Icon from '~/components/customs/Icon';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import nothing from '~/assets/images/nothing.svg';
import useSocket from '~/hooks/useConnecrSocket';
import { useCheckedViewNotifycationMutation } from '~/features/Auth/authApi.service';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { setNotification } from '~/features/Auth/authSlice';

interface UserInfoProp {
  className?: string;
  classNameTagHeader?: string;
  data?: IUserField | null;
  popup?: boolean;
}

const Notifycation = ({ className, classNameTagHeader, popup }: UserInfoProp) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const [notificationData, setNotificationData] = useState<INotify[]>([]);
  const [unClick, setUnclick] = useState<INotify[]>([]); // Lưu trạng thái click của từng mục
  const [showDeleteMenu, setShowDeleteMenu] = useState<INotify[]>([]);
  const [viewedAll, setViewedAll] = useState<boolean>(false);
  const [viewed] = useCheckedViewNotifycationMutation();

  useEffect(() => {
    const unclickedItems = notificationData.filter((item, index: number) => item?.view === false);
    setUnclick(unclickedItems);
    if (unclickedItems?.length > 0) {
      dispatch(setNotification(true));
    } else {
      dispatch(setNotification(false));
    }
  }, [notificationData]);

  useEffect(() => {
    if (socket) {
      socket.emit('get-notifications', '');
      socket.on('get-notifications', (data) => {
        setNotificationData(data);
      });
    } else {
      console.log('Socket not connected');
    }
  }, []);
  const formatTimeDifference = (timestamp: string): string => {
    const currentTime = new Date();
    const compareTime = new Date(timestamp);

    const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - compareTime.getTime()) / 1000);

    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `Bây giờ`;
    }
  };

  const handleItemClick = async (item: INotify) => {
    if (!item?.view) {
      await viewed(item?._id);
    }
  };

  const handleRemoveItem = (item: INotify) => {
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
      socket.emit('delete-notification', item?._id);
    }, 100);
  };
  const handleViewedAll = async () => {
    await viewed('');
    setViewedAll(true);
    setUnclick([]);
  };
  return (
    <div className={`${className}`}>
      <div className="flex justify-between">
        <h1 className="text-xl  font-bold dark:text-cs_light">Thông báo</h1>
        <span onClick={handleViewedAll} className="cursor-pointer  text-sm text-cs_semi_green hover:underline">
          Đánh dấu đã xem
        </span>
      </div>
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
                  className={`${item?.view || viewedAll ? 'bg-cs_light' : 'bg-[#f5f7fc] dark:bg-cs_lightDark'} ${
                    showDeleteMenu.includes(item) ? 'translate-x-[100%] transition-all' : ''
                  } flex cursor-pointer items-center justify-between  gap-2 bg-[#f5f7fc] dark:bg-cs_dark`}
                >
                  <Link to={item?.url ?? '/user/profile/3'} className="flex items-center gap-4  py-2 pl-2 sm:pr-8">
                    <Avatar variant="circular" alt="tania andrew" src={item?.sender?.avatar?.url} />
                    <div className="flex flex-col gap-1">
                      <span
                        className={`${
                          item?.view || viewedAll ? 'font-normal' : 'font-bold'
                        } line-clamp-2 text-left text-sm text-cs_grayText`}
                      >
                        {item?.content}
                      </span>
                      <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="time-outline" />
                        {formatTimeDifference(item?.createdAt)}
                      </Typography>
                    </div>
                  </Link>
                  {popup && (
                    <Icon
                      onClick={() => handleRemoveItem(item)}
                      name="trash-outline"
                      className="text-xl text-red-500 sm:px-5 sm:text-sm"
                    />
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
                  className={`${viewedAll ? 'bg-cs_light' : 'bg-[#f5f7fc] dark:bg-cs_lightDark'} ${
                    showDeleteMenu.includes(item) ? 'translate-x-[100%] transition-all' : ''
                  } flex cursor-pointer items-center  justify-between bg-[#f5f7fc] dark:bg-cs_dark`}
                >
                  <Link to={item?.url ?? '/user/profile/3'} className="flex items-center gap-4  py-2 pl-2 pr-8">
                    <Avatar variant="circular" alt="tania andrew" src={item?.sender?.avatar?.url} />
                    <div className="flex flex-col gap-1">
                      <span
                        className={`${
                          viewedAll ? 'font-normal' : 'font-bold'
                        } line-clamp-2 text-left text-sm text-cs_grayText`}
                      >
                        {item?.content}
                      </span>
                      <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="time-outline" />
                        {formatTimeDifference(item?.createdAt)}
                      </Typography>
                    </div>
                  </Link>
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
