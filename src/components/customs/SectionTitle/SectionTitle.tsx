import { Link } from 'react-router-dom';
type SectionTitleProps = {
  value: string;
  className?: string;
  variant?: string;
};
const SectionTitle = ({ value, className, variant }: SectionTitleProps) => {
  return (
    <>
      <div className={`mx-auto my-5 flex w-full items-center justify-between gap-6 sm:justify-center ${className}`}>
        <hr className="border-1 my-2 hidden border-cs_dark sm:block sm:w-8 md:w-16 lg:w-32" />
        <p className={`my-1 text-xl font-bold text-cs_dark md:text-xl lg:text-2xl ${variant}`}>{value}</p>
        <Link to="/" className="sm:hidden">
          Tất cả
        </Link>
        <hr className="border-1 my-2 hidden border-cs_dark sm:block sm:w-8 md:w-16 lg:w-32" />
      </div>
    </>
  );
};
export default SectionTitle;
