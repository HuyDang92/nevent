import { Dialog } from '@material-tailwind/react';
import { useState } from 'react';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';

import DiscountTable from './components/DiscountTable';
import CreateDiscount from './components/CreateDiscount';
const Discount = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Mã giảm giá</h1>
        <Dropdown />
      </div>
      <div className="overflow-hidden">
        <div className="p-5">
          <div className=" flex items-center gap-3 rounded-xl">
            {/* <p className=" text-cs_semi_green">Hiển thị trong:</p> */}
            <div className="flex justify-between gap-5">
              {/* <select
                name="month"
                id="month"
                className="w-[50%] rounded bg-cs_semi_green px-4 py-1 text-white focus:outline-none"
              >
                <option value="0">Chọn một tháng</option>
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
                <option value="4">Tháng 4</option>
                <option value="5">Tháng 5</option>
                <option value="6">Tháng 6</option>
                <option value="7">Tháng 7</option>
                <option value="8">Tháng 8</option>
                <option value="9">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12">Tháng 12</option>
              </select>
              <select
                name="day"
                id="day"
                className="w-[50%] rounded bg-cs_semi_green px-4 py-1 text-white focus:outline-none"
              >
                <option value="0">Chọn một ngày</option>
                <option value="1">Ngày 1</option>
                <option value="2">Ngày 2</option>
                <option value="3">Ngày 3</option>
                <option value="4">Ngày 4</option>
                <option value="5">Ngày 5</option>
                <option value="6">Ngày 6</option>
                <option value="7">Ngày 7</option>
                <option value="8">Ngày 8</option>
                <option value="9">Ngày 9</option>
                <option value="10">Ngày 10</option>
                <option value="11">Ngày 11</option>
                <option value="12">Ngày 12</option>
                <option value="13">Ngày 13</option>
                <option value="14">Ngày 14</option>
                <option value="15">Ngày 15</option>
                <option value="16">Ngày 16</option>
                <option value="17">Ngày 17</option>
                <option value="18">Ngày 18</option>
                <option value="19">Ngày 19</option>
                <option value="20">Ngày 20</option>
                <option value="21">Ngày 21</option>
                <option value="22">Ngày 22</option>
                <option value="23">Ngày 23</option>
                <option value="24">Ngày 24</option>
                <option value="25">Ngày 25</option>
                <option value="26">Ngày 26</option>
                <option value="27">Ngày 27</option>
                <option value="28">Ngày 28</option>
                <option value="29">Ngày 29</option>
                <option value="30">Ngày 30</option>
                <option value="31">Ngày 31</option>
              </select> */}
              <Button onClick={() => setIsOpen(!isOpen)} value="Thêm" mode="dark" />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-xl text-center text-cs_semi_green">
            {/* <img
              src="https://i.pinimg.com/originals/d1/7b/48/d17b48444021c047dd006dd632da4955.gif"
              alt=""
              className="w-[10rem]"
            />
            <h1 className="animate-pulse font-bold">Đang tải dữ liệu</h1> */}
            <DiscountTable />
          </div>
        </div>
      </div>
      {isOpen && <CreateDiscount isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Discount;
