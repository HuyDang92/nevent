import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import TicketProfile from '~/components/TicketProfile';
import nothing from '~/assets/images/nothing.svg';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import { useGetMyTicketQuery } from '~/features/Auth/authApi.service';
import LoadingLocal from '~/components/customs/Loading/LoadingLocal';
import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import Icon from '~/components/customs/Icon';
import moment from 'moment';

interface UserInfoProp {
  className?: string;
}
const code: any[] = [];

const MyTicket = ({ className }: UserInfoProp) => {
  const getTickets = useGetMyTicketQuery();
  const [open, setOpen] = useState<number>(-1);

  const handleOpen = (value: any) => setOpen(open === value ? -1 : value);

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
          <TabsContent index={0} className="space-y-4">
            {getTickets.isFetching && <LoadingLocal />}
            {getTickets.data?.data?.length > 0 &&
              getTickets.data?.data?.map((item: any, index: number) => (
                <Accordion className="rounded-xl border-none  p-0 dark:bg-cs_lightDark" open={open === index}>
                  <AccordionHeader
                    className={`${
                      open === index ? 'border-none' : 'border-none'
                    } block h-[180px] overflow-hidden p-0 text-cs_light hover:text-cs_semi_green xl:h-[200px]`}
                    onClick={() => handleOpen(index)}
                  >
                    <div className="relative">
                      <div className="round-2xl absolute z-10 h-full w-full rounded-2xl bg-cs_dark opacity-60 transition-all group-hover:scale-110"></div>
                      <img
                        src={item?.event?.banner[0]?.url}
                        alt=""
                        className=" h-[180px] w-[100vw] rounded-xl object-cover xl:h-[200px]"
                      />
                      <div className="absolute left-4 top-4 z-10 w-[80%] xl:w-[90%]">
                        <Link to={`/event-detail/${item?.event?._id}`}>
                          <p className=" line-clamp-2 text-xl font-bold ">{item?.event?.title}</p>
                        </Link>
                        <span className=" gap-2 text-sm font-semibold">
                          <span>Thời gian: </span>
                          {moment(item?.event?.start_date).format('hh:mm - DD/MM/YYYY')}
                          <span className="text-sm ">
                            - {item?.event?.address} {item?.event?.location?.name}
                          </span>
                        </span>
                        <p className="text-sm font-semibold">Tổng số vé: {item?.totalTickets}</p>
                      </div>
                      <Icon
                        name="caret-down-circle-outline"
                        className={`${
                          open === index ? 'rotate-180' : ''
                        } absolute right-2 top-1/2 z-10 -translate-y-1/2 text-[2rem] text-cs_light transition-all xl:right-10`}
                      />
                    </div>
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="max-h-[60vh] overflow-y-scroll rounded-xl xl:max-h-[40vh]">
                      {Object.entries(item?.myTickets).map(([key, element]: any, index: number) => {
                        return (
                          <>
                            <TicketProfile key={index} data={element} dataSummary={item} />
                          </>
                        );
                      })}
                    </div>
                  </AccordionBody>
                </Accordion>
              ))}
            {/* {getTickets.data?.data?.length > 0 &&
              getTickets.data?.data?.map((item: any, index: number) => <TicketProfile key={index} data={item} />)} */}
            {getTickets.data?.data?.length === 0 && (
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
              <>Có mã</>
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
