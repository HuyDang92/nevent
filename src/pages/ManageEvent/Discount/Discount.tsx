import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { boolean } from 'yup';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import * as Yup from 'yup';
import Input from '~/components/customs/Input';
const Discount = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const date = new Date();
  date.setDate(date.getDate() - 1);
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
  const formik = useFormik({
    initialValues: {
      name: '',
      discountPrice: '',
      discountPercent: '',
      discount: '',
      quantity: 0,
      beginDate: '',
      endDate: '',
      beginTime: '',
      endTime: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên không được để trống'),
      quantity: Yup.number().min(1, 'Số lượng phải lớn hơn 0').required('Số lượng không được để trống'),
      discountPercent: Yup.number()
        .typeError('Phải là một số')
        .min(0, 'Phần trăm giảm giá không được âm')
        .max(100, 'Phần trăm giảm giá không vượt quá 100')
        .required('Vui lòng nhập phần trăm giảm giá hoặc giá giảm giá'),
      discountPrice: Yup.number()
        .typeError('Phải là một số')
        .min(0, 'Giá giảm giá không được âm')
        .required('Vui lòng nhập giá giảm giá hoặc phần trăm giảm giá'),
      beginDate: Yup.date().required('Ngày bắt đầu không được để trống'),
      endDate: Yup.date()
        .min(Yup.ref('beginDate'), 'Ngày kết thúc phải sau ngày bắt đầu')
        .required('Ngày kết thúc không được để trống'),
      beginTime: Yup.string().required('Thời gian bắt đầu không được để trống'),
      endTime: Yup.string().required('Thời gian kết thúc không được để trống'),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Mã giảm giá</h1>
        <Dropdown />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border-[1px] border-cs_semi_green">
        <div className="bg-cs_semi_green p-5">
          <h1 className="text-xl font-bold text-cs_light">{event.title}</h1>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold dark:text-white"> Quản lý mã giảm giá</h2>
          <div className="mt-3 flex justify-between rounded-xl bg-cs_light_gray p-3">
            <p className="w-[20%] text-cs_semi_green">Hiển thị trong:</p>
            <div className="flex w-[80%] justify-between gap-5">
              <select
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
              </select>
              <Button onClick={() => setIsOpen(!isOpen)} value="Thêm" mode="dark" />
            </div>
          </div>
          <div className="mt-3 flex w-full flex-col items-center justify-center rounded-xl border-2 border-cs_semi_green p-4 text-center text-cs_semi_green">
            {/* <img
              src="https://i.pinimg.com/originals/d1/7b/48/d17b48444021c047dd006dd632da4955.gif"
              alt=""
              className="w-[10rem]"
            />
            <h1 className="animate-pulse font-bold">Đang tải dữ liệu</h1> */}
          </div>
        </div>
      </div>
      <Dialog open={isOpen} handler={setIsOpen}>
        <DialogHeader className="justify-center font-bold">Thêm mã giảm giá</DialogHeader>
        <DialogBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="mt-3 flex w-full flex-col items-center justify-center rounded-xl border-2 border-cs_semi_green p-4">
              <div className="mt-5 grid w-full gap-2">
                <div className="relative">
                  {formik.errors.name && (
                    <small className="absolute left-[130px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.name}
                    </small>
                  )}
                  <Input
                    name="name"
                    id="name"
                    label="Tên mã giảm giá"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative">
                  <span className="font-medium">Mức giảm</span>
                  {formik.errors.discountPercent && formik.errors.discountPrice && (
                    <small className="absolute left-[90px] top-[3px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.discountPercent || formik.errors.discountPrice}
                    </small>
                  )}
                  {formik.errors.discount && (
                    <small className="absolute left-[90px] top-[3px] z-10 px-2 text-[12px] text-red-600">
                      Chỉ nhập 1 trong 2 giá trị: Giá trị cố định hoặc Tỷ lệ phần trăm
                    </small>
                  )}
                  <div className="flex items-center justify-between gap-3 px-3">
                    <Input
                      type="number"
                      label="Giá (VNĐ)"
                      className="w-[calc(40%-8px)]"
                      name="discountPrice"
                      id="discountPrice"
                      classNameLabel="!text-cs_label_gray !text-sm"
                      classNameInput="!w-full"
                      value={formik.values.discountPrice}
                      onChange={formik.handleChange}
                    />
                    <span>Hoặc</span>
                    <Input
                      type="number"
                      label="Phần trăm (%) "
                      className="w-[calc(40%-8px)]"
                      name="discountPercent"
                      id="discountPercent"
                      classNameLabel="!text-cs_label_gray !text-sm"
                      classNameInput="!w-full"
                      value={formik.values.discountPercent}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div>
                  <span className="font-medium">Thời gian áp dụng</span>
                  <div className="mt-4 flex flex-wrap justify-between gap-[40px]">
                    <div className="flex w-[calc(50%-30px)] items-center justify-between">
                      <span className="w-1/5 dark:text-gray-400">Bắt đầu:</span>
                      <div className="relative w-4/5">
                        {formik.errors.beginDate && (
                          <small className="absolute -top-[20px] z-10 px-2 text-[12px] font-light text-red-600">
                            {formik.errors.beginDate}
                          </small>
                        )}
                        <Input
                          classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                          className="!w-full"
                          type="date"
                          name="beginDate"
                          value={formik.values.beginDate}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex w-[calc(50%-30px)] items-center justify-between">
                      <span className="w-1/5 dark:text-gray-400">Thời gian:</span>
                      <div className="relative w-4/5">
                        {formik.errors.beginTime && (
                          <small className="absolute -top-[20px] z-10 px-2 text-[12px] font-light text-red-600">
                            {formik.errors.beginTime}
                          </small>
                        )}
                        <Input
                          type="time"
                          classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                          className="!w-full"
                          name="beginTime"
                          value={formik.values.beginTime}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex w-[calc(50%-30px)] items-center justify-between">
                      <span className="w-1/5 dark:text-gray-400">Đến:</span>
                      <div className="relative w-4/5">
                        {formik.errors.endDate && (
                          <small className="absolute -top-[20px] z-10 px-2 text-[12px] font-light text-red-600">
                            {formik.errors.endDate}
                          </small>
                        )}
                        <Input
                          type="date"
                          classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                          className="!w-full"
                          name="endDate"
                          value={formik.values.endDate}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex w-[calc(50%-30px)] items-center justify-between">
                      <span className="w-1/5 dark:text-gray-400">Thời gian:</span>
                      <div className="relative w-4/5">
                        {formik.errors.endTime && (
                          <small className="absolute -top-[20px] z-10 px-2 text-[12px] font-light text-red-600">
                            {formik.errors.endTime}
                          </small>
                        )}
                        <Input
                          type="time"
                          classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                          className="!w-full"
                          name="endTime"
                          value={formik.values.endTime}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  {formik.errors.quantity && (
                    <small className="absolute left-[80px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.quantity}
                    </small>
                  )}
                  <Input
                    name="quantity"
                    id="quantity"
                    label="Số lượng"
                    type="number"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="mt-4 flex w-full gap-4">
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-[calc(50%-8px)]"
                  mode="dark"
                  value="Hủy"
                ></Button>
                <Button
                  type="submit"
                  // onClick={() => setIsOpen(!isOpen)}
                  className="w-[calc(50%-8px)]"
                  mode="dark"
                  value="Tạo"
                ></Button>
              </div>
            </div>
          </form>
        </DialogBody>
        {/* <DialogFooter className="flex gap-4">
          <Button onClick={() => setIsOpen(!isOpen)} className="w-[calc(50%-8px)]" mode="dark" value="Hủy"></Button>
          <Button onClick={() => setIsOpen(!isOpen)} className="w-[calc(50%-8px)]" mode="dark" value="Tạo"></Button>
        </DialogFooter> */}
      </Dialog>
    </div>
  );
};

export default Discount;
