import IonIcon from '@reacticons/ionicons';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import View from '~/motion/View';

const data = [
  'https://images.pexels.com/photos/821225/pexels-photo-821225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/302123/pexels-photo-302123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/13169859/pexels-photo-13169859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6436385/pexels-photo-6436385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

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

const Banner = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const [isShowBanner, setIsShowBanner] = React.useState(0);

  const wrapValue = (value: number, min: number, max: number) => {
    const range = max - min + 1;
    const offsetValue = (((value - min) % range) + range) % range;
    return offsetValue + min;
  };

  const imageIndex = wrapValue(page, 0, data.length - 1);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <View className="relative h-[180px] rounded-[15px] bg-white md:h-[300px] lg:mb-16 lg:h-[350px] xl:h-[450px]">
      <AnimatePresence initial={false} custom={direction}>
        <View className=" absolute h-full w-full overflow-x-hidden rounded-xl ">
          <motion.img
            className=" h-full w-full cursor-move rounded-xl object-cover "
            key={page}
            src={`${data[imageIndex]}`}
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
        </View>
      </AnimatePresence>
      <View className=" absolute bottom-0 right-0 z-10 hidden translate-y-1/2 lg:block xl:right-[30px]">
        <View className=" flex gap-[20px]">
          {data.map((item, index) => {
            return (
              <img
                className={`h-[100px] w-[200px] cursor-pointer rounded-[10px] shadow-border-full duration-100 ${
                  index === imageIndex ? 'border-[4px] border-cs_semi_green' : ''
                }`}
                key={index}
                onClick={() => {
                  setIsShowBanner(index);
                  setPage([index, 0]);
                }}
                src={`${item}`}
              />
            );
          })}
        </View>
      </View>

      <View className="absolute right-[10px] top-[10px] z-10 flex items-center gap-[20px] lg:right-[30px] lg:top-[30px]">
        <motion.button
          className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-[#ffffff90]"
          whileTap={{ scale: 0.9 }}
        >
          <IonIcon name="help-circle-outline" className="text-2xl text-cs_semiborder-cs_semi_green" />
        </motion.button>
        {/* <motion.button className='bg-[#ffffff90] rounded-lg w-[40px] h-[40px] flex justify-center items-center'
                    whileTap={{ scale: 0.9 }}
                >
                    <IonIcon name='person-outline' className='text-2xl text-cs_semiborder-cs_semi_green' />
                </motion.button>
                <motion.button className='bg-[#ffffff90] rounded-lg w-[40px] h-[40px] flex justify-center items-center'
                    whileTap={{ scale: 0.9 }}
                >
                    <IonIcon name='map-outline' className='text-2xl text-cs_semiborder-cs_semi_green' />
                </motion.button> */}
      </View>
    </View>
  );
};

export default Banner;
