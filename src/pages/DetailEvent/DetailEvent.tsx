import Button from '~/components/customs/Button';
import SectionTitle from '~/components/SectionTitle';
import avtDefault from '~/assets/images/default-avatar.jpg';
import Icon from '~/components/customs/Icon';
import BreadcrumbsComponent from '~/components/Breadcrumbs/Breadcrumbs';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '~/components/EventCard';
import {
  useGetEventByIdQuery,
  useGetAllEventQuery,
  useGetTicketByEventIdQuery,
} from '~/features/Event/eventApi.service';
import SkeletonEventList from '~/components/customs/Skeleton/SkeletonEventList';
import moment from 'moment';
import SkeletonDetailEvent from '~/components/customs/Skeleton/SkeletonDetailEvent';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { refreshPayment } from '~/features/Payment/paymentSlice';
import { Carousel, IconButton } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Zoom from '~/components/customs/Zoom';
import { setHistoryUrl } from '~/features/Auth/authSlice';

function DetailEvent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const history = useLocation();
  const auth = useAppSelector((state) => state.auth.currentUser);
  const event = useGetAllEventQuery({ page: 1, limit: 9, status: 'UPCOMING' });
  const { idEvent } = useParams();
  const detailEventQuery = useGetEventByIdQuery(idEvent ? idEvent : '');
  const eventTickets = useGetTicketByEventIdQuery(idEvent ? idEvent : '');

  useEffect(() => {
    dispatch(setHistoryUrl(history.pathname));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const handlePayment = (idEvent: string) => {
    if (!auth) {
      navigate('/login');
      return;
    }
    dispatch(refreshPayment(idEvent));
    navigate(`/user/payment/${idEvent}/0`);
  };

  return (
    <div className="">
      {detailEventQuery.isFetching && <SkeletonDetailEvent />}
      <BreadcrumbsComponent baseLink="Trang chủ" linkBack="/" link={detailEventQuery?.data?.data?.title} />
      {!detailEventQuery.isFetching && (
        <>
          <div className="flex-row-reverse gap-4 xl:flex ">
            <div className="mb-5 h-fit rounded-xl bg-cs_light p-3 text-[14px] shadow-border-blur dark:border dark:border-none dark:bg-cs_icon_black xl:sticky xl:top-20 xl:mb-0 xl:w-[350px]">
              <Swiper
                slidesPerView={1}
                spaceBetween={15}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {detailEventQuery?.data?.data?.banner?.map((image: any, index: number) => (
                  <SwiperSlide key={index} className={`h-[180px] w-full rounded-xl object-cover`}>
                    <Zoom>
                      <img src={image.url} alt="banner" className="h-[180px] w-full rounded-xl object-cover " />
                    </Zoom>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="space-y-3  p-1 pt-2 sm:px-28 xl:px-1">
                <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light">
                  {detailEventQuery?.data?.data?.title}
                </h1>
                {/* {detailEventQuery?.data?.data?.creator?.type === 'business' && (
                    <h1>Ban tổ chức: {detailEventQuery?.data?.data?.creator?.organization_name}</h1>
                  )} */}
                <div className="flex items-center gap-[15px]">
                  <Icon name="timer-outline" className="w-[10%] text-xl dark:text-cs_light" />
                  <span className="w-[90%] dark:text-cs_light">
                    {moment(detailEventQuery?.data?.data?.start_date).format('HH:mm - DD/MM/YYYY')}
                  </span>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Icon name="location-outline" className="w-[10%] text-xl dark:text-cs_light" />
                  <span className="w-[90%] dark:text-cs_light">
                    <span>
                      {detailEventQuery?.data?.data?.address} {detailEventQuery?.data?.data?.location?.name}
                    </span>
                  </span>
                </div>
                <div className="">
                  <span className="w-[90%] dark:text-cs_light">Giá vé:</span>
                  <div className="py-2">
                    <ul className="space-y-1 font-medium">
                      {eventTickets?.data?.data?.map((ticket: ITicket) => (
                        <li
                          key={ticket?._id}
                          style={{
                            backgroundColor: Number(ticket?.quantity) === Number(ticket.sold) ? '#ccc' : ticket?.color,
                          }}
                          className={`rounded-lg ${ticket?.color ? '' : 'bg-[#FF3232]'} p-2 text-cs_light`}
                        >
                          <span className="flex justify-between">
                            <span>
                              {ticket?.title}{' '}
                              {Number(ticket?.quantity) === Number(ticket.sold)
                                ? `(Hết vé)`
                                : `(còn ${Number(ticket?.quantity) - Number(ticket.sold)} vé)`}
                            </span>
                            {ticket?.price === 0 ? 'Miễn phí' : <span>{ticket?.price.toLocaleString('vi')}đ</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {auth?.role?.name === 'user' ? (
                  <Button
                    className="w-full"
                    value="Đặt vé ngay"
                    mode="dark"
                    onClick={() => handlePayment(detailEventQuery?.data?.data?._id)}
                  />
                ) : (
                  <>
                    {!auth ? (
                      <Button
                        className="w-full"
                        value="Đặt vé ngay"
                        mode="dark"
                        onClick={() => handlePayment(detailEventQuery?.data?.data?._id)}
                      />
                    ) : (
                      <span className="dark:text-cs_light">Dùng vai trò người dùng để có thể mua vé</span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="xl:w-[71%] 3xl:w-[77%]">
              <div className="hidden xl:block">
                <Carousel
                  className={` rounded-xl object-cover sm:h-[320px] xl:h-[410px]`}
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
                  {detailEventQuery?.data?.data?.banner?.map((image: any, index: number) => (
                    <img key={index} src={image.url} alt="banner" className="h-full w-full rounded-xl object-cover " />
                  ))}
                </Carousel>
              </div>
              <div className="space-y-10 overflow-hidden xl:py-5">
                <div className=" hidden flex-col justify-between text-[12px] md:text-[18px] xl:flex">
                  <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">
                    {detailEventQuery?.data?.data?.title}
                  </h1>
                  <div className="mt-[10px] flex  gap-[10px] md:gap-[20px] ">
                    <div className="h-[70px] w-[120px] overflow-hidden rounded-[5px] shadow-border-full dark:border md:h-[120px] md:w-[115px]">
                      <div className="grid h-[10px] place-content-center bg-cs_semi_green py-2 text-[8px] text-cs_light md:h-[35px] md:text-[15px]">
                        Tháng {moment(detailEventQuery?.data?.data?.start_date).format('MM')}
                      </div>
                      <div className="flex h-[60px] flex-col items-center justify-center md:h-[85px]">
                        <span className="text-xl font-bold dark:text-cs_light md:mb-2 md:text-[40px]">
                          {moment(detailEventQuery?.data?.data?.start_date).format('DD')}
                        </span>
                        <span className="text-[8px] dark:text-cs_light md:text-[14px]">
                          {moment(detailEventQuery?.data?.data?.start_date).format('dddd')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-[15px]">
                        <Icon name="timer-outline" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
                        <span className="w-[90%] dark:text-cs_light">
                          {moment(detailEventQuery?.data?.data?.start_date).format('HH:mm - DD/MM/YYYY')}&nbsp;
                          {/* <span className="text-[#ff0000] "> (07:00 PM - 11:00 PM)</span> */}
                        </span>
                      </div>
                      <div className="flex items-center gap-[15px]">
                        <Icon name="location-outline" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
                        <span className="w-[90%] dark:text-cs_light">
                          <span>
                            {detailEventQuery?.data?.data?.address} {detailEventQuery?.data?.data?.location?.name}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* description  */}
                <div className="space-y-4 px-2 text-[14px] dark:text-cs_light sm:px-0  sm:text-[16px]">
                  <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">Mô tả</h1>
                  <div dangerouslySetInnerHTML={{ __html: detailEventQuery?.data?.data?.desc }} />
                </div>
                <div className="space-y-4 rounded-xl p-4 shadow-border-blur dark:text-cs_light">
                  <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[20px]">
                    Thông tin nhà tổ chức
                  </h1>
                  <div className="flex gap-4 ">
                    <div className='space-y-2'>
                      <Zoom>
                        <img
                          src={detailEventQuery?.data?.data?.creator?.avatar?.url ?? avtDefault}
                          alt=""
                          className="h-[90px] w-[90px] rounded-lg object-cover sm:h-[120px] sm:w-[120px]"
                        />
                      </Zoom>
                      <span className="text-center text-cs_semi_green font-semibold p-1 hover:bg-[#eee] cursor-pointer rounded-lg ">Liên hệ</span>
                    </div>
                    <div className="w-[70%] sm:w-[80%]">
                      <h3 className="font-bold ">{detailEventQuery?.data?.data?.creator?.organization_name}</h3>
                      <p className="line-clamp-4 text-xs sm:line-clamp-none sm:text-[16px] ">
                        {detailEventQuery?.data?.data?.creator?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <SectionTitle value="Sự kiện dành cho bạn" />
                {event.isFetching && <SkeletonEventList />}

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 3xl:grid-cols-4">
                  {!event.isFetching &&
                    event.data?.data?.docs.map((item: IEvent, index: number) => (
                      <ProductCard key={index} data={item} index={index} />
                    ))}
                </div>
                <Link to="/event-categories" className="my-4 flex justify-center pb-4">
                  <Button className="" value="Xem thêm" mode="dark" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailEvent;
