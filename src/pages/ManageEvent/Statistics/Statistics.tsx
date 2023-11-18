import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import { Icon as Iconfy } from '@iconify/react';
import {
  useDeleteEventMutation,
  useGetEventAnalyticsQuery,
  useGetEventByIdQuery,
  useGetTicketByEventIdQuery,
} from '~/features/Event/eventApi.service';
import { Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Progress } from '@material-tailwind/react';
import { useAppSelector } from '~/hooks/useActionRedux';
import { LineChart } from '~/components/Chart';
import { Tooltip } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';
import { isFetchBaseQueryError } from '~/utils/helper';

const Statistics = () => {
  const { idEvent } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const [deleteEvent, { isLoading, isSuccess, isError, error }] = useDeleteEventMutation();
  const tikets = useGetTicketByEventIdQuery(idEvent || '');
  const event = useGetEventAnalyticsQuery(idEvent || '');
  console.log(event);

  const deleteErr = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        successNotify('Xóa sự kiện thành công');
      }, 500);
      navigate('/organization/event-list');
    }
    if (isError) {
      errorNotify('Xóa sự kiện thất bại');
    }
  }, [isSuccess, isError]);

  // Chart JS
  const chartLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const chartData = [1, 3, 4, 5, 7, 11, 13, 15, 15, 15, 23, 24, 25, 26, 32, 35, 35, 35, 38, 41, 41, 45, 47, 45, 35];
  // ===========================

  // Functions
  const handleDeleteEvent = async () => {
    await deleteEvent(idEvent);
    setOpen(false);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      // create cases for  REVIEW, UPCOMING, HAPPENING, COMPLETED, CANCELED
      case 'REVIEW':
        return (
          <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_blueGray px-3 py-1 text-cs_light">
            Đang chờ phê duyệt
          </div>
        );
      case 'UPCOMING':
        return (
          <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_yellow-500 px-3 py-1 text-cs_light">
            Sắp diễn ra
          </div>
        );
      case 'HAPPENING':
        return (
          <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_leaf-500 px-3 py-1 text-cs_light">
            Đang diễn ra
          </div>
        );
      case 'COMPLETED':
        return (
          <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_green px-3 py-1 text-cs_light">
            Đã hoàn thành
          </div>
        );
      case 'CANCELED':
        return (
          <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_red px-3 py-1 text-cs_light">
            Đã hủy
          </div>
        );
      default:
        return (
          <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_blueGray px-3 py-1 text-cs_light">
            Đang chờ phê duyệt
          </div>
        );
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Thống kê sự kiện</h1>
          <Dropdown auth={auth} />
        </div>
        {deleteErr && (
          <small className="px-2 text-center text-[12px] text-red-600">{(deleteErr.data as any).message}</small>
        )}
        <div className='mt-8 flex gap-10'>
          <div className='w-1/4 shadow-border-full rounded-xl p-3 dark:text-cs_light'>
            <span className='font-semibold'>Số vé bán được</span>
            <div className='mt-4'>
              <b className='text-cs_semi_green text-2xl'>{event?.data?.data?.analytics?.totalTicketPurchases.toLocaleString('vi')}</b>
              <span className='text-xs'> / {event?.data?.data?.event.totalTicketIssue.toLocaleString('vi')} vé</span>
            </div>
          </div>
          <div className='w-1/4 shadow-border-full rounded-xl p-3 dark:text-cs_light'>
            <span className='font-semibold'>Doanh thu</span>
            <div className='mt-4'>
              <b className='text-cs_semi_green text-2xl'>{event?.data?.data?.analytics?.totalTicketPurchases.toLocaleString('vi')}</b>
              <span className='text-xs'> / vnđ</span>
            </div>
          </div>
          <div className='w-1/4 shadow-border-full rounded-xl p-3 dark:text-cs_light'>
            <span className='font-semibold'>Tổng số khách hàng</span>
            <div className='mt-4'>
              <b className='text-cs_semi_green text-2xl'>{event?.data?.data?.analytics?.revenue.toLocaleString('vi')}</b>
              <span className='text-xs'> / Người</span>
            </div>
          </div>
          <div className='w-1/4 shadow-border-full rounded-xl p-3 dark:text-cs_light'>
            <span className='font-semibold'>Tổng phí dịch vụ</span>
            <div className='mt-4'>
              <b className='text-cs_semi_green text-2xl'>{event?.data?.data?.analytics?.fee.toLocaleString('vi')}</b>
              <span className='text-xs'> / vnđ</span>
            </div>
          </div>
          
        </div>
        <div className="relative mt-8">
          <Carousel
            className={`w-full rounded-xl object-cover sm:h-[320px] xl:h-[600px]`}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute left-4 top-2/4 z-40 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute !right-4 top-2/4 z-40 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </IconButton>
            )}
          >
            {event?.data?.data?.event?.banner?.map((image: any) => (
              <img src={image.url} alt="banner" className="h-full w-full rounded-xl object-cover " />
            ))}
          </Carousel>
          <div className="absolute left-[15px] top-[15px] flex flex-col gap-1 rounded-md border-[1px] border-cs_grayText bg-gray-600 bg-opacity-20 bg-clip-padding p-3 text-[14px] text-cs_light backdrop-blur-sm backdrop-filter">
            <h1 className="text-lg font-bold text-cs_light">{event?.data?.data?.event?.title}</h1>
            {renderStatus(event?.data?.data?.event?.status)}
            <div className="flex items-center gap-[15px]">
              <Iconfy icon="ph:timer-bold" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
              <span className="w-[90%] dark:text-cs_light">
                {' '}
                {moment(event?.data?.data?.event?.start_date).format('hh:mm')}&nbsp;
                {moment(event?.data?.data?.event?.salesStartDate).format('DD/MM/YYYY')}- 
                {moment(event?.data?.data?.event?.salesEndDate).format('DD/MM/YYYY')}&nbsp;
              </span>
            </div>
            <div className="flex items-center gap-[15px]">
              <Iconfy icon="solar:calendar-bold" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
              <span className="w-[90%] dark:text-cs_light">
                {moment(event?.data?.data?.event?.start_date).format('dddd, DD MMMM YY')}&nbsp;
              </span>
            </div>
            <div className="flex items-center gap-[15px]">
              <Iconfy icon="carbon:location-filled" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
              <span className="w-[90%] dark:text-cs_light">
                <span>{event?.data?.data?.event?.location.name}</span>
              </span>
            </div>
          </div>
          <Link className="absolute right-[15px] top-[15px]" to={`/organization/scan-ticket`}>
            <Button mode="dark" value="Check in" />
          </Link>
          <div className="absolute bottom-[15px] right-[15px] flex gap-4">
            <Link to={`/manage-event/edit/${idEvent}`}>
              <Button
                className="!bg-cs_yellow-500 !p-2"
                value={<Iconfy icon="bxs:edit" className="text-2xl text-cs_light" />}
              />
            </Link>
            <Button
              onClick={() => setOpen(true)}
              value={<Iconfy icon="solar:trash-bin-minimalistic-bold" className="text-2xl text-cs_light" />}
              className="!bg-red-700 !p-2"
            ></Button>
          </div>
        </div>
        {/* <div className="mt-8 rounded-xl border-[1px] border-cs_semi_green p-4">
          <div className="flex justify-between rounded-lg bg-cs_light_gray px-4 py-3">
            <b>Lợi nhuận: </b>
            <span className="font-bold text-cs_semi_green">0 VNĐ</span>
          </div>
          <div className="my-3 flex justify-between gap-3">
            <div className="flex w-1/2 justify-between rounded-lg bg-cs_light_gray px-4 py-3">
              <b>Doanh số: </b>
              <span className="font-bold text-cs_semi_green">0 VNĐ</span>
            </div>
            <div className="flex w-1/2 justify-between rounded-lg bg-cs_light_gray px-4 py-3">
              <b>Hoa hồng / vé: </b>
              <span className="font-bold text-cs_semi_green">3% / vé</span>
            </div>
          </div>
          <div className="flex w-[calc(50%-6px)] justify-between rounded-lg bg-cs_light_gray px-4 py-3">
            <b>Phí dịch vụ: </b>
            <span className="font-bold text-cs_semi_green">0 VNĐ</span>
          </div>
        </div> */}
        {/* <div className="mt-8 flex gap-10 rounded-xl border-[1px] border-cs_semi_green p-4 dark:text-cs_light">
          <div>
            <b>Thời gian bán vé: </b>
            <div className="mt-2 flex items-center gap-4">
              <b>Từ: </b> <div className="rounded border-[1px] border-cs_semi_green px-6 py-2">12/12/2023</div>
              <b>Đến: </b> <div className="rounded border-[1px] border-cs_semi_green px-6 py-2">12/12/2023</div>
            </div>
          </div>
          <div>
            <b>Tình trạng vé: </b>
            <div className="mt-2 flex gap-5">
              <div className="flex h-8 w-32 items-center justify-center rounded-md bg-cs_semi_green text-[14px] font-semibold text-cs_light">
                Tổng : {event?.data?.data.totalTicketIssue}
              </div>
              <div className="flex h-8 w-32 items-center justify-center rounded-md bg-cs_green text-[14px] font-semibold text-cs_light">
                Đã bán : 0
              </div>
            </div>
          </div>
        </div> */}
        <div className="mt-8">
          <b className="mb-5 block dark:text-cs_light">Tóm tắt vé</b>
          {/* Div box */}
          <div className="text-[14px]">
            <div className="mb-3 flex justify-between rounded-lg bg-cs_light_gray  px-10 py-4 font-bold">
              <span className="w-[calc(100%/6)] text-center text-base">Tên vé</span>
              <span className="w-[calc(100%/6)] text-center text-base">Loại vé</span>
              <span className="w-[calc(100%/6)] text-center text-base">Giá vé (VNĐ) </span>
              <span className="w-[calc(100%/6)] text-center text-base">Số lượng vé</span>
              <span className="w-[calc(100%/6)] text-center text-base">Đã bán</span>
              <span className="w-[calc(100%/6)] text-center text-base">Doanh số (VNĐ) </span>
            </div>
            <ul>
              {tikets?.data?.data?.map((ticket: ITicket) => (
                <li className="my-3 flex justify-between rounded-lg border-[1px] border-cs_gray px-10 py-4 font-semibold dark:text-cs_light">
                  <span className="w-[calc(100%/6)] text-center">{ticket?.title}</span>
                  <span className="w-[calc(100%/6)] text-center">{ticket?.type}</span>
                  <span className="w-[calc(100%/6)] text-center">{ticket?.price?.toLocaleString('vi')}</span>
                  <span className="w-[calc(100%/6)] text-center">{ticket?.quantity}</span>
                  <span className="w-[calc(100%/6)] text-center">50</span>
                  <span className="w-[calc(100%/6)] text-center">500.000</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Table */}

          {/* <table className='w-full border-separate border-spacing-y-2 text-center'>
            <thead className='bg-cs_gray rounded-lg'>
              <tr>
                <th className='py-4'>Tên vé</th>
                <th>Loại vé</th>
                <th>Giá vé</th>
                <th>Số lượng vé</th>
                <th>Đã bán</th>
                <th>Doanh số (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-cs_light_gray'>
                <td className='py-4'>AAA</td>
                <td>VVIP</td>
                <td>10.000</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div className="mt-8 rounded-xl border-[1px] border-cs_semi_green p-4 dark:text-cs_light">
          <b>Thời thiệu sự kiện </b>
          <p>{event?.data?.data?.event?.desc}</p>
        </div>
        <LineChart title="Thống kê số lượng vé bán được" labels={chartLabels} data={chartData} />
        <Dialog open={open} handler={setOpen} size="xs">
          <DialogHeader>Cảnh báo</DialogHeader>
          <DialogBody className="text-center">Bạn chắc chắn muốn xóa sự kiện này</DialogBody>
          <DialogFooter className="flex justify-center gap-5">
            <Button mode="dark" value="Xác nhận" onClick={handleDeleteEvent} />
            <Button mode="dark" value="Hủy" onClick={() => setOpen(false)} />
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default Statistics;
