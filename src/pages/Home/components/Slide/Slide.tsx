import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import moment from 'moment';
import Icon from '~/components/customs/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Button from '~/components/customs/Button';

type Props = {
  data: IEvent[]; //dữ liệu
};
function Slide({ data }: Props) {
  const { width } = useCurrentViewportView();
  const [item, setItem] = useState<number>(1);
  useEffect(() => {
    if (width < 768) {
      setItem(1);
    } else if (width < 1024) {
      setItem(2);
    } else {
      setItem(3);
    }
  }, [width]);
  // useEffect(() => {
  //   const splitArray = [];
  //   if (width < 768) {
  //     for (let i = 0; i < data?.length; i += 2) {
  //       const subArray = data.slice(i, i + 2);
  //       splitArray.push(subArray);
  //     }
  //   } else if (width < 1024) {
  //     for (let i = 0; i < data?.length; i += 3) {
  //       const subArray = data.slice(i, i + 3);
  //       splitArray.push(subArray);
  //     }
  //   } else {
  //     for (let i = 0; i < data?.length; i += 5) {
  //       const subArray = data.slice(i, i + 5);
  //       splitArray.push(subArray);
  //     }
  //   }
  //   setFormatArray(splitArray);
  // }, [data]);
  return (
    <>
      <Swiper
        slidesPerView={item}
        spaceBetween={15}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((item: IEvent, index: number) => (
          <SwiperSlide key={index}>
            <Link key={index} to={`/event-detail/${item?._id}`}>
              <div className="group relative">
                <img
                  src={item?.banner[0]?.url}
                  alt="image 1"
                  className="h-[210px] w-full rounded-xl object-cover transition-all group-hover:scale-[98%]"
                />
                <div className="absolute bottom-0 left-0 right-0 top-0 rounded-xl bg-black bg-opacity-0 transition-all group-hover:scale-[98%] group-hover:bg-opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 top-0 hidden p-4 text-cs_light group-hover:block">
                  <h2 className="pb-3 font-bold">{item?.title}</h2>
                  <span className="text-sm font-medium">
                    {/* <Icon name="time-outline" /> */}
                    <span className="flex items-center gap-2">
                      <Icon name="time-outline" className="" />
                      <span> {moment(item?.start_date).format('hh:mm - DD/MM/YYYY')}</span>
                    </span>
                    <span className="text-sm ">
                      {item?.categories[0]?.name} - {item?.location?.name}
                    </span>
                  </span>
                  <div>
                    <Button className="mt-3" value="Xem chi tiết" mode="dark" />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Carousel
        className="h-[280px] overflow-hidden rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {formatArray.map((item: any, index: number) => (
          <div key={index} className="grid grid-cols-2 gap-4 overflow-hidden sm:grid-cols-3 xl:grid-cols-5">
            {item.map((item: IEvent, index: number) => (
              <Link key={index} to={`/event-detail/${item?._id}`}>
                <div className="group relative">
                  <img
                    src={item?.banner[0]?.url}
                    alt="image 1"
                    className="h-[280px] w-full rounded-xl object-cover transition-all group-hover:scale-[98%]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 top-0 rounded-xl bg-black bg-opacity-0 transition-all group-hover:scale-[98%] group-hover:bg-opacity-50"></div>
                  <div className="absolute bottom-0 left-0 right-0 top-0 hidden p-3 text-cs_light group-hover:block">
                    <h2 className="pb-3 font-bold">{item?.title}</h2>
                    <span className="text-sm font-medium">
                      <span className="flex items-center gap-2">
                        <Icon name="time-outline" className="" />
                        <span> {moment(item?.start_date).format('hh:mm - DD/MM/YYYY')}</span>
                      </span>
                      <span className="text-sm ">
                        {item?.categories[0]?.name} - {item?.location?.name}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </Carousel> */}
    </>
  );
}

export default Slide;
