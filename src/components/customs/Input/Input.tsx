import { ChangeEvent, useState } from 'react';
import Icon from '../Icon';
import IonIcon from '@reacticons/ionicons';

type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  id?: string;
  name?: string;
  label?: string;
  rounded_full?: boolean;
};

const Input = ({
  value,
  onChange,
  placeholder,
  className,
  classNameLabel,
  classNameInput = 'w-96',
  type = 'text',
  id,
  name,
  label,
  rounded_full = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
    setIsFocused(true);
  };
  return (
    <div className={`relative flex flex-col items-start ${className}`}>
      {label !== undefined ? (
        <>
          <label htmlFor={id} className={`flex gap-1 p-2 font-medium ${classNameLabel}`}>
            <span>{label}</span>
            <span className="grid h-2 place-content-center self-start text-red-500">&lowast;</span>
          </label>
        </>
      ) : (
        <></>
      )}
      <input
        placeholder={placeholder}
        className={`h-10 shadow-border-light dark:bg-cs_formDark ${
          rounded_full ? 'rounded-full' : 'rounded-xl'
        }  px-4 py-3.5  focus:border-cs_dark focus:placeholder-cs_dark focus:outline-none dark:focus:placeholder-cs_light ${classNameInput}`}
        type={showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
      />
      {type === 'password' && isFocused && (
        <IonIcon
          onClick={handleClick}
          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cs_semi_green"
        />
      )}
    </div>
  );
};
export default Input;
