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
      <div className={`relative inline-block w-[440px] `}>
        <input
          placeholder="Tìm kiếm sự kiện"
          className={`h-10 w-full ${className} bg-cs_light px-4 py-3.5 text-cs_dark focus:border-cs_dark focus:placeholder-cs_dark focus:outline-none `}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
        />
        <IonIcon
          name="search-outline"
          className={`absolute right-3 top-1.5 text-2xl text-cs_gray ${isFocus ? 'text-cs_dark' : ''}`}
        />
      </div>
    </>
  );
};

export default SearchBar;
