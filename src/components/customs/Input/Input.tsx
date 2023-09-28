import { ChangeEvent } from 'react';

type InputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  id: string;
  label?: string;
};

const Input = ({
  value,
  onChange,
  placeholder,
  className,
  classNameLabel,
  classNameInput,
  type = 'text',
  id,
  label,
}: InputProps) => {
  console.log(label);

  return (
    <div className={`${className}`}>
      {label !== undefined ? (
        <>
          <label htmlFor={id} className={`p-2 font-medium ${classNameLabel}`}>
            {label}
          </label>
          <br />
        </>
      ) : (
        <></>
      )}
      <input
        placeholder={placeholder}
        className={`h-10 w-96 rounded-md border-2 border-cs_gray bg-cs_light px-4 py-3.5 text-cs_purple focus:border-cs_purple focus:placeholder-cs_purple focus:outline-none ${classNameInput}`}
        type={type}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};
export default Input;
