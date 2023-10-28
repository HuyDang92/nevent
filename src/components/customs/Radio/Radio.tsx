import Icon from '../Icon';

interface RadioProps {
  id: string;
  className?: string;
  label: string | React.ReactNode;
  name: string;
  icon?: string;
  classNameIcon?: string;
  classNammeInput?: string;
  value?: string;
}
const Radio = ({ id, className, label, name, icon, classNameIcon, classNammeInput, value }: RadioProps) => {
  return (
    <div className={`${className}`}>
      <input id={id} type="radio" name={name} className={classNammeInput} value={value} />
      {icon && <Icon name={icon} className={classNameIcon} />}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radio;
