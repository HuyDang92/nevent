import { ChangeEvent } from 'react';

type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  id?: string;
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
  label,
  rounded_full = false,
}: InputProps) => {
  console.log(label);

  return (
    <div className={`flex flex-col items-start ${className}`}>
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
        className={`shadow-2 h-10 shadow-border-light ${
          rounded_full ? 'rounded-full' : 'rounded-xl'
        } bg-cs_light px-4 py-3.5 text-cs_dark focus:border-cs_dark focus:placeholder-cs_dark focus:outline-none ${classNameInput}`}
        type={type}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};
export default Input;
