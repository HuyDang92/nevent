import { ChangeEvent, useState } from 'react';
import IonIcon from '@reacticons/ionicons';

type InputProps = {
  readonly?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  id?: string;
  name?: string;
  label?: string;
  rounded_full?: boolean;
  disabled?: boolean;
};

const Input = ({
  readonly = false,
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
  disabled,
  rounded_full = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleClick = () => {
    setShowPassword(!showPassword);
    setIsFocused(true);
  };
  return (
    <div className={`relative ${className}`}>
      {label !== undefined ? (
        <>
          <label htmlFor={id} className={`flex gap-1 p-2 font-medium dark:!text-gray-400 ${classNameLabel}`}>
            <span>{label}</span>
            {/* <span className="grid h-2 place-content-center self-start text-red-500">&lowast;</span> */}
          </label>
        </>
      ) : (
        <></>
      )}
      <p className="relative">
        <input
          placeholder={placeholder}
          className={`${
            readonly ? 'cursor-not-allowed' : ''
          } h-10 shadow-border-light dark:bg-cs_formDark dark:text-white ${
            rounded_full ? 'rounded-full' : 'rounded-xl'
          }  px-4 py-3.5  focus:border-cs_semi_green focus:placeholder-cs_dark focus:outline-none dark:focus:placeholder-cs_light ${classNameInput}`}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          onFocus={() => setIsFocused(true)}
          readOnly={readonly}
          disabled={disabled}
          // onBlur={() => setIsFocused(false)}
        />
        {type === 'password' && isFocused && (
          <IonIcon
            onClick={handleClick}
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-cs_semi_green`}
          />
        )}
      </p>
    </div>
  );
};
export default Input;
