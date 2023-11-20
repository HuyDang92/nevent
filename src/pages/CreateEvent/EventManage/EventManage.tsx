import Dropdown from "~/components/Dropdown";
import ManageEventParameters from "./components/ManageEventParameters/ManageEventParameters";
import { useGetEventBusinessQuery } from "~/features/Event/eventApi.service";
import { useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import ChartParemeters from "./components/ChartParameters/ChartParemeters";
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import Input from "~/components/customs/Input";
import moment from "moment";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Icon from "~/components/customs/Icon";

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
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý sự kiện</h1>
        <Dropdown />
      </div>
      <Link to={'/organization/create-event/0'} className="py-2 px-8 rounded-lg font-semibold bg-cs_semi_green text-white">
        <button>
          Tạo sự kiện
        </button>
      </Link>
      <div className=" mt-8 flex flex-col gap-8">
        <div className="bg-white dark:bg-[#3f3c3c] rounded-2xl shadow-border-light p-4 flex-1 flex flex-col gap-4">
          <h1 className="font-bold text-xl text-[#474747] dark:text-white">Sự kiện</h1>
          <ManageEventParameters dataEvent={event?.data?.data?.docs} />
        </div>
        <div className="bg-white dark:bg-[#3f3c3c] rounded-2xl shadow-border-light p-4 flex-1 ">
          <ChartParemeters />
        </div>
      </div>
      <div className="mt-7  flex justify-between items-center gap-7">
        <Tabs value=""
          className="w-full max-w-[50rem] dark:bg-[#3f3c3c] ">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value}
                className='text-sm py-2 max-w-content'
                onClick={() => setStatus(value)}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>

      </div>
      <div className="w-full flex justify-between items-center">
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
      <div className={`grid gap-7 mt-8 ${(event && event?.data?.data?.docs.length > 0) ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {
          event ? (
            event?.data?.data?.docs.length > 0 ? (
              event.data?.data?.docs?.map((event: any) => (
                <div className=" h-[16vw] rounded-2xl overflow-hidden relative" key={event?._id}>
                  <img src={event?.banner[0]?.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute text-white top-0 left-0 w-full h-full p-4 bg-gradient-to-r from-[#000000c9]">
                    <h1 className="font-bold text-xl">{event?.title}</h1>
                    <div className="flex flex-col gap-2 mt-4 text-sm">
                      <div className="flex items-center gap-2 font-medium">
                        <IonIcon name="time-outline" className="text-xl -translate-y-[0.1rem]" />
                        <span className="w-[90%] dark:text-cs_light">
                          {moment(event.start_date).format('HH:mm')}&nbsp;
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <IonIcon name="calendar-outline" className="text-xl -translate-y-[0.1rem]" />
                        <span className="w-[90%] dark:text-cs_light">
                          {moment(event.start_date).format('dddd, DD MMMM YY')}&nbsp;
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <IonIcon name="location-outline" className="text-xl -translate-y-[0.1rem]" />
                        <span className="w-[90%] dark:text-cs_light">
                          {event?.location?.name}&nbsp;
                        </span>
                      </div>
                    </div>

                    <Link to={`/organization/manage-event/statistics/${event._id}`}>
                      <button className="flex justify-center items-center py-2 px-4 rounded-lg bg-white text-cs_semi_green font-semibold absolute bottom-4 left-4">
                        <span className="text-sm">Xem chi tiết</span>
                      </button>
                    </Link>
                    <span className={`absolute top-4 right-4 text-sm font-semibold text-white py-1 px-4 rounded-full ${event?.status === 'REVIEW' ? 'bg-cs_blueGray' : event?.status === 'UPCOMING' ? 'bg-cs_yellow-500' : event?.status === 'HAPPENING' ? 'bg-cs_leaf-500' : event?.status === 'COMPLETED' ? 'bg-cs_green' : 'bg-cs_red'
                      }`}>
                      {
                        event?.status === 'REVIEW' ? 'Đang chờ duyệt' : event?.status === 'UPCOMING' ? 'Sắp diễn ra' : event?.status === 'HAPPENING' ? 'Đang diễn ra' : event?.status === 'COMPLETED' ? 'Đã kết thúc' : 'Đã hủy'
                      }
                    </span>
                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-[#3f3c3c] py-4 rounded-xl  w-full">
                <div className='w-full flex justify-center relative'>
                  <div className='w-[10rem] h-[10rem] overflow-hidden'>
                    <img src='https://i.pinimg.com/originals/9c/6d/32/9c6d3237f5b994007cc513fafeb0cc07.gif' className='w-full h-full object-cover' />
                  </div>
                  <div className='absolute left-1/2 -bottom-2 -translate-x-1/2 bg-white dark:bg-transparent'>
                    <p className='text-lg font-semibold dark:text-white'>Không có sự kiện nào</p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="bg-white dark:bg-[#3f3c3c] rounded-xl w-full p-4">
              <div className='w-full flex justify-center relative'>
                <div className='w-[10rem] h-[10rem] overflow-hidden'>
                  <img src='https://i.pinimg.com/originals/9c/6d/32/9c6d3237f5b994007cc513fafeb0cc07.gif' className='w-full h-full object-cover' />
                </div>
                <div className='absolute left-1/2 -bottom-2 -translate-x-1/2 bg-white'>
                  <p className='text-lg font-semibold'>Không có sự kiện nào</p>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </div >
  )
};
export default EventManage;