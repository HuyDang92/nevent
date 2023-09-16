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
    <>
      <Link to={link}>
        <div
          className={`relative w-full overflow-hidden rounded-xl transition hover:-translate-y-5 ${className}`}
          key={id}
        >
          <div className="absolute z-30 h-60 w-full rounded-xl bg-cs_purple opacity-50"></div>
          <img src={image} alt="cate" className="h-60 w-full rounded-xl object-cover" />
          <p className="absolute bottom-5 left-5 z-50 text-xl font-bold text-white">{name}</p>
        </div>
      </Link>
    </>
  );
};
export default CategoryCard;
