interface RadioProps {
  id: string;
  className?: string;
  label: string;
  name: string;
}
const Radio = ({ id, className, label, name }: RadioProps) => {
  return (
    <div className={`${className}`}>
      <input id={id} type="radio" name={name} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radio;
