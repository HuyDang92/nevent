import { useState, ChangeEvent } from 'react';
import IonIcon from '@reacticons/ionicons';

type InputProps = {
  icon: string; // require props icon
  border?: 'rounded-md' | 'rounded-full';
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
};

const InputV2 = ({
  icon,
  value,
  onChange,
  placeholder,
  className,
  type = 'text',
  border = 'rounded-md',
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <div className="relative inline-block">
      <IonIcon
        name={icon}
        className={`absolute left-3 top-2 text-2xl text-cs_gray ${isFocus ? 'text-cs_purple' : ''}`}
      />
      <input
        placeholder={placeholder}
        className={`h-10 w-64 border-2 border-cs_gray bg-cs_light px-10 py-3.5 text-cs_purple focus:border-cs_purple focus:placeholder-cs_purple focus:outline-none ${border} ${className}`}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputV2;
