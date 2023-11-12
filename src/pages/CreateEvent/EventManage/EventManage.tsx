import { Link } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import { Icon as Iconfy } from '@iconify/react';
import RecommendCard from '~/components/customs/RecommendCard';
import SearchBar from '~/components/customs/SearchBar';
import moment from 'moment';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import ReactPaginate from 'react-paginate';
import { useGetEventBusinessQuery } from '~/features/Event/eventApi.service';
import { useState } from 'react';
const EventManage = () => {
  const [limit, setLimit] = useState<number>(5);
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventList = [
    {
      _id: '652cd125fc13ae657b6c7cdf',
      title: 'ÅÍÎÏ˝ÓÔÒÚÆ☃',
      start_date: '2022-08-11T00:00:00.000Z',
      location: 'PO Box 62967',
      categories: [
        {
          _id: '652ccfbc9341999a095b76b5',
          name: 'Âm nhạc',
          image: '652ccf9c9341999a095b76b3',
          createdAt: '2023-10-16T05:53:00.698Z',
          updatedAt: '2023-10-16T05:53:00.698Z',
          __v: 0,
        },
      ],
      banner: [
        {
          _id: '652cd4a7911b66e0c85f305a',
          url: 'https://img.freepik.com/free-photo/man-neon-suit-sits-chair-with-neon-sign-that-says-word-it_188544-27011.jpg?w=1060&t=st=1699185891~exp=1699186491~hmac=a732ea8c66b43b7cc68fffe22e13992be7adef9ddbb178e9fd1b5648d68d8a78',
          secureUrl: 'https://res.cloudinary.com/dtvqj8h4b/image/upload/v1697436836/Nevents/nevent-1697436837783.png',
          publicId: 'Nevents/nevent-1697436837783',
          width: 54,
          height: 54,
          format: 'png',
          type: 'image',
          createdAt: '2023-10-16T06:13:59.316Z',
          updatedAt: '2023-10-16T06:13:59.316Z',
          __v: 0,
        },
      ],
      desc: 'Bypass Upper Esophagus to Jejunum, Open Approach',
      status: 'UPCOMING',
      approve: false,
      hot: false,
      hotLevel: 1,
      updatedAt: '2023-10-16T08:27:36.488Z',
    },
    {
      _id: '652cd125fc13ae657b6c7cdf',
      title: 'ÅÍÎÏ˝ÓÔÒÚÆ☃',
      start_date: '2022-08-11T00:00:00.000Z',
      location: 'PO Box 62967',
      categories: [
        {
          _id: '652ccfbc9341999a095b76b5',
          name: 'Âm nhạc',
          image: '652ccf9c9341999a095b76b3',
          createdAt: '2023-10-16T05:53:00.698Z',
          updatedAt: '2023-10-16T05:53:00.698Z',
          __v: 0,
        },
      ],
      banner: [
        {
          _id: '652cd4a7911b66e0c85f305a',
          url: 'https://img.freepik.com/free-photo/man-neon-suit-sits-chair-with-neon-sign-that-says-word-it_188544-27011.jpg?w=1060&t=st=1699185891~exp=1699186491~hmac=a732ea8c66b43b7cc68fffe22e13992be7adef9ddbb178e9fd1b5648d68d8a78',
          secureUrl: 'https://res.cloudinary.com/dtvqj8h4b/image/upload/v1697436836/Nevents/nevent-1697436837783.png',
          publicId: 'Nevents/nevent-1697436837783',
          width: 54,
          height: 54,
          format: 'png',
          type: 'image',
          createdAt: '2023-10-16T06:13:59.316Z',
          updatedAt: '2023-10-16T06:13:59.316Z',
          __v: 0,
        },
      ],
      desc: 'Bypass Upper Esophagus to Jejunum, Open Approach',
      status: 'UPCOMING',
      approve: false,
      hot: false,
      hotLevel: 1,
      updatedAt: '2023-10-16T08:27:36.488Z',
    },
  ];
  const event = useGetEventBusinessQuery({
    limit: limit,
    page: currentPage,
    search: keyword,
  });
  console.log(event);
  
  const pageClassNames = {
    page: 'mx-2 px-4 py-1.5 text-cs_semi_green border text-xl hover:scale-105 transition-all rounded-xl shadow-border-full font-bold',
    active: 'bg-cs_semi_green text-white',
    previous: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-xl shadow-border-full', // Thêm lớp CSS cho nút "Previous"
    next: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-xl shadow-border-full', // Thêm lớp CSS cho nút "Next"
  };
  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Quản lý sự kiện</h1>
          <Dropdown />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="w-[72%]">
            <Link to="/organization/create-event/0" className="">
              <Button type="button" className="mt-3 !bg-cs_semi_green  font-semibold text-white" value="Tạo sự kiện" />
            </Link>
            <br />
            <SearchBar className="mt-4 w-full" classNameInput=" !rounded-full shadow-border-light" />
           <div>
              <div>
                {/* Phân trang */}
                {event.data?.data?.docs?.length !== 0 && (
                  <div className="my-4 flex justify-center">
                    <ReactPaginate
                      className="flex items-center"
                      breakLabel="..."
                      pageCount={event.data?.data?.totalPages}
                      onPageChange={handlePageChange}
                      previousLabel={<Icon className="px-2.5 pb-1 pt-2.5  text-xl" name="chevron-back-outline" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Previous"
                      nextLabel={<Icon className="px-2.5 pb-1 pt-2.5 text-xl" name="chevron-forward-outline" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Next"
                      previousClassName={pageClassNames.previous}
                      nextClassName={pageClassNames.next}
                      activeClassName={pageClassNames.active}
                      pageClassName={pageClassNames.page}
                    />
                  </div>
                )}
                <div>
                  <span>Hiện thị trên mỗi trang: </span>
                  <Input value="10" type="number" />
                </div>
              </div>
              <div className="mt-8">
                {!eventList && (
                  <p className="text-center font-semibold text-cs_gray underline">Bạn chưa có sự kiện nào!</p>
                )}
                {eventList &&
                  eventList.map((event) => (
                    <div className="my-4 rounded-xl border-[1px] border-cs_semi_green p-7" key={event._id}>
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex gap-4">
                          <img className="h-[110px] w-[110px] object-cover" src={event.banner[0].url} alt="" />
                          <div className="text-[14px] text-cs_grayText dark:text-cs_light">
                            <h1 className="text-lg font-bold text-cs_dark dark:text-cs_light">{event.title}</h1>
                            <div className="flex items-center gap-[15px]">
                              <Iconfy
                                icon="ph:timer-bold"
                                className="w-[10%] text-[15px] dark:text-cs_light md:text-xl"
                              />
                              <span className="w-[90%] dark:text-cs_light">18:00</span>
                            </div>
                            <div className="flex items-center gap-[15px]">
                              <Iconfy
                                icon="solar:calendar-bold"
                                className="w-[10%] text-[15px] dark:text-cs_light md:text-xl"
                              />
                              <span className="w-[90%] dark:text-cs_light">
                                {moment(event.start_date).format('dddd, DD MMMM YY')}&nbsp;
                              </span>
                            </div>
                            <div className="flex items-center gap-[15px]">
                              <Iconfy
                                icon="carbon:location-filled"
                                className="w-[10%] text-[15px] dark:text-cs_light md:text-xl"
                              />
                              <span className="w-[90%] dark:text-cs_light">
                                <span>{event.location}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button mode="dark" value={<Iconfy className="text-2xl" icon="formkit:people" />} />
                      </div>
                      <div className="flex items-center justify-between bg-cs_semi_green p-4">
                        <Link
                          to={`/organization/manage-event/statistics/${event._id}`}
                          className="flex items-center gap-2 text-cs_light"
                        >
                          <Iconfy icon="mdi:chart-line" /> <span>Thống kê</span>
                        </Link>
                        <div className="flex items-center text-cs_light">
                          <Link
                            to={`/organization/manage-event/rsvps/${event._id}`}
                            className="flex items-center gap-2 text-cs_light"
                          >
                            <Iconfy icon="material-symbols:person-outline" />
                            <span>Quản lý RSVPs</span>
                          </Link>
                        </div>
                        <div className="flex items-center text-cs_light">
                          <Link
                            to={`/organization/manage-event/pr/${event._id}`}
                            className="flex items-center gap-2 text-cs_light"
                          >
                            <Iconfy icon="mdi:bell" />
                            <span>Quảng bá</span>
                          </Link>
                        </div>
                        <div className="flex items-center text-cs_light">
                          <Link
                            to={`/organization/manage-event/discount/${event._id}`}
                            className="flex items-center gap-2 text-cs_light"
                          >
                            <Iconfy icon="solar:card-broken" />
                            <span>Mã giảm giá</span>
                          </Link>
                        </div>
                        <div className="flex items-center text-cs_light">
                          <Link
                            to={`/organization/manage-event/edit/${event._id}`}
                            className="flex items-center gap-2 text-cs_light"
                          >
                            <Iconfy icon="bxs:message-square-edit" />
                            <span>Chỉnh sửa</span>
                          </Link>
                        </div>
                        <div className="flex items-center text-cs_light">
                          <Link
                            to={`/organization/manage-event/copy/${event._id}`}
                            className="flex items-center gap-2 text-cs_light"
                          >
                            <Iconfy icon="mingcute:copy-fill" />
                            <span>Nhân rộng</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
           </div>
          </div>
          <div className="flex w-[25%] flex-col gap-10">
            <RecommendCard title="Gói đề xuất sự kiện" sale="30" price={9000000} theme_color="green" />
            <RecommendCard title="Gói tiêu diệt đối thủ" sale="80" price={12000000} theme_color="yellow" />
          </div>
        </div>
      </div>
    </>
  );
};
export default EventManage;
