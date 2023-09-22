import IonIcon from '@reacticons/ionicons'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import View from '~/motion/View'

const data = [
    'https://images.pexels.com/photos/821225/pexels-photo-821225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/302123/pexels-photo-302123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/13169859/pexels-photo-13169859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6436385/pexels-photo-6436385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


const Banner = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const [isShowBanner, setIsShowBanner] = React.useState(0)

    const wrapValue = (value: number, min: number, max: number) => {
        const range = max - min + 1;
        const offsetValue = ((value - min) % range + range) % range;
        return offsetValue + min;
    };

    const imageIndex = wrapValue(page, 0, data.length - 1);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1)
        }, 5000);
        return () => clearInterval(interval);
    }, [page]);

    return (
        <View className='bg-white lg:h-[400px] xl:h-[600px] h-[200px] md:h-[300px] rounded-[15px] relative lg:mb-16'>
            <AnimatePresence initial={false} custom={direction}>
                <View className=' w-full absolute h-full overflow-x-hidden rounded-xl '>
                    <motion.img
                        className=' object-cover w-full h-full cursor-move rounded-xl '
                        key={page}
                        src={`${data[imageIndex]}`}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
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
            <View className=' hidden lg:block absolute z-10 bottom-0 translate-y-1/2 xl:right-[30px] right-0'>
                <View className=" flex gap-[20px]">
                    {
                        data.map((item, index) => {
                            return (
                                <img
                                    className={`cursor-pointer w-[200px] shadow-border-full h-[100px] rounded-[10px] duration-100 ${index === imageIndex ? 'border-[4px] border-cs_purple' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        setIsShowBanner(index)
                                        setPage([index, 0])
                                    }}
                                    src={`${item}`}
                                />
                            )
                        })
                    }
                </View>
            </View>

            <View className='absolute top-[10px] right-[10px] z-10 lg:top-[30px] lg:right-[30px] flex items-center gap-[20px]'>
                <motion.button className='bg-[#ffffff90] rounded-lg w-[40px] h-[40px] flex justify-center items-center'
                    whileTap={{ scale: 0.9 }}
                >
                    <IonIcon name='help-circle-outline' className='text-2xl text-cs_purple' />
                </motion.button>
                <motion.button className='bg-[#ffffff90] rounded-lg w-[40px] h-[40px] flex justify-center items-center'
                    whileTap={{ scale: 0.9 }}
                >
                    <IonIcon name='person-outline' className='text-2xl text-cs_purple' />
                </motion.button>
                <motion.button className='bg-[#ffffff90] rounded-lg w-[40px] h-[40px] flex justify-center items-center'
                    whileTap={{ scale: 0.9 }}
                >
                    <IonIcon name='map-outline' className='text-2xl text-cs_purple' />
                </motion.button>
            </View>
        </View >
    )
}

export default Banner