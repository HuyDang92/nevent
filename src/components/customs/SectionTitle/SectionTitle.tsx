type SectionTitleProps = {
  value: string;
  className?: string;
};
const SectionTitle = ({ value, className }: SectionTitleProps) => {
  return (
    <>
      <div className={`mx-auto flex w-full items-center justify-center gap-6 ${className}`}>
        <hr className="border-1 my-2 w-48 border-cs_dark" />
        <p className="text-3xl font-bold text-cs_dark">{value}</p>
        <hr className="border-1 my-2 w-48 border-cs_dark" />
      </div>
    </>
  );
};
export default SectionTitle;
