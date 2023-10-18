import { Link } from 'react-router-dom';
type SectionTitleProps = {
  value: string;
  className?: string;
  size?: string;
  to?: string;
};
const SectionTitle = ({ value, className, size, to = '/' }: SectionTitleProps) => {
  return (
    <>
      <div className={`mx-auto my-2 sm:my-5 flex w-full items-center justify-between ${className}`}>
        <p className={`my-1 text-lg font-bold text-cs_dark dark:text-white md:text-xl lg:text-2xl ${size}`}>{value}</p>
        <Link to={to} className="text-cs_semi_green transition dark:text-white sm:hidden">
          Tất cả
        </Link>
      </div>
    </>
  );
};
export default SectionTitle;
