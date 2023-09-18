type SectionTitleProps = {
  value: string;
  className?: string;
};
const SectionTitle = ({ value, className }: SectionTitleProps) => {
  return (
    <>
      <div className={`mx-auto my-5 flex w-full items-center justify-center gap-6 ${className}`}>
        <hr className="border-1 my-2 w-8 border-cs_dark md:w-16 lg:w-32" />
        <p className="my-1 text-lg font-bold text-cs_dark md:text-xl lg:text-2xl">{value}</p>
        <hr className="border-1 my-2 w-8 border-cs_dark md:w-16 lg:w-32" />
      </div>
    </>
  );
};
export default SectionTitle;
