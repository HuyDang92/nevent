import Dropdown from '~/components/Dropdown';
import ManageEventParameters from './components/ManageEventParameters/ManageEventParameters';
import { useGetEventBusinessQuery } from '~/features/Event/eventApi.service';
import { useState } from 'react';
import { useDebounce } from '~/hooks/useDebounce';
import ChartParemeters from './components/ChartParameters/ChartParemeters';
import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import Input from '~/components/customs/Input';
import moment from 'moment';
import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Icon from '~/components/customs/Icon';

const TABS = [
  {
    label: 'Tất cả',
    value: '',
  },
  {
    label: 'Chờ duyệt',
    value: 'REVIEW',
  },
  {
    label: 'Sắp diễn ra',
    value: 'UPCOMING',
  },
  {
    label: 'Đang diễn ra',
    value: 'HAPPENING',
  },
  {
    label: 'Đã kết thúc',
    value: 'COMPLETED',
  },
  {
    label: 'Đã hủy',
    value: 'CANCELED',
  },
];

const EventManage = () => {
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>('');
  const { searchValue } = useDebounce(keyword, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<string>('');

  const event = useGetEventBusinessQuery({
    limit: limit,
    page: currentPage,
    search: searchValue,
    status: status,
  });

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const pageClassNames = {
    page: 'mx-1 px-3.5 py-1.5 text-cs_semi_green border text-sm hover:scale-105 transition-all rounded-lg shadow-border-full font-bold',
    active: 'bg-cs_semi_green text-white ',
    previous: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-lg shadow-border-full', // Thêm lớp CSS cho nút "Previous"
    next: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-lg shadow-border-full', // Thêm lớp CSS cho nút "Next"
  };

  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="mb-8 flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý sự kiện</h1>
        <Dropdown />
      </div>
      <Link
        to={'/organization/create-event/0'}
        className="flex w-fit items-center gap-2 rounded-lg bg-cs_semi_green px-4 py-2 font-semibold text-white"
      >
        <Icon name="add-circle" className="text-xl" />
        <button>Tạo sự kiện</button>
      </Link>
      <div className=" mt-5 flex flex-col gap-8">
        <div className="flex w-full items-start justify-start gap-5 rounded-2xl bg-white p-4 shadow-border-light dark:bg-[#3f3c3c]">
          <ManageEventParameters title={'Title 1'} count={1} border />
          <ManageEventParameters title={'Title 1'} count={1} border />
          <ManageEventParameters title={'Title 1'} count={1} border />
          <ManageEventParameters title={'Title 1'} count={1} />
        </div>

        {/* <div className="flex-1 rounded-2xl bg-white p-4 shadow-border-light dark:bg-[#3f3c3c] ">
          <ChartParemeters />
        </div> */}
      </div>
      <div className="mt-5  flex items-center justify-between gap-7">
        <Tabs value="" className="w-full max-w-[50rem] dark:bg-[#3f3c3c] ">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value} className="max-w-content py-2 text-sm" onClick={() => setStatus(value)}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      <div className="flex w-full items-center justify-between">
        <Input
          className="my-5 w-full max-w-[30rem]"
          classNameInput="w-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm sự kiện"
        />
        <div className="flex items-center justify-between gap-4">
          {event.data?.data?.docs?.length !== 0 && (
            <div className="my-4 flex justify-center">
              <ReactPaginate
                className="flex items-center"
                breakLabel="..."
                pageCount={event.data?.data?.totalPages}
                onPageChange={handlePageChange}
                previousLabel={<Icon className="px-2.5 pb-1 pt-2.5  text-sm" name="play-back-sharp" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Previous"
                nextLabel={<Icon className="px-2.5 pb-1 pt-2.5 text-sm" name="play-forward-sharp" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Next"
                previousClassName={pageClassNames.previous}
                nextClassName={pageClassNames.next}
                activeClassName={pageClassNames.active}
                pageClassName={pageClassNames.page}
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <select
              onChange={(e) => setLimit(Number(e.target.value))}
              className=" h-[30px] w-[50px] rounded-lg border border-cs_semi_green text-center shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`grid gap-7 ${event && event?.data?.data?.docs.length > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {event ? (
          event?.data?.data?.docs.length > 0 ? (
            event.data?.data?.docs?.map((event: any) => (
              <div className=" relative h-[16vw] overflow-hidden rounded-2xl" key={event?._id}>
                <img src={event?.banner[0]?.url} alt="" className="h-full w-full object-cover" />
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#000000c9] p-4 text-white">
                  <h1 className="text-xl font-bold">{event?.title}</h1>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium">
                      <IonIcon name="time-outline" className="-translate-y-[0.1rem] text-xl" />
                      <span className="w-[90%] dark:text-cs_light">
                        {moment(event.start_date).format('HH:mm')}&nbsp;
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <IonIcon name="calendar-outline" className="-translate-y-[0.1rem] text-xl" />
                      <span className="w-[90%] dark:text-cs_light">
                        {moment(event.start_date).format('dddd, DD MMMM YY')}&nbsp;
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <IonIcon name="location-outline" className="-translate-y-[0.1rem] text-xl" />
                      <span className="w-[90%] dark:text-cs_light">{event?.location?.name}&nbsp;</span>
                    </div>
                  </div>

                  <Link to={`/organization/manage-event/statistics/${event._id}`}>
                    <button className="absolute bottom-4 left-4 flex items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-cs_semi_green">
                      <span className="text-sm">Xem chi tiết</span>
                    </button>
                  </Link>
                  <span
                    className={`absolute right-4 top-4 rounded-full px-4 py-1 text-sm font-semibold text-white ${
                      event?.status === 'REVIEW'
                        ? 'bg-cs_blueGray'
                        : event?.status === 'UPCOMING'
                        ? 'bg-cs_yellow-500'
                        : event?.status === 'HAPPENING'
                        ? 'bg-cs_leaf-500'
                        : event?.status === 'COMPLETED'
                        ? 'bg-cs_green'
                        : 'bg-cs_red'
                    }`}
                  >
                    {event?.status === 'REVIEW'
                      ? 'Đang chờ duyệt'
                      : event?.status === 'UPCOMING'
                      ? 'Sắp diễn ra'
                      : event?.status === 'HAPPENING'
                      ? 'Đang diễn ra'
                      : event?.status === 'COMPLETED'
                      ? 'Đã kết thúc'
                      : 'Đã hủy'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full rounded-xl bg-white py-4  dark:bg-[#3f3c3c]">
              <div className="relative flex w-full justify-center">
                <div className="h-[10rem] w-[10rem] overflow-hidden">
                  <img
                    src="https://i.pinimg.com/originals/9c/6d/32/9c6d3237f5b994007cc513fafeb0cc07.gif"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-transparent">
                  <p className="text-lg font-semibold dark:text-white">Không có sự kiện nào</p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full rounded-xl bg-white p-4 dark:bg-[#3f3c3c]">
            <div className="relative flex w-full justify-center">
              <div className="h-[10rem] w-[10rem] overflow-hidden">
                <img
                  src="https://i.pinimg.com/originals/9c/6d/32/9c6d3237f5b994007cc513fafeb0cc07.gif"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white">
                <p className="text-lg font-semibold">Không có sự kiện nào</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default EventManage;
