import IonIcon from '@reacticons/ionicons';

import { useState, ChangeEvent } from 'react';

type SearchBarProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: 'md' | 'lg';
};

const SearchBar = ({ value, onChange, className, size = 'md' }: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`relative inline-block ${size === 'md' && 'w-[440px]'} ${
          size === 'lg' && 'w-[640px]'
        }  ${className}`}
      >
        <input
          placeholder="Tìm kiếm..."
          className={` ${size === 'md' && 'h-10'} ${
            size === 'lg' && 'h-14'
          }  w-full rounded-xl px-5 py-3.5 text-sm font-medium  focus:placeholder-cs_blur_black focus:outline-none dark:bg-cs_formDark dark:text-cs_light dark:focus:placeholder-cs_light`}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
        />
        <IonIcon
          name="search-outline"
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl font-medium text-cs_gray ${
            isFocus ? 'dark:text-cs_light' : ''
          }`}
        />
      </form>
    </>
  );
};

export default SearchBar;
