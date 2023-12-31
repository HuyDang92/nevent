import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../customs/Icon';
import moment from 'moment';

type ProductListProps = {
  data: IEvent; //dữ liệu
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
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group relative h-[260px] w-full overflow-hidden rounded-xl shadow-border-full sm:h-[240px] ${className}`}
        >
          <Link to={`/event-detail/${data?._id}`}>
            <img
              src={data?.banner[0]?.url}
              alt="image"
              className="h-[190px] w-full rounded-xl object-cover transition-all group-hover:scale-105 sm:h-[150px]"
            />

            <div className=" z-5 absolute bottom-0 w-full rounded-xl rounded-t-lg bg-white p-3 py-1 text-left font-bold text-cs_dark shadow-lg dark:bg-cs_icon_black">
              <span className="text-[10px] font-normal dark:text-cs_light sm:text-xs">{data.location.name}</span>
              <p
                className={`line-clamp-2 h-auto text-xs leading-tight tracking-wide dark:text-cs_light sm:my-1.5 sm:text-sm lg:h-10`}
              >
                {data.title}
              </p>
              <div className="mb-1 mt-2 justify-between pr-1.5 text-xs font-normal text-cs_gray sm:flex">
                <span className="flex items-center gap-1">
                  <Icon name="time-outline" />
                  {moment(data?.start_date).format('DD/MM/YYYY')}
                </span>
                <span>{data?.categories[0]?.name}</span>
              </div>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 20 }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="hidden justify-between text-[14px] font-normal dark:text-cs_light sm:flex"
                  >
                    <Link to={`/event-detail/${data?._id}`}>
                      <span className="cursor-pointer font-semibold">Chi tiết</span>
                    </Link>
                    <Link to={`/user/payment/${data?._id}/0`}>
                      <span className="cursor-pointer font-semibold">Đặt vé</span>
                    </Link>
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
