/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import IonIcon from '@reacticons/ionicons';

type InputProps = {
  icon: string; // require props icon
  iconClassName?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
};

const InputIcon = ({ icon, value, onChange, placeholder, className, type = 'text', iconClassName }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <div className="relative inline-block">
      <input
        placeholder={placeholder}
        className={`h-10 w-64 rounded-lg bg-cs_light px-4 py-3.5 text-cs_blur_black focus:placeholder-cs_blur_black focus:outline-none ${className}`}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
      />
      <IonIcon
        name={icon as any}
        className={`absolute right-3 top-2 text-2xl text-cs_gray ${iconClassName} ${
          isFocus ? 'text-cs_icon_black' : ''
        }`}
      />
    </div>
  );
};
export default InputIcon;
