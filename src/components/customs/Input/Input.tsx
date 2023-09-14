import { ChangeEvent } from 'react';

type InputProps = {
  border?: 'rounded-md' | 'rounded-full';
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
};

const Input = ({ value, onChange, placeholder, className, type = 'text', border = 'rounded-md' }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={`h-10 w-96 border-2 border-cs_gray bg-cs_light px-4 py-3.5 text-cs_purple focus:border-cs_purple focus:placeholder-cs_purple focus:outline-none ${border} ${className}`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
export default Input;
