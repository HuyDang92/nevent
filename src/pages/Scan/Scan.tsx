import { QrScanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useVerifyTicketMutation } from '~/features/Auth/authApi.service';
import { useGetEventByIdQuery, useGetTicketByEventIdQuery } from '~/features/Event/eventApi.service';
import moment from 'moment';
import Icon from '~/components/customs/Icon';
import useSocket from '~/hooks/useConnecrSocket';

export default function Scan() {
  const { idEvent } = useParams();
  const socket = useSocket();
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [historyCheckin, setHistoryCheckin] = useState<any>(null);
  const [verifyTicket, result] = useVerifyTicketMutation();
  const event = useGetEventByIdQuery(idEvent ? idEvent : '');
  console.log(event);
  
  useEffect(() => { 
    console.log(scanSuccess);

    if (socket) {
      socket.emit('check-in-event', idEvent);
      socket.on('check-in-event', (data) => {
        setHistoryCheckin(data.data);
      });
    } else {
      console.log('Socket not connected');
    }
  }, [result.isLoading]);
  useEffect(() => {
    if (result.error) {
      Swal.fire((result.error as any).data.message, '', 'error').then(() => setScanSuccess(false));
      setScanSuccess(false);
      return;
    }
    if (result.isSuccess) {
      Swal.fire('Vé hợp lệ!', '', 'success').then(() => setScanSuccess(false));
      setScanSuccess(false);
      return;
    }
  }, [result.isLoading]);

  // const handleScan = async (result: string | null) => {
  //   if (result) {
  //     await verifyTicket({ signature: result, event: idEvent });
  //     setScanSuccess(true);
  //   }
  // };
  const handleScan = async (result: any) => {
    if (result && !verificationInProgress) {
      setVerificationInProgress(true); // Set verification in progress
      try {
        await verifyTicket({ signature: result, event: idEvent });
        setScanSuccess(true);
      } catch (error) {
        console.error(error);
      } finally {
        setVerificationInProgress(false); // Reset verification status
      }
    }
  };

  return (
    <div className="h-screen gap-5 bg-cs_light p-5 xl:flex">
      <div>
        <h1 className="text-center font-bold">Khu vực quét vé</h1>
        <div className="w-full overflow-hidden rounded-lg border-4 border-cs_semi_green xl:h-[30rem] xl:w-[30rem]">
          {!scanSuccess && (
            <QrScanner
              onDecode={(result) => handleScan(result)}
              onError={(error) => console.log(error?.message)}
              scanDelay={500}
              constraints={{
                width: {
                  min: 640,
                  ideal: 720,
                  max: 1920,
                },
                height: {
                  min: 640,
                  ideal: 1080,
                  max: 1080,
                },
              }}
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
          <div className="relative  hidden w-full overflow-x-scroll rounded-xl p-3 shadow-border-full xl:block xl:w-[70%]">
            <h3 className="text-lg font-semibold">Lịch sử checkin</h3>
            <div className="mt-2 w-[120%] text-[14px] ">
              <div className="stickfl top-0 mb-3 flex h-10 justify-between rounded-lg bg-cs_light_gray py-2 font-medium">
                <span className="w-[calc(100%/4)] text-center text-base">Email</span>
                <span className="w-[calc(100%/4)] text-center text-base">Họ tên</span>
                <span className="w-[calc(100%/4)] text-center text-base">Loại vé </span>
                <span className="w-[calc(100%/4)] text-center text-base">Thời gian</span>
              </div>
              <ul className="h-[calc(100vh-20rem)] overflow-y-scroll">
                {historyCheckin?.users?.map((item: any, index: number) => {
                  const classes = historyCheckin?.users.length - 1 === index ? '' : '';
                  return (
                    <li
                      key={index}
                      className={`${classes} my-2 flex justify-between gap-3 rounded-lg p-2 font-semibold  hover:bg-[#eee] dark:text-cs_light`}
                    >
                      <span className="w-[calc(100%/4)] text-center">{item?.email}</span>
                      <span className="w-[calc(100%/4)] text-center">{item?.name}</span>
                      <span className="w-[calc(100%/4)] text-center">{item?.ticket}</span>
                      <span className="w-[calc(100%/4)] text-center">
                        {moment(item?.dateCheckIn).format('HH:mm - DD/MM/YYYY')}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="h-fit w-full rounded-xl p-3 shadow-border-full xl:w-[30%]">
            <h3 className="text-lg font-semibold">Danh sách vé</h3>
            <ul className="space-y-1 pt-5 font-medium">
              <li className="flex justify-between">
                <span>Loại vé</span>
                <span>Đã checkin</span>
              </li>
              {historyCheckin?.analytics?.map((item: any, index: number) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: item?.color,
                  }}
                  className={`rounded-lg p-2 text-cs_light`}
                >
                  <span className="flex justify-between">
                    <span>{item?.ticket} </span>
                    <span>{item?.total}</span>
                  </span>
                </li>
              ))}
              <li className="flex justify-between p-2 font-bold uppercase">
                <span>Tổng</span>
                <span>{historyCheckin?.analytics?.reduce((total: any, item: any) => total + item.total, 0)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
