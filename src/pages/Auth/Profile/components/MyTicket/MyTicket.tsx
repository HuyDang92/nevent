import { useEffect, useState } from 'react';
import Loading from '~/components/customs/Loading';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import TicketProfile from '~/components/TicketProfile';

interface UserInfoProp {
  className?: string;
  data?: IUserField | null;
}

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
          <TabsContent index={0} className="">
            <TicketProfile />
          </TabsContent>
          <TabsContent index={1} className="">
            <span className="hidden text-[16px] md:block">Mã giảm giá</span>
          </TabsContent>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default MyTicket;
