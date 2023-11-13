import Dropdown from '~/components/Dropdown';
import { useState } from 'react';
import Input from '~/components/customs/Input';

const RsvpsManage = () => {
  const event = {
    _id: '652cd125fc13ae657b6c7cdf',
    title: 'ÅÍÎÏ˝ÓÔÒÚÆ☃',
    start_date: '2022-08-11T00:00:00.000Z',
    location: {
      _id: '6545c75892a98643864286e2',
      name: 'Hồ Chí Minh',
      code: '700000',
    },
    categories: [
      {
        _id: '652ccfbc9341999a095b76b5',
        name: 'Âm nhạc',
        image: '652ccf9c9341999a095b76b3',
        createdAt: '2023-10-16T05:53:00.698Z',
        updatedAt: '2023-10-16T05:53:00.698Z',
        __v: 0,
      },
    ],
    banner: [
      {
        _id: '652cd4a7911b66e0c85f305a',
        url: 'http://res.cloudinary.com/dtvqj8h4b/image/upload/v1699107752/Nevents/nevent-1699107751118.jpg',
        secureUrl: 'https://res.cloudinary.com/dtvqj8h4b/image/upload/v1697436836/Nevents/nevent-1697436837783.png',
        publicId: 'Nevents/nevent-1697436837783',
        width: 54,
        height: 54,
        format: 'png',
        type: 'image',
        createdAt: '2023-10-16T06:13:59.316Z',
        updatedAt: '2023-10-16T06:13:59.316Z',
        __v: 0,
      },
    ],
    desc: 'Bypass Upper Esophagus to Jejunum, Open Approach',
    status: 'UPCOMING',
    approve: false,
    hot: false,
    hotLevel: 1,
    updatedAt: '2023-10-16T08:27:36.488Z',
  };
  const [activeTags, setActiveTags] = useState('tag1');
  const handleOnclick = (tag: any) => {
    setActiveTags(tag === activeTags ? null : tag);
  };
  const isTagActive = (tag) => activeTags === tag;
  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý RSVPs</h1>
        <Dropdown />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border-[1px] border-cs_semi_green">
        <div className="bg-cs_semi_green p-5">
          <h1 className="text-xl font-bold text-cs_light">{event.title}</h1>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold dark:text-white"> Quản lý mã giảm giá</h2>
          <div className="mt-3 flex justify-between rounded-xl bg-cs_light_gray p-3">
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

export default RsvpsManage;
