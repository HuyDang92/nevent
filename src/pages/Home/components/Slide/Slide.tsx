import { Carousel } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCurrentViewportView } from '~/hooks/useViewPort';
type Props = {
  data: IEvent[]; //dữ liệu
};
function Slide({ data }: Props) {
  const [formatArray, setFormatArray] = useState<any>([]);
  const { width } = useCurrentViewportView();

  useEffect(() => {
    const splitArray = [];
    if (width < 768) {
      for (let i = 0; i < data.length; i += 2) {
        const subArray = data.slice(i, i + 2);
        splitArray.push(subArray);
      }
    } else if (width < 1024) {
      for (let i = 0; i < data.length; i += 3) {
        const subArray = data.slice(i, i + 3);
        splitArray.push(subArray);
      }
    } else {
      for (let i = 0; i < data.length; i += 5) {
        const subArray = data.slice(i, i + 5);
        splitArray.push(subArray);
      }
    }
    setFormatArray(splitArray);
  }, [data]);
  return (
    <>
      {/* <motion.div className="cursor-grab overflow-hidden ">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -200 }}
          className="flex w-[80vw] translate-x-5 gap-2 sm:gap-5"
        >
          {data.map((item: any, index: number) => (
            <Link to={'/'} key={index} className="">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 * (index / 5),
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="w-[230px]"
              >
                <img src={item.image} alt="" className="h-[280px] w-full rounded-[15px] object-cover" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div> */}
      <Carousel
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
                <img
                  src={item?.banner[0]?.url}
                  alt="image 1"
                  className="h-[280px] w-full rounded-xl object-cover transition-all hover:scale-95"
                />
              </Link>
            ))}
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Slide;
