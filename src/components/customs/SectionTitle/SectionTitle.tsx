type SectionTitleProps = {
  value: string;
  className?: string;
  size?: string;
  to?: string;
};
const SectionTitle = ({ value, className, size, to = '/' }: SectionTitleProps) => {
  return (
    <>
      <div className={`mx-auto my-5 flex w-full items-center justify-between ${className}`}>
        <p className={`my-1 text-lg font-bold text-black md:text-xl lg:text-2xl ${size}`}>{value}</p>
        <Link to={to} className="transition hover:text-cs_purple sm:hidden">
          Tất cả
        </Link>
      </div>
    </>
  );
};
export default SectionTitle;
