import Dropdown from '~/components/Dropdown';
import { useState } from 'react';
import Input from '~/components/customs/Input';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';
import { useParams } from 'react-router-dom';

const CustomersManage = () => {
  const { idEvent } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');
  const [activeTags, setActiveTags] = useState('tag1');
  const handleOnclick = (tag: any) => {
    setActiveTags(tag === activeTags ? null : tag);
  };
  const isTagActive = (tag: any) => activeTags === tag;
  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý khách hàng</h1>
        <Dropdown />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border-[1px] border-cs_semi_green">
        <div className="bg-cs_semi_green p-5">
          <h1 className="text-xl font-bold text-cs_light">{event?.data?.data?.title}</h1>
        </div>
        <div className="p-5">
          <div className="flex justify-between rounded-xl bg-cs_light_gray p-3">
            <div className="flex w-[80%] gap-5">
              <button
                onClick={() => handleOnclick('tag1')}
                className={`rounded-full border-2 border-cs_semi_green px-4 py-1 text-sm text-cs_semi_green ${
                  isTagActive('tag1') ? 'bg-cs_semi_green text-white' : ''
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => handleOnclick('tag2')}
                className={`rounded-full border-2 border-cs_semi_green px-4 py-1 text-sm text-cs_semi_green ${
                  isTagActive('tag2') ? 'bg-cs_semi_green text-white' : ''
                }`}
              >
                Tất cả giai đoạn hợp lệ
              </button>
              <button
                onClick={() => handleOnclick('tag3')}
                className={`rounded-full border-2 border-cs_semi_green px-4 py-1 text-sm text-cs_semi_green ${
                  isTagActive('tag3') ? 'bg-cs_semi_green text-white' : ''
                }`}
              >
                Mới nhất
              </button>
            </div>
            <Input placeholder="Name/Email/Phone" />
          </div>
          <div className="mt-3 flex h-96 w-full flex-col items-center justify-center rounded-xl p-4 text-center text-cs_semi_green">
            <img
              src="https://i.pinimg.com/originals/d1/7b/48/d17b48444021c047dd006dd632da4955.gif"
              alt=""
              className="w-[10rem]"
            />
            <h1 className="animate-pulse font-bold">Đang tải dữ liệu</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersManage;
