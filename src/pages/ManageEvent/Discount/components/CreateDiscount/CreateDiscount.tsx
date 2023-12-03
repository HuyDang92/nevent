import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import * as Yup from 'yup';
import Input from '~/components/customs/Input';
import { useFormik } from 'formik';
import Button from '~/components/customs/Button';
interface Prop {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateDiscount = ({isOpen, setIsOpen}: Prop) => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
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
              <Button onClick={() => setIsOpen(!isOpen)} className="w-[calc(50%-8px)]" mode="dark" value="Hủy"></Button>
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
  );
};

export default CreateDiscount;
