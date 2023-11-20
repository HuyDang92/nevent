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

  console.log(event?.data?.data?.docs);


  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý sự kiện</h1>
        <Dropdown />
      </div>
      <div className=" mt-8 flex flex-col gap-8">
        <div className="bg-white rounded-2xl shadow-border-light p-4 flex-1 flex flex-col gap-4">
          <h1 className="font-bold text-xl text-[#474747]">Sự kiện</h1>
          <ManageEventParameters dataEvent={event?.data?.data?.docs} />
        </div>
        <div className="bg-white rounded-2xl shadow-border-light p-4 flex-1 ">
          <ChartParemeters />
        </div>
      </div>
      <div className="mt-7 bg-white flex justify-between items-center gap-7">
        <Tabs value=""
          className="w-full max-w-[50rem]">
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
              <div className="bg-white w-full">
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
          ) : (
            <div className="bg-white w-full">
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







































  // const [limit, setLimit] = useState<number>(5);
  // const [keyword, setKeyword] = useState<string>('');
  // const {searchValue} = useDebounce(keyword, 500);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const auth = useAppSelector((state) => state.auth);
  // const event = useGetEventBusinessQuery({
  //   limit: limit,
  //   page: currentPage,
  //   search: searchValue,
  // });
  // console.log(event);
  // const pageClassNames = {
  //   page: 'mx-1 px-3.5 py-1.5 text-cs_semi_green border text-sm hover:scale-105 transition-all rounded-lg shadow-border-full font-bold',
  //   active: 'bg-cs_semi_green text-white ',
  //   previous: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-lg shadow-border-full', // Thêm lớp CSS cho nút "Previous"
  //   next: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-lg shadow-border-full', // Thêm lớp CSS cho nút "Next"
  // };

  // const handlePageChange = (selectedPage: any) => {
  // setCurrentPage(selectedPage.selected + 1);
  // window.scrollTo({
  //   top: 0,
  //   behavior: 'smooth',
  // });
  // };
  // const renderStatus = (status: string) => {
  //   switch (status) {
  //     // create cases for  REVIEW, UPCOMING, HAPPENING, COMPLETED, CANCELED
  //     case 'REVIEW':
  //       return (
  //         <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_blueGray px-3 py-1 text-cs_light">
  //           Đang chờ phê duyệt
  //         </div>
  //       );
  //     case 'UPCOMING':
  //       return (
  //         <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_yellow-500 px-3 py-1 text-cs_light">
  //           Sắp diễn ra
  //         </div>
  //       );
  //     case 'HAPPENING':
  //       return (
  //         <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_leaf-500 px-3 py-1 text-cs_light">
  //           Đang diễn ra
  //         </div>
  //       );
  //     case 'COMPLETED':
  //       return (
  //         <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_green px-3 py-1 text-cs_light">
  //           Đã hoàn thành
  //         </div>
  //       );
  //     case 'CANCELED':
  //       return (
  //         <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_red px-3 py-1 text-cs_light">
  //           Đã hủy
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="mb-2 flex w-fit items-center justify-center rounded-md bg-cs_light px-3 py-1 text-cs_light">
  //           Đang chờ phê duyệt
  //         </div>
  //       );
  //   }
  // };
  // console.log(event.data?.data);





































  //   return (
  //     <>
  //       <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
  //         <div className="flex justify-between">
  //           <h1 className="text-2xl font-bold dark:text-white">Quản lý sự kiện</h1>
  //           <Dropdown />
  //         </div>
  //         <div className="mt-2 flex justify-between">
  //           <div className="w-[72%]">
  //             <Link to="/organization/create-event/0" className="">
  //               <Button
  //                 type="button"
  //                 icon="add-circle-outline"
  //                 className="mt-3 !bg-cs_semi_green  font-semibold text-white"
  //                 value="Tạo sự kiện"
  //               />
  //             </Link>
  //             <br />
  //             <Input
  //               className="my-5 w-full"
  //               classNameInput="w-full"
  //               value={keyword}
  //               onChange={(e) => setKeyword(e.target.value)}
  //               placeholder="Tìm kiếm sự kiện"
  //             />
  //             {event.isLoading && <LoadingLocal />}
  //             {!event.isLoading && event.data?.data?.docs?.length !== 0 && (
  //               <div>
  //                 {/* Danh sách sự kiện */}
  //                 <div className="mt-8 rounded-xl border-[1px] border-cs_semi_green ">
  //                   {event.data?.data?.docs?.map((event: IEvent) => (
  //                     <div className="p-2" key={event._id}>
  //                       <div className="relative overflow-hidden rounded-xl">
  //                         {event.banner.length > 0 && (
  //                           <img className="h-[250px] w-full object-cover" src={event.banner[0].url} alt="" />
  //                         )}
  //                         <div className="absolute top-0 z-10 h-full w-full bg-black opacity-30"></div>
  //                         <div className="absolute top-0 z-20 px-6 py-4 text-[14px] text-cs_light">
  //                           <h1 className="mb-4 text-2xl font-bold">{event.title}</h1>
  //                           {renderStatus(event?.status)}

  //                           <div className="my-1 flex items-center gap-[15px]">
  //                             <Iconfy
  //                               icon="ph:timer-bold"
  //                               className="w-[10%] text-[15px] dark:text-cs_light md:text-xl"
  //                             />
  //                             <span className="w-[90%] dark:text-cs_light">18:00</span>
  //                           </div>
  //                           <div className="my-1 flex items-center gap-[15px]">
  //                             <Iconfy
  //                               icon="solar:calendar-bold"
  //                               className="w-[10%] text-[15px] dark:text-cs_light md:text-xl"
  //                             />
  //                             <span className="w-[90%] dark:text-cs_light">
  //                               {moment(event.start_date).format('dddd, DD MMMM YY')}&nbsp;
  //                             </span>
  //                           </div>
  //                           <div className="my-1 flex items-center gap-[15px]">
  //                             <Iconfy
  //                               icon="carbon:location-filled"
  //                               className="w-[10%] text-[15px] dark:text-cs_light md:text-xl"
  //                             />
  //                             <span className="w-[90%] dark:text-cs_light">
  //                               <span>{event?.location?.name}</span>
  //                             </span>
  //                           </div>
  //                         </div>
  //                         <Button
  //                           mode="dark"
  //                           className="absolute right-[10px] top-[10px] z-20"
  //                           value={<Iconfy className="text-2xl" icon="formkit:people" />}
  //                         />
  //                         <Link
  //                           className="absolute bottom-[10px] right-[10px] z-20"
  //                           to={`/organization/manage-event/statistics/${event._id}`}
  //                         >
  //                           <Button value="Chi tiết"></Button>
  //                         </Link>
  //                       </div>
  //                       {/* <div className="flex items-center justify-between bg-cs_semi_green p-4">
  //                         <Link
  //                           to={`/organization/manage-event/statistics/${event._id}`}
  //                           className="flex items-center gap-2 text-cs_light"
  //                         >
  //                           <Iconfy icon="mdi:chart-line" /> <span>Thống kê</span>
  //                         </Link>
  //                         <div className="flex items-center text-cs_light">
  //                           <Link
  //                             to={`/organization/manage-event/rsvps/${event._id}`}
  //                             className="flex items-center gap-2 text-cs_light"
  //                           >
  //                             <Iconfy icon="material-symbols:person-outline" />
  //                             <span>Quản lý RSVPs</span>
  //                           </Link>
  //                         </div>
  //                         <div className="flex items-center text-cs_light">
  //                           <Link
  //                             to={`/organization/manage-event/pr/${event._id}`}
  //                             className="flex items-center gap-2 text-cs_light"
  //                           >
  //                             <Iconfy icon="mdi:bell" />
  //                             <span>Quảng bá</span>
  //                           </Link>
  //                         </div>
  //                         <div className="flex items-center text-cs_light">
  //                           <Link
  //                             to={`/organization/manage-event/discount/${event._id}`}
  //                             className="flex items-center gap-2 text-cs_light"
  //                           >
  //                             <Iconfy icon="solar:card-broken" />
  //                             <span>Mã giảm giá</span>
  //                           </Link>
  //                         </div>
  //                         <div className="flex items-center text-cs_light">
  //                           <Link
  //                             to={`/organization/manage-event/edit/${event._id}`}
  //                             className="flex items-center gap-2 text-cs_light"
  //                           >
  //                             <Iconfy icon="bxs:message-square-edit" />
  //                             <span>Chỉnh sửa</span>
  //                           </Link>
  //                         </div>
  //                         <div className="flex items-center text-cs_light">
  //                           <Link
  //                             to={`/organization/manage-event/copy/${event._id}`}
  //                             className="flex items-center gap-2 text-cs_light"
  //                           >
  //                             <Iconfy icon="mingcute:copy-fill" />
  //                             <span>Nhân rộng</span>
  //                           </Link>
  //                         </div>
  //                       </div> */}
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             )}
  //             {/* Phân trang */}
  //             <div className="flex items-center justify-between">
  //               {event.data?.data?.docs?.length !== 0 && (
  //                 <div className="my-4 flex justify-center">
  //                   <ReactPaginate
  //                     className="flex items-center"
  //                     breakLabel="..."
  //                     pageCount={event.data?.data?.totalPages}
  //                     onPageChange={handlePageChange}
  //                     previousLabel={<Icon className="px-2.5 pb-1 pt-2.5  text-sm" name="play-back-sharp" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Previous"
  //                     nextLabel={<Icon className="px-2.5 pb-1 pt-2.5 text-sm" name="play-forward-sharp" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Next"
  //                     previousClassName={pageClassNames.previous}
  //                     nextClassName={pageClassNames.next}
  //                     activeClassName={pageClassNames.active}
  //                     pageClassName={pageClassNames.page}
  //                   />
  //                 </div>
  //               )}
  //               <div className="flex items-center gap-3">
  //                 <span className="dark:text-cs_light">Hiện thị trên mỗi trang: </span>
  //                 <select
  //                   onChange={(e) => setLimit(Number(e.target.value))}
  //                   className=" h-[30px] w-[50px] rounded-xl text-center shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
  //                 >
  //                   <option value="5">5</option>
  //                   <option value="10">10</option>
  //                   <option value="15">15</option>
  //                 </select>
  //               </div>
  //             </div>
  //             {event.data?.data?.docs?.length === 0 && (
  //               <p className="text-center font-semibold text-cs_gray underline">Không tìm thấy sự kiện nào!</p>
  //             )}
  //           </div>
  //           <div className="flex w-[25%] flex-col gap-10">
  //             <RecommendCard title="Gói đề xuất sự kiện" sale="30" price={9000000} theme_color="green" />
  //             <RecommendCard title="Gói tiêu diệt đối thủ" sale="80" price={12000000} theme_color="yellow" />
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
};
export default EventManage;
