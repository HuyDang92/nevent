import IonIcon from '@reacticons/ionicons';
import { useState, ChangeEvent } from 'react';

type SearchBarProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const SearchBar = ({ value, onChange, className }: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <>
      <div className={`relative inline-block w-[440px] ${className}`}>
        <input
          placeholder="Tìm kiếm..."
          className={`h-10 w-full rounded-xl px-5 py-3.5 text-sm font-medium shadow-border-btn focus:placeholder-cs_blur_black focus:outline-none `}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
        />
        <IonIcon
          name="search-outline"
          className={`absolute right-4 top-2 cursor-pointer text-xl font-medium text-cs_gray ${
            isFocus ? '!text-cs_icon_black' : ''
          }`}
        />
      </div>
    </>
  );
};

export default SearchBar;
