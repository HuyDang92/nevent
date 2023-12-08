import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useVerifyTicketMutation } from '~/features/Auth/authApi.service';
import { useGetEventByIdQuery, useGetTicketByEventIdQuery } from '~/features/Event/eventApi.service';
import moment from 'moment';
import Icon from '~/components/customs/Icon';

const dataHistory = [
  {
    email: 'huy922003@gmail.com',
    name: 'Nguyễn Đức Huy',
    typeTicket: 'Vé VIP',
    time: '12:00 20/10/2021',
    status: 'success',
  },
  {
    email: 'huy922003@gmail.com',
    name: 'Nguyễn Đức Huy',
    typeTicket: 'Vé VIP',
    time: '12:00 20/10/2021',
    status: 'success',
  },
  {
    email: 'huy922003@gmail.com',
    name: 'Nguyễn Đức Huy',
    typeTicket: 'Vé VIP',
    time: '12:00 20/10/2021',
    status: 'success',
  },
  {
    email: 'huy922003@gmail.com',
    name: 'Nguyễn Đức Huy',
    typeTicket: 'Vé VIP',
    time: '12:00 20/10/2021',
    status: 'success',
  },
];

export default function Scan() {
  const { idEvent } = useParams();
  const [scanSuccess, setScanSuccess] = useState(false);
  const [verifyTicket, result] = useVerifyTicketMutation();
  const event = useGetEventByIdQuery(idEvent ? idEvent : '');
  const eventTickets = useGetTicketByEventIdQuery(idEvent ? idEvent : '');

  useEffect(() => {
    if (result.error) {
      Swal.fire((result.error as any).data.message, '', 'error').then(() => setScanSuccess(false));
      return;
    }
    if (result.isSuccess) {
      console.log(result.data.message);
      Swal.fire('Vé hợp lệ!', '', 'success').then(() => setScanSuccess(false));
      return;
    }
  }, [result.isLoading]);

  const handleScan = async (result: string | null) => {
    if (result && scanSuccess === false) {
      await verifyTicket({ signature: result, event: idEvent });
      setScanSuccess(true);
    }
  };

  return (
    <div className="flex h-screen gap-5 bg-cs_light p-5">
      <div>
        <h1 className="text-center font-bold">Khu vực quét vé</h1>
        <div className="h-[30rem] w-[30rem] overflow-hidden rounded-lg border-4 border-cs_semi_green">
          {!scanSuccess && (
            <QrScanner
              onDecode={(result) => handleScan(result)}
              onError={(error) => console.log(error?.message)}
              scanDelay={500}
            />
          )}
        </div>
      </div>
      <div className="mt-5 w-[100%]">
        <div>
          <h3 className="text-2xl font-bold text-cs_semi_green">{event.data?.data?.title}</h3>
          <p className="">{event.data?.data?.title}</p>
          <div className="flex items-center gap-[15px]">
            <Icon name="timer-outline" className="w-[10%] text-xl dark:text-cs_light" />
            <span className=" dark:text-cs_light">
              {moment(event?.data?.data?.start_date).format('HH:mm - DD/MM/YYYY')}
            </span>
          </div>
          <div className="flex items-center gap-[15px]">
            <Icon name="location-outline" className="w-[10%] text-xl dark:text-cs_light" />
            <span className=" dark:text-cs_light">
              <span>
                {event?.data?.data?.address} {event?.data?.data?.location?.name}
              </span>
            </span>
          </div>
        </div>
        <div className="my-5 flex gap-5 ">
          <div className="relative  w-[70%] overflow-x-scroll rounded-xl p-3 shadow-border-full">
            <h3 className="text-lg font-semibold">Lịch sử checkin</h3>
            <div className="mt-2 w-[150%] text-[14px] ">
              <div className="stickfl top-0 mb-3 flex h-10 justify-between rounded-lg bg-cs_light_gray py-2 font-medium">
                <span className="w-[calc(100%/4)] text-center text-base">Email</span>
                <span className="w-[calc(100%/4)] text-center text-base">Họ tên</span>
                <span className="w-[calc(100%/6)] text-center text-base">Loại vé </span>
                <span className="w-[calc(100%/5)] text-center text-base">Thời gian</span>
                <span className="w-[calc(100%/6)] text-center text-base">Trạng thái</span>
              </div>
              <ul className="h-[calc(100vh-20rem)] overflow-y-scroll">
                {dataHistory?.map((item: any, index: number) => {
                  const classes = dataHistory.length - 1 === index ? '' : '';
                  return (
                    <li
                      key={index}
                      className={`${classes} my-2 hover:bg-[#eee] rounded-lg flex justify-between gap-3 p-2  font-semibold dark:text-cs_light`}
                    >
                      <span className="w-[calc(100%/4)] text-center">{item?.email}</span>
                      <span className="w-[calc(100%/4)] text-center">{item?.name}</span>
                      <span className="w-[calc(100%/6)] text-center">{item?.typeTicket}</span>
                      <span className="w-[calc(100%/5)] text-center">{item?.time}</span>
                      <span className={`${item?.status} w-[calc(100%/6)] text-center text-cs_semi_green`}>
                        {item?.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="h-fit w-[30%] rounded-xl p-3 shadow-border-full">
            <h3 className="text-lg font-semibold">Danh sách vé</h3>
            <ul className="space-y-1 pt-5 font-medium">
              <li className="flex justify-between">
                <span>Loại vé</span>
                <span>Đã checkin</span>
              </li>
              {eventTickets?.data?.data?.map((ticket: ITicket) => (
                <li
                  key={ticket?._id}
                  style={{
                    backgroundColor: ticket?.color,
                  }}
                  className={`rounded-lg p-2 text-cs_light`}
                >
                  <span className="flex justify-between">
                    <span>{ticket?.title} </span>
                    <span>0</span>
                  </span>
                </li>
              ))}
              <li className="flex justify-between p-2 font-bold uppercase">
                <span>Tổng</span>
                <span>0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
