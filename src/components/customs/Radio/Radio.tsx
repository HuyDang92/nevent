import { ChangeEvent } from 'react';
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
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Radio = ({
  id,
  className,
  label,
  name,
  icon,
  classNameIcon,
  classNammeInput,
  value,
  onChange,
  checked = false,
}: RadioProps) => {
  return (
    <div className={`${className}`}>
      <input
        id={id}
        type="radio"
        name={name}
        className={classNammeInput}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {icon && <Icon name={icon} className={classNameIcon} />}
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radio;
