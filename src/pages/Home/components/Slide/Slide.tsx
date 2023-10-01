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
      <motion.div ref={ref} className="cursor-pointer overflow-hidden ">
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-2 sm:gap-5">
          {data.map((item: any, index: number) => (
            <Link to={'/'} key={index} className=''>
              <motion.div className="w-[230px]">
                <img src={item.image} alt="" className="h-[280px] w-full rounded-[15px] object-cover" />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

export default Slide;
