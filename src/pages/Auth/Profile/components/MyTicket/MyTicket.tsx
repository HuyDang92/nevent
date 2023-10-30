import { useEffect, useState } from 'react';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import TicketProfile from '~/components/TicketProfile';
import nothing from '~/assets/images/nothing.svg';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';

interface UserInfoProp {
  className?: string;
  data?: IUserField | null;
}

const code: any[] = [];
const dataTicket = [
  {
    id: 1,
    title: 'HAPPY BEE V.O.L III VER 2',
    start_date: '2023-10-16T05:53:00.698Z',
    category: 'Âm nhạc',
    ticketCount: 3,
    dataTicket: [
      'https://jess3.com/wp-content/uploads/2011/10/JESS3_QRCode1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0xLOY0G6BUyjKfKgt8hJHZtCxoupDj1n6cGE_kwMj_7EKV8fj4BQy59TsUfNY1J0vNZU&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS2Z-R-dy3l4OOykRpXXcJSwS2WXr9RY6lZG0YJeY_N5vJ17yAxEOJgWBpmyL-mkwlB4Y&usqp=CAU',
    ],
    ticketStatus: 'Chưa sử dụng',
    ticketType: 'Vé thường',
  },
  {
    id: 1,
    title: 'MINISHOW HỒ QUỲNH HƯƠNG & MYRA TRẦN MÚA LỬA TUNG SÂN KHẤU...',
    start_date: '2023-10-16T05:53:00.698Z',
    category: 'Âm nhạc',
    ticketCount: 1,
    dataTicket: ['https://jess3.com/wp-content/uploads/2011/10/JESS3_QRCode1.jpg'],
    ticketStatus: 'Chưa sử dụng',
    ticketType: 'Vé thường',
  },
];
const MyTicket = ({ data, className }: UserInfoProp) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold">Vé của tôi</h1>
      <Tabs>
        <TabsHeader className="mt-3 shadow-none sm:w-[30%]">
          <Tab className="flex items-center justify-center" index={0}>
            <span className="text-[16px]">Vé của tôi</span>
          </Tab>
          <Tab className="flex items-center justify-center" index={1}>
            <span className="text-[16px]">Mã giảm giá</span>
          </Tab>
        </TabsHeader>
        <TabsBody className="shadow-none">
          <TabsContent index={0} className="space-y-2">
            {dataTicket.length === 0 ? (
              dataTicket.map((item, index) => <TicketProfile key={index} data={item} />)
            ) : (
              <div className="flex justify-center py-5 text-center">
                <div>
                  <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
                  <h3 className="font-medium text-[#ccc]">Không có vé</h3>
                  <Link to="/">
                    <Button value="Mua vé ngay" className="mt-5" mode="dark" />
                  </Link>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent index={1} className="">
            {code.length > 0 ? (
              code.map((item, index) => <>Có mã</>)
            ) : (
              <div className="flex justify-center py-5 text-center">
                <div>
                  <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
                  <h3 className="font-medium text-[#ccc]">Không có mã giảm giá</h3>
                </div>
              </div>
            )}
          </TabsContent>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default MyTicket;
