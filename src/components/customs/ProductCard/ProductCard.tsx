import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

type ProductData = {
  image: string;
  title: string;
  date: string;
  category: string;
  link?: string;
  place: string;
};

type ProductListProps = {
  data: ProductData; //dữ liệu
  className?: string;
  index: number;
};

const ProductCard = ({ data, className, index }: ProductListProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`${className}`}>
      {/* Mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3 * (index / 5),
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className={`relative h-[190px] w-full overflow-hidden rounded-xl shadow-lg sm:h-64 ${className}`}>
          <Link to={'/'}>
            <img src={data.image} alt="image" className="h-[110px] w-full rounded-xl object-cover sm:h-44" />

            <div
              className=" z-5 absolute bottom-0 mt-5 rounded-xl rounded-t-lg bg-white p-3 py-1 text-left font-bold text-cs_dark shadow-lg sm:py-3"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="text-[10px] font-normal sm:text-xs">{data.place}</span>
              <p className={`line-clamp-2 text-xs leading-tight tracking-wide sm:my-1.5 sm:text-sm `}>{data.title}</p>
              <div className="mb-1 mt-2 justify-between pr-1.5 text-xs font-normal text-cs_gray sm:flex">
                <span className="flex items-center gap-1">
                  <Icon name="time-outline" />
                  {data.date}
                </span>
                <span>{data.category}</span>
              </div>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 10 }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="flex justify-between text-[13px] font-normal"
                  >
                    <span className="cursor-pointer">Chi tiết</span>
                    <span className="cursor-pointer">Đặt vé</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default ProductCard;
