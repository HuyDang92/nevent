import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import { Icon as Iconfy } from '@iconify/react';
import { useDeleteEventMutation, useGetEventAnalyticsQuery } from '~/features/Event/eventApi.service';
import { Carousel, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';
import { useEffect, useMemo, useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';
import { isFetchBaseQueryError } from '~/utils/helper';
import ManageEventParameters from '~/pages/CreateEvent/EventManage/components/ManageEventParameters/ManageEventParameters';
import ChartBarAverage from '~/components/BarAverage/BarAverage';

const Statistics = () => {
  const { idEvent } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [deleteEvent, { isLoading, isSuccess, isError, error }] = useDeleteEventMutation();
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

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
      <div className="h-full w-full rounded-2xl bg-cs_light p-3 dark:bg-cs_lightDark xl:p-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Thống kê sự kiện</h1>
          <Dropdown />
        </div>
        {deleteErr && (
          <small className="px-2 text-center text-[12px] text-red-600">{(deleteErr.data as any).message}</small>
        )}

        <div className="my-5 flex w-full flex-wrap items-start justify-start gap-5 rounded-2xl bg-white p-4 shadow-border-light dark:bg-[#3f3c3c]">
          <ManageEventParameters
            title={'Số vé bán được'}
            count={event?.data?.data?.analytics?.totalTicketPurchases}
            border
          />
          <ManageEventParameters
            title={'Doanh thu (VND)'}
            count={event?.data?.data?.analytics?.revenue.toLocaleString('vi')}
            border
          />
          <ManageEventParameters
            title={'Tổng số khách hàng'}
            count={event?.data?.data?.analytics?.numberOfCustomers}
            border
          />
          <ManageEventParameters title={'Tổng phí dịch vụ'} count={event?.data?.data?.analytics?.fee} />
        </div>
        <div className="my-8">
          <b className="mb-5 block dark:text-cs_light">Thống kê bán vé</b>

          {/* Div box */}
          <div className="rounded-xl border border-[#ccc] p-2 text-[14px]">
            <div className="mb-3 flex justify-between rounded-lg bg-cs_light_gray  px-4 py-4 font-bold">
              <span className="w-[calc(100%/6)] text-center text-base">Tên vé</span>
              <span className="w-[calc(100%/6)] text-center text-base">Loại vé</span>
              <span className="w-[calc(100%/6)] text-center text-base">Giá vé (VNĐ) </span>
              <span className="w-[calc(100%/6)] text-center text-base">Số lượng vé</span>
              <span className="w-[calc(100%/6)] text-center text-base">Đã bán</span>
              <span className="w-[calc(100%/6)] text-center text-base">Doanh số (VNĐ) </span>
            </div>
            <ul>
              {event.data?.data?.tickets?.map((ticket: ITicket, index: number) => {
                const classes = event.data?.data?.tickets.length - 1 === index ? '' : 'border-b-[1px] border-[#ccc]';
                return (
                  <li
                    key={index}
                    className={`${classes} my-2 flex justify-between gap-3 px-4 py-4 font-semibold dark:text-cs_light`}
                  >
                    <span className="w-[calc(100%/6)] text-center">{ticket?.title}</span>
                    <span className="w-[calc(100%/6)] text-center">{ticket?.type}</span>
                    <span className="w-[calc(100%/6)] text-center">{ticket?.price?.toLocaleString('vi')}</span>
                    <span className="w-[calc(100%/6)] text-center">{ticket?.quantity}</span>
                    <span className="w-[calc(100%/6)] text-center">{ticket?.sold}</span>
                    <span className="w-[calc(100%/6)] text-center">{ticket?.revenue.toLocaleString('vi')}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <ChartBarAverage type={'revenue'} className="hidden xl:block" />
        <ChartBarAverage type={'ticket'} className="hidden xl:block" />
        <div className="mt-8 flex flex-col gap-1 overflow-hidden rounded-xl border-[1px] border-cs_semi_green p-4 dark:text-cs_light xl:hidden">
          <h1 className="text-lg font-bold dark:text-cs_light">{event?.data?.data?.event?.title}</h1>
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
        <div className="relative mt-8">
          <Carousel
            className={`h-[200px] w-full rounded-xl object-cover sm:h-[320px] xl:h-[500px]`}
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
            {event?.data?.data?.event?.banner?.map((image: any, index: number) => (
              <div className="h-full w-full">
                <img key={index} src={image.url} alt="banner" className="h-full w-full rounded-xl object-cover" />
              </div>
            ))}
          </Carousel>
          <div className="absolute left-[15px] top-[15px] hidden flex-col gap-1 rounded-md border-[1px] border-cs_grayText bg-gray-600 bg-opacity-20 bg-clip-padding p-3 text-[14px] text-cs_light backdrop-blur-sm backdrop-filter xl:flex">
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
          <a className="absolute right-[15px] top-[15px]" href={`/scan-ticket/${idEvent}`} target="_blank">
            <Button mode="dark" value="Check in" />
          </a>
          <div className="absolute bottom-[15px] right-[15px] flex gap-4">
            <Link to={`/organization/edit-event/${idEvent}/0`}>
              <Button
                className="!bg-cs_yellow-500 !p-2"
                value={<Iconfy icon="bxs:edit" className="text-2xl text-cs_light" />}
              />
            </Link>
            {event?.data?.data?.event?.status === 'REVIEW' && (
              <Button
                onClick={() => setOpen(true)}
                value={<Iconfy icon="solar:trash-bin-minimalistic-bold" className="text-2xl text-cs_light" />}
                className="!bg-red-700 !p-2"
              ></Button>
            )}
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-xl border-[1px] border-cs_semi_green p-4 dark:text-cs_light">
          <b>Giới thiệu sự kiện </b>
          {event?.data?.data?.event?.desc && (
            <div dangerouslySetInnerHTML={{ __html: event?.data?.data?.event?.desc }} />
          )}
        </div>
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
