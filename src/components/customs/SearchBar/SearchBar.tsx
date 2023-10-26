import { Spinner } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
import { useState, ChangeEvent, useEffect } from 'react';
import { useLazyGetAllEventQuery } from '~/features/Event/eventApi.service';
import { useDebounce } from '~/hooks/useDebounce';
import moment from 'moment';
import Icon from '../Icon';
import { Link, useNavigate } from 'react-router-dom';

type SearchBarProps = {
  className?: string;
  size?: 'md' | 'lg';
  classNameInput?: string;
};

const SearchBar = ({ className, size = 'md', classNameInput }: SearchBarProps) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const [getEvent, result] = useLazyGetAllEventQuery();
  const { searchValue } = useDebounce(value, 500);

  useEffect(() => {
    if (searchValue === '') return;
    getEvent({ page: 1, limit: 20, search: searchValue });
  }, [searchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') return;
    navigate(`/event-categories/${value}`);
    setValue('');
  };

  return (
    <div className="relative">
      <div
        className={`relative inline-block ${size === 'md' && 'w-[440px]'} ${
          size === 'lg' && 'w-[640px]'
        }  ${className}`}
      >
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Tìm kiếm sự kiện..."
            className={` ${size === 'md' && 'h-10'} ${
              size === 'lg' && 'h-14'
            }  w-full rounded-xl px-5 py-3.5 text-sm font-medium  focus:placeholder-cs_blur_black focus:outline-none dark:bg-cs_formDark dark:text-cs_light dark:focus:placeholder-cs_light ${classNameInput}`}
            type="text"
            value={value}
            onChange={handleSearch}
          />
        </form>
        <IonIcon
          name="search-outline"
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl font-medium text-cs_gray`}
        />
      </div>
      <div
        className={`absolute right-0 top-[130%] w-[95%] overflow-hidden overflow-y-scroll rounded-lg bg-cs_light ${
          value === '' ? 'h-0 ' : 'max-h-60 p-3'
        }  space-y-2 shadow-border-full transition-all`}
      >
        <div className="flex items-center gap-3 text-cs_gray">
          {result.isFetching ? (
            <Spinner color="teal" />
          ) : (
            <IonIcon name="search-outline" className={` cursor-pointer text-xl font-medium `} />
          )}

          <span>Tìm kiếm sự kiện "{value}"</span>
        </div>
        {!result.isFetching &&
          result.data?.data?.docs?.map((event: IEvent) => (
            <Link
              onClick={() => setValue('')}
              to={`/event-detail/${event?._id}`}
              className="flex gap-2 rounded-lg p-1 transition-all hover:bg-[#eee]"
            >
              <img src={event?.banner[0]?.url} alt="" className="h-[3.8rem] w-[25%] rounded-md object-cover" />
              <div className="">
                <p className="line-clamp-2 text-sm">{event.title}</p>
                <p className="flex gap-2 pt-1 text-xs text-cs_grayText">
                  <span className="flex items-center gap-1">
                    <Icon name="location-outline" />
                    {event?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="time-outline" />
                    {moment(event?.start_date).format('DD/MM/YYYY')}
                  </span>
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
