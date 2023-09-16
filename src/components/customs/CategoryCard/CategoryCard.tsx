type CategoryCardProps = {
  id: string | number;
  image: string;
  name: string;
  className?: string;
};
const CategoryCard = ({ id, image, name, className }: CategoryCardProps) => {
  return (
    <>
      <div className={`relative w-full overflow-hidden rounded-xl ${className}`} key={id}>
        <div className="absolute z-30 h-60 w-full rounded-xl bg-cs_purple opacity-50"></div>
        <img src="./src/assets/images/pro.png" alt="" className="h-60 w-full rounded-xl object-cover" />
        <p className="absolute bottom-5 left-5 z-50 text-xl font-bold text-white">Âm nhạc</p>
      </div>
    </>
  );
};
export default CategoryCard;
