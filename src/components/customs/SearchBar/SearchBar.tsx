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
      <div className={`relative inline-block w-1/2 ${className}`}>
        <input
          placeholder="Tìm kiếm sự kiện"
          className={`h-10 w-full rounded-full border-2 border-cs_gray bg-cs_light px-4 py-3.5 text-cs_purple focus:border-cs_purple focus:placeholder-cs_purple focus:outline-none `}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
        />
        <IonIcon
          name="search-outline"
          className={`absolute right-3 top-1.5 text-2xl text-cs_gray ${isFocus ? 'text-cs_purple' : ''}`}
        />
      </div>
    </>
  );
};

export default SearchBar;
