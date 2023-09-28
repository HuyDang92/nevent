import { Link } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
type ProductCardProps = {
  id: string | number;
  link: string;
  place: string;
  image: string;
  name: string;
  date: string;
  category: string;
  className?: string;
};
// Nhớ thay link đến sản phẩm
const ProductCard = ({ id, place, image, link, name, date, category, className }: ProductCardProps) => {
  return (
    <div className={`relative h-64 w-full cursor-pointer rounded-full shadow-border-full ${className}`} key={id}>
      <Link to={link}>
        <img src={image} alt="image" className="h-44 w-full rounded-xl object-cover" />
        <div className=" absolute bottom-0 z-10 mt-5 rounded-xl rounded-t-lg bg-white p-3 text-left font-bold text-cs_dark shadow-border-full">
          <span className="text-xs font-normal">{place}</span>
          <p className="my-1.5 line-clamp-2 text-sm leading-tight tracking-wide">{name}</p>
          <div className="mt-2 flex justify-between pr-1.5 text-xs font-normal text-cs_gray">
            <span className="flex items-center gap-1">
              <IonIcon name="time-outline" />
              {date}
            </span>
            <span>{category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
