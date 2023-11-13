import Button from '~/components/customs/Button';
import SectionTitle from '~/components/SectionTitle';
import des from '~/assets/images/detail.png';
import des2 from '~/assets/images/detail2.png';
import Icon from '~/components/customs/Icon';
import BreadcrumbsComponent from '~/components/Breadcrumbs/Breadcrumbs';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { useAppDispatch } from '~/hooks/useActionRedux';
import { refreshPayment } from '~/features/Payment/paymentSlice';

function DetailEvent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const event = useGetAllEventQuery({ page: 1, limit: 9 });
  const { idEvent } = useParams();
  const detailEventQuery = useGetEventByIdQuery(idEvent ? idEvent : '');
  const eventTickets = useGetTicketByEventIdQuery(idEvent ? idEvent : '');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const handlePayment = (idEvent: string) => {
    dispatch(refreshPayment(idEvent));
    navigate(`/user/payment/${idEvent}/0`);
  };
  return (
    <div className="relative">
      {detailEventQuery.isFetching && <SkeletonDetailEvent />}
      {!detailEventQuery.isFetching && (
        <>
          <BreadcrumbsComponent baseLink="Trang chủ" linkBack="/" link={detailEventQuery?.data?.data?.title} />
          <div className="flex-row-reverse gap-4 xl:flex">
            <div className="mb-5 h-fit md:top-[80px] xl:sticky xl:block xl:w-[380px]">
              <div className="rounded-xl p-3 text-[14px] shadow-border-blur dark:border">
                <img
                  src={detailEventQuery?.data?.data?.banner[0]?.url}
                  alt="banner"
                  className="h-[160px] w-full rounded-xl object-cover sm:h-[300px] xl:h-[160px]"
                />
                <div className="space-y-3  p-1 pt-2 sm:px-28 xl:px-1">
                  <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light">
                    {detailEventQuery?.data?.data?.title}
                  </h1>
                  <div className="flex items-center gap-[15px]">
                    <Icon name="timer-outline" className="w-[10%] text-xl dark:text-cs_light" />
                    <span className="w-[90%] dark:text-cs_light">
                      {moment(detailEventQuery?.data?.data?.start_date).format('HH:mm - DD/MM/YYYY')}
                    </span>
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <Icon name="location-outline" className="w-[10%] text-xl dark:text-cs_light" />
                    <span className="w-[90%] dark:text-cs_light">
                      <span>{detailEventQuery?.data?.data?.location?.name}</span>
                    </span>
                  </div>
                  <div className="">
                    <span className="w-[90%] dark:text-cs_light">Giá vé:</span>
                    <div className="py-2">
                      <ul className="space-y-1 font-medium">
                        {eventTickets?.data?.data?.map((ticket: ITicket) => (
                          <li
                            key={ticket?._id}
                            style={{ backgroundColor: ticket?.color }}
                            className={`rounded-lg ${ticket?.color ? '' : 'bg-[#FF3232]'} p-2 text-cs_light`}
                          >
                            <span className="flex justify-between">
                              <span>{ticket?.title}:</span>
                              {ticket?.price === 0 ? 'Miễn phí' : <span>{ticket?.price.toLocaleString('vi')}đ</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    value="Đặt vé ngay"
                    mode="dark"
                    onClick={() => handlePayment(detailEventQuery?.data?.data?._id)}
                  />
                </div>
              </div>
            </div>
            <div className="xl:w-[78%]">
              <div className="hidden xl:block">
                <img
                  src={detailEventQuery?.data?.data?.banner[0]?.url}
                  alt=""
                  className="w-full rounded-xl object-cover sm:h-[320px] xl:h-[400px]"
                />
              </div>
              <div className="space-y-10 xl:py-5 ">
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
                          <span>{detailEventQuery?.data?.data?.location?.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* description  */}
                <div className="space-y-4 px-2 text-[14px] dark:text-cs_light sm:px-0  sm:text-[16px]">
                  <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">Mô tả</h1>
                  <div className=" leading-8">
                    <h3>
                      I. THÔNG TIN CHI TIẾT VỀ SỰ KIỆN "
                      <span className="font-semibold">{detailEventQuery?.data?.data?.title}</span>"
                    </h3>

                    {detailEventQuery?.data?.data?.desc}
                  </div>
                  <img src={des} alt="" className="w-full" />
                  <img src={des2} alt="" className="w-full" />
                </div>
                {/* Info bussiness */}
                <div className="space-y-4 rounded-xl p-4 shadow-border-blur dark:text-cs_light">
                  <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[20px]">
                    Thông tin nhà tổ chức
                  </h1>
                  <div className="sm:gap-4 flex">
                    <Link to="/" className="">
                      <img
                        src={detailEventQuery?.data?.data?.banner[0]?.url}
                        alt=""
                        className="h-[70px] w-[70px] sm:h-[120px] sm:w-[120px] rounded-lg object-cover"
                      />
                    </Link>
                    <div className="">
                      <h3 className="font-bold ">{detailEventQuery?.data?.data?.creator?.name}</h3>
                      <p className="line-clamp-5">{detailEventQuery?.data?.data?.creator?.description}</p>
                    </div>
                  </div>
                </div>
                <SectionTitle value="Sự kiện sắp diễn ra" />
                {event.isFetching && <SkeletonEventList />}

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 3xl:grid-cols-4">
                  {!event.isFetching &&
                    event.data?.data?.docs.map((item: IEvent, index: number) => (
                      <ProductCard key={index} data={item} index={index} />
                    ))}
                </div>
                <div className="my-4 flex justify-center pb-4">
                  <Button className="" value="Xem thêm" mode="dark" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailEvent;
