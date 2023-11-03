import Button from '~/components/customs/Button';
import SectionTitle from '~/components/SectionTitle';
import des from '~/assets/images/detail.png';
import des2 from '~/assets/images/detail2.png';
import Icon from '~/components/customs/Icon';
import BreadcrumbsComponent from '~/components/Breadcrumbs/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '~/components/EventCard';
import { useGetEventByIdQuery, useGetAllEventQuery } from '~/features/Event/eventApi.service';
import SkeletonEventList from '~/components/customs/Skeleton/SkeletonEventList';
import moment from 'moment';
import SkeletonDetailEvent from '~/components/customs/Skeleton/SkeletonDetailEvent';
import { useEffect } from 'react';

function DetailEvent() {
  const event = useGetAllEventQuery({ page: 1, limit: 9 });
  const { idEvent } = useParams();
  const detailEventQuery = useGetEventByIdQuery(idEvent ? idEvent : '');
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
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
                      <span>{detailEventQuery?.data?.data?.location}</span>
                    </span>
                  </div>
                  <div className="">
                    <span className="w-[90%] dark:text-cs_light">Giá vé:</span>
                    <div className="py-2">
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="rounded-lg  bg-[#FF3232] p-2 text-cs_light">
                          <span className="">VIP: 3.800.000 VNĐ</span>
                        </li>
                        <li className="rounded-lg bg-[#FF6F32] p-2 text-cs_light">
                          <span className="">VIP: 3.800.000 VNĐ</span>
                        </li>
                        <li className="rounded-lg bg-[#D7C524] p-2 text-cs_light">
                          <span className="">VIP: 3.800.000 VNĐ</span>
                        </li>
                        <li className="rounded-lg bg-[#3FD827] p-2 text-cs_light">
                          <span className="">VIP: 3.800.000 VNĐ</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link to={`/user/payment/${detailEventQuery?.data?.data?._id}/0`}>
                    <Button className="w-full" value="Đặt vé ngay" mode="dark" />
                  </Link>
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
                  <div className="mt-[10px] flex items-center gap-[10px] md:gap-[20px] ">
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
                          <span>{detailEventQuery?.data?.data?.location}</span>
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
                  <div className="gap-4 sm:flex">
                    <Link to="/" className="w-1/4">
                      <img
                        src={detailEventQuery?.data?.data?.banner[0]?.url}
                        alt=""
                        className="h-[250px] w-full rounded-lg object-cover sm:h-[150px]"
                      />
                    </Link>
                    <div className="w-3/4 pt-3 sm:pt-0">
                      <h3 className="font-bold ">BOM ENTERTAINMENT</h3>
                      <p className="line-clamp-5">
                        Được thành lập từ năm 2016, Công ty TNHH Bôm Hà Nội là công ty đa ngành nghề với các lĩnh vực
                        như xây dựng; đầu tư, cho thuê bất động sản; xuất nhập khẩu các sản phẩm y tế;…Năm 2022, BÔM Hà
                        Nội phát triển lĩnh vực hoạt động nghệ thuật giải trí với tên gọi BOM Entertainment - mục đích
                        là cầu nối, kết nối, quảng bá văn hóa Hàn Quốc đến khán giả Việt Nam rộng rãi hơn nữa. BOM
                        Entertainment có mối quan hệ thân thiết với các công ty giải trí hàng đầu tại Hàn Quốc. Vào
                        21/10/2023 tại Trung tâm Hội nghị Adora Center, 431 Hoàng Văn Thụ, Phường 4, Quận Tân Bình,
                        TP.Hồ Chí Minh, BOM Entertainment là đơn vị tổ chức chương trình Lee Jong Suk 2023 Fanmeeting
                        tour – “Dear.My with” trong Fanmeeting tour của diễn viên Lee Jong Suk.
                      </p>
                    </div>
                  </div>
                </div>
                <SectionTitle value="Sự kiện sắp diễn ra" />
                {event.isFetching && <SkeletonEventList />}

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 3xl:grid-cols-4">
                  {!event.isFetching &&
                    event.data?.data?.docs.map((item: IEvent, index: number) => (
                      <Link to={'/'} key={index}>
                        <ProductCard data={item} index={index} />
                      </Link>
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
