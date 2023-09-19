import { Link } from 'react-router-dom';
type ProductCardProps = {
  id: string | number;
  link: string;
  image: string;
  name: string;
  date: string;
  category: string;
  className?: string;
};
// Nhớ thay link đến sản phẩm
const ProductCard = ({ id, image, link, name, date, category, className }: ProductCardProps) => {
  return (
    <div className={`group w-full cursor-pointer transition   ${className}`} key={id}>
      <Link to={link}>
        <img
          src={image}
          alt="image"
          className="h-40 w-full rounded-xl object-cover shadow-sm shadow-black transition group-hover:scale-105"
        />
        <div className="mt-5 px-1 text-left font-bold text-cs_dark">
          <p className="line-clamp-2 text-lg leading-tight">{name}</p>
          <div className="mt-2 flex justify-between pr-1.5 text-sm font-thin">
            <span>{date}</span>
            <span>{category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
