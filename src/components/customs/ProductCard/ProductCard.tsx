type ProductCardProps = {
  image: string;
  title: string;
  date: string;
  category: string;
  key: string | number;
  className?: string;
};
const ProductCard = ({ image, title, date, category, key, className }: ProductCardProps) => {
  return (
    <div className={`group w-full cursor-pointer transition hover:-translate-y-5 ${className}`} key={key}>
      <img
        src={image}
        alt="image"
        className="h-40 w-full rounded-xl object-cover shadow-sm shadow-black transition group-hover:scale-105"
      />
      <div className="mt-5 px-1 text-left font-bold text-cs_dark">
        <p className="line-clamp-2 text-lg leading-none">{title}</p>
        <div className="mt-2 flex justify-between pr-1.5 text-sm font-thin">
          <span>{date}</span>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
