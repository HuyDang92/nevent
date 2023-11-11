import { Spinner } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useLazyGetAllEventQuery } from '~/features/Event/eventApi.service';
import { useDebounce } from '~/hooks/useDebounce';
import moment from 'moment';
import Icon from '../Icon';
import { Link, useNavigate } from 'react-router-dom';
import useClickOutside from '~/hooks/useClickOutside';
import { useLazyGetUserByEmailQuery } from '~/features/Auth/authApi.service';

type SearchBarProps = {
  className?: string;
  size?: 'md' | 'lg';
  classNameInput?: string;
  setUserReceive: any;
};

const SearchUser = ({ className, size = 'md', classNameInput, setUserReceive }: SearchBarProps) => {
  const [value, setValue] = useState<string>('');
  const [getUser, result] = useLazyGetUserByEmailQuery();
  const { searchValue } = useDebounce(value, 500);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setValue('');
  });
  useEffect(() => {
    if (searchValue === '') return;
    getUser(searchValue);
  }, [searchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSelectUser = (user: any) => {
    setUserReceive(user);
    setValue('');
  };
  return (
    <div className={`relative ${size === 'md' && 'w-[340px] sm:w-[400px]'} ${size === 'lg' && 'w-[640px]'}`}>
      <div
        className={`relative inline-block ${size === 'md' && 'w-[340px] sm:w-[400px]'} ${
          size === 'lg' && 'w-[640px]'
        }  ${className}`}
      >
        <div>
          <input
            placeholder="Nhập email người nhận vé"
            className={` ${size === 'md' && 'h-10'} ${
              size === 'lg' && 'h-14'
            }  w-full rounded-xl px-5 py-3.5 text-sm font-medium  focus:placeholder-cs_blur_black focus:outline-none dark:bg-cs_formDark dark:text-cs_light dark:focus:placeholder-cs_light ${classNameInput}`}
            type="text"
            value={value}
            onChange={handleSearch}
          />
        </div>
        <IonIcon
          name="search-outline"
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl font-medium text-cs_gray`}
        />
      </div>
      <div
        ref={ref}
        className={`absolute right-0 top-[130%] z-20 w-[100%] overflow-hidden overflow-y-scroll rounded-lg bg-cs_light  dark:bg-cs_lightDark ${
          value === '' ? 'h-0 ' : 'max-h-60 border p-3'
        }  space-y-2 shadow-border-full transition-all`}
      >
        <div className="flex items-center gap-3 text-cs_gray">
          {result.isFetching ? (
            <Spinner color="teal" />
          ) : (
            <IonIcon name="search-outline" className={` cursor-pointer text-xl font-medium `} />
          )}

          <span className="text-sm">Tìm kiếm"{value}"</span>
        </div>
        {result.data?.data?.user === null && (
          <div className="py-2 text-center text-cs_lightDark dark:text-cs_light">Không tìm thấy kết quả</div>
        )}
        {!result.isFetching && result.data?.data?.user !== null && (
          <div
            onClick={() => handleSelectUser(result.data?.data?.user)}
            className="flex cursor-pointer gap-2 rounded-lg p-1 transition-all hover:bg-[#eee] dark:hover:bg-cs_formDark"
          >
            <img src={result.data?.data?.user?.avatar?.url} alt="" className="h-16 w-16 rounded-full object-cover" />
            <div className="">
              <p className="text-lg font-semibold dark:text-cs_light">{result.data?.data?.user?.fullName}</p>
              <p className=" text-cs_grayText">{result.data?.data?.user?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
