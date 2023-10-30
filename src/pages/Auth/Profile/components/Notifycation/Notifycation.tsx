import { Avatar, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import Icon from '~/components/customs/Icon';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import nothing from '~/assets/images/nothing.svg';

interface UserInfoProp {
  className?: string;
  classNameTagHeader?: string;
  data?: IUserField | null;
  popup?: boolean;
}
const check: any[] = [];
const notificationData = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    name: 'Tania',
    desc: 'send you a message',
    time: '13 minutes',
  },
  {
    id: 2,
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    name: 'Tania',
    desc: 'send you a message',
    time: '13 minutes',
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    name: 'Tania',
    desc: 'send you a message',
    time: '13 minutes',
  },
];
const Notifycation = ({ data, className, classNameTagHeader, popup }: UserInfoProp) => {
  const [clickedItems, setClickedItems] = useState<any[]>([]); // Lưu trạng thái click của từng mục
  const [unClick, setUnclick] = useState<any[]>([]); // Lưu trạng thái click của từng mục
  useEffect(() => {
    const unclickedItems = notificationData.filter((item, index) => !clickedItems.includes(item));
    setUnclick(unclickedItems);
  }, [clickedItems]);
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

  console.log(clickedItems);

  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold">Thông báo</h1>
      <Tabs>
        <TabsHeader className={` mt-3 shadow-none  ${classNameTagHeader} `}>
          <Tab className="flex items-center justify-center" index={0}>
            <span className="text-[16px]">Tất cả</span>
          </Tab>
          <Tab className="relative flex items-center justify-center" index={1}>
            <span className="text-[16px]">Chưa đọc</span>
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></span>
          </Tab>
        </TabsHeader>
        <TabsBody className="shadow-none">
          <TabsContent index={0} className="overflow-hidden rounded-xl">
            {notificationData.length > 0 ? (
              notificationData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`${
                    clickedItems.includes(item) ? 'bg-cs_light' : 'bg-[#f5f7fc]'
                  } flex items-center justify-between bg-[#f5f7fc]`}
                >
                  <div className="flex items-center gap-4  py-2 pl-2 pr-8">
                    <Avatar variant="circular" alt="tania andrew" src={item.avatar} />
                    <div className="flex flex-col gap-1">
                      <Typography variant="small" color="gray" className="font-normal">
                        <span className="font-medium text-blue-gray-900">{item.name}</span> {item.desc}
                      </Typography>
                      <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="time-outline" />
                        {item.time} ago
                      </Typography>
                    </div>
                  </div>
                  {popup && <Icon name="trash-outline" className="px-5 text-red-500" />}
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
                  className={`${
                    clickedItems.includes(item) ? 'bg-cs_light' : 'bg-[#f5f7fc]'
                  } flex items-center justify-between bg-[#f5f7fc]`}
                >
                  <div className="flex items-center gap-4  py-2 pl-2 pr-8">
                    <Avatar variant="circular" alt="tania andrew" src={item.avatar} />
                    <div className="flex flex-col gap-1">
                      <Typography variant="small" color="gray" className="font-normal">
                        <span className="font-medium text-blue-gray-900">{item.name}</span> {item.desc}
                      </Typography>
                      <Typography variant="small" className="flex items-center gap-1 text-xs text-gray-600">
                        <Icon name="time-outline" />
                        {item.time} ago
                      </Typography>
                    </div>
                  </div>
                  {popup && <Icon name="trash-outline" className="px-5 text-red-500" />}
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
