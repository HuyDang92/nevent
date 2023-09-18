import { Link } from 'react-router-dom';
type CategoryCardProps = {
  id: string | number;
  image: string;
  name: string;
  link: string;
  className?: string;
};
const CategoryCard = ({ id, image, link, name, className }: CategoryCardProps) => {
  return (
    <div className={`relative w-full z-10 overflow-hidden rounded-xl transition  ${className}`} key={id}>
      <Link to={link}>
        <div className="absolute z-30 h-60 w-full rounded-xl bg-cs_purple opacity-50"></div>
        <img src={image}  alt="cate" className="h-60 w-full hover:scale-110 rounded-xl object-cover" />
        <p className="absolute bottom-5 left-5 z-50 text-xl font-bold text-white">{name}</p>
      </Link>
    </div>
  );
};
export default CategoryCard;
