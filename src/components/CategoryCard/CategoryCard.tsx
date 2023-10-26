import { Link } from 'react-router-dom';
type CategoryCardProps = {
  data: ICategory;
};
const CategoryCard = ({ data }: CategoryCardProps) => {
  return (
    <div className={`group relative z-10 w-full overflow-hidden rounded-xl py-2 transition sm:py-0`}>
      <Link to={'/'}>
        <div className="absolute z-30 h-40 sm:h-52 w-full rounded-xl bg-cs_dark opacity-50 transition-all group-hover:scale-110"></div>
        <img
          src={data?.image?.url}
          alt="cate"
          className="h-40 sm:h-52 w-full rounded-xl object-cover transition-all group-hover:scale-110"
        />
        <p className="absolute bottom-5 left-5 z-50 text-xl font-bold text-white">{data?.name}</p>
      </Link>
    </div>
  );
};
export default CategoryCard;
