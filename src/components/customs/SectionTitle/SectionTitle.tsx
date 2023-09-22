import { Link } from 'react-router-dom';
type SectionTitleProps = {
  value: string;
  className?: string;
  size?: string;
};
const SectionTitle = ({ value, className, size }: SectionTitleProps) => {
  return (
    <>
      <div className={`mx-auto my-5 flex w-full items-center justify-between gap-6 sm:justify-center ${className}`}>
        <hr className="border-1 my-2 hidden border-cs_dark sm:block md:w-16 lg:w-32" />
        <p className={`my-1 text-lg font-bold text-cs_dark md:text-xl lg:text-2xl ${size}`}>{value}</p>
        <hr className="border-1 my-2 hidden border-cs_dark sm:block md:w-16 lg:w-32" />
        <Link to="/" className="transition hover:text-cs_purple sm:hidden">
          Tất cả
        </Link>
      </div>
    </>
  );
};
export default SectionTitle;
