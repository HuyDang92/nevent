import { useEffect, useState } from 'react';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import TicketProfile from '~/components/TicketProfile';
import nothing from '~/assets/images/nothing.svg';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import { useGetMyTicketQuery } from '~/features/Auth/authApi.service';
import LoadingLocal from '~/components/customs/Loading/LoadingLocal';
interface UserInfoProp {
  className?: string;
  auth?: IUserField | null;
}

const code: any[] = [];

const MyTicket = ({ auth, className }: UserInfoProp) => {
  const getTickets = useGetMyTicketQuery();

  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold">Vé của tôi</h1>
      <Tabs>
        <TabsHeader className="mt-3 shadow-none sm:w-[40%]">
          <Tab className="flex items-center justify-center" index={0}>
            <span className="text-[16px]">Vé của tôi</span>
          </Tab>
          <Tab className="flex items-center justify-center" index={1}>
            <span className="text-[16px]">Mã giảm giá</span>
          </Tab>
        </TabsHeader>
        <TabsBody className="shadow-none">
          <TabsContent index={0} className="space-y-2">
            {getTickets.isFetching && <LoadingLocal />}
            {!getTickets.isFetching && getTickets.data?.data?.length > 0 ? (
              getTickets.data?.data?.map((item: any, index: number) => <TicketProfile key={index} data={item} />)
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
