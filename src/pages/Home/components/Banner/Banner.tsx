import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '~/components/customs/Icon';
import moment from 'moment';
import View from '~/motion/View';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface IProps {
  data: any[];
}

const Banner: React.FC<IProps> = ({ data }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const [isShowBanner, setIsShowBanner] = React.useState(0);

  const wrapValue = (value: number, min: number, max: number) => {
    const range = max - min + 1;
    const offsetValue = (((value - min) % range) + range) % range;
    return offsetValue + min;
  };

  const imageIndex = wrapValue(page, 0, data?.length - 1);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);
  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % data.length;
    setCurrentImageIndex(newIndex);
    setPage([newIndex, 1]);
  };

  const goToPrevImage = () => {
    const newIndex = (currentImageIndex - 1 + data.length) % data.length;
    setCurrentImageIndex(newIndex);
    setPage([newIndex, -1]);
  };

  return (
    <View className="relative h-[180px] rounded-[15px] bg-white md:h-[300px] lg:mb-16 lg:h-[350px] xl:h-[60vh]">
      <AnimatePresence initial={false} custom={direction}>
        <View className=" absolute h-full w-full overflow-x-hidden rounded-xl ">
          <Link to={`/event-detail/${data[imageIndex]?.event?._id}`}>
            <View className="relative h-full w-full">
              <motion.img
                className=" h-full w-full cursor-pointer rounded-xl object-cover "
                key={page}
                src={`${data[imageIndex]?.event?.banner[0].url}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              />
              <View className="absolute left-0 top-0 hidden h-full w-full bg-gradient-to-r from-[#0000008f] p-8 text-white duration-150 lg:block ">
                <h1 className="max-w-[50rem] text-2xl font-bold">{data[imageIndex]?.event?.title}</h1>
                <p className="text-sm">{moment(data[imageIndex]?.event?.start_date).format('hh:mm - DD/MM/YYYY')}</p>
                <Link to={`/event-detail/${data[imageIndex]?.event?._id}`}>
                  <motion.button
                    className="mt-8 rounded-lg bg-[#ffffffa9] px-6 py-2 text-sm font-semibold text-[#242424]"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Xem chi tiết
                  </motion.button>
                </Link>
              </View>
            </View>
          </Link>
        </View>
      </AnimatePresence>
      <View className=" absolute bottom-0 right-0 z-10 hidden translate-y-[70%] lg:block xl:right-[30px]">
        <View className=" flex gap-[20px]">
          {data.map((item, index) => {
            return (
              <img
                className={`h-[100px] w-[200px] cursor-pointer rounded-[10px] object-cover shadow-border-full duration-100 hover:scale-105 ${
                  index === imageIndex ? 'border-[4px] border-cs_semi_green' : ''
                }`}
                key={index}
                onClick={() => {
                  // setIsShowBanner(index);
                  setCurrentImageIndex(index);
                  setPage([index, 0]);
                }}
                src={`${item.event.banner[0].url}`}
              />
            );
          })}
        </View>
      </View>
      <button onClick={goToPrevImage} className="cursor-pointer">
        <Icon
          name="chevron-back-outline"
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 bg-opacity-20 p-0.5 text-[1.5rem] text-cs_light transition-all hover:scale-110 hover:bg-opacity-30 sm:text-[2.3rem]"
        />
      </button>
      <button onClick={goToNextImage} className="cursor-pointer">
        <Icon
          name="chevron-forward-outline"
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 bg-opacity-20 p-0.5 text-[1.5rem] text-cs_light transition-all hover:scale-110 hover:bg-opacity-30 sm:text-[2.3rem]"
        />
      </button>
    </View>
  );
};

export default Banner;
