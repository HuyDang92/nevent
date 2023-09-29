import { Link } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type ProductCardProps = {
  id: string | number;
  link: string;
  place?: string;
  image: string;
  name: string;
  date: string;
  category: string;
  className?: string;
};
// Nhớ thay link đến sản phẩm
const ProductCard = ({ id, place, image, link, name, date, category, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`relative h-64 w-full overflow-hidden rounded-xl shadow-lg ${className}`} key={id}>
      <Link to={link}>
        <img src={image} alt="image" className="h-44 w-full rounded-xl object-cover" />

        <div
          className=" absolute bottom-0 z-10 mt-5 rounded-xl rounded-t-lg bg-white p-3 text-left font-bold text-cs_dark shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-xs font-normal">{place}</span>
          <p className={`my-1.5 line-clamp-2 text-sm leading-tight tracking-wide `}>{name}</p>
          <div className="mb-1 mt-2 flex justify-between pr-1.5 text-xs font-normal text-cs_gray">
            <span className="flex items-center gap-1">
              <IonIcon name="time-outline" />
              {date}
            </span>
            <span>{category}</span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -5, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 10 }}
                exit={{ opacity: 0, y: -5, height: 0 }}
                className="flex justify-between text-[13px] font-normal "
              >
                <span className="cursor-pointer">Chi tiết</span>
                <span className="cursor-pointer">Đặt vé</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
