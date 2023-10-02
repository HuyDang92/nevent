import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
type Props = {
  data: any; //dữ liệu
};
function Slide({ data }: Props) {
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<any>();
  useEffect(() => {
    setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
  }, []);
  return (
    <>
      <motion.div ref={ref} className="cursor-grab overflow-hidden ">
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-2 sm:gap-5">
          {data.map((item: any, index: number) => (
            <Link to={'/'} key={index} className="pointer-events-none">
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
                <img
                  src={item.image}
                  alt=""
                  className="pointer-events-none h-[280px] w-full rounded-[15px] object-cover"
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

export default Slide;
