import { useFormik } from 'formik';
import { useState } from 'react';
import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
interface Prop {
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddTimeline = ({ handler }: Prop) => {
  const [addTicket, setAddTicket] = useState(false);
  const eventTimelineFormik = useFormik({
    initialValues: {
      beginDate: '',
      endDate: '',
      beginTime: '',
      endTime: '',
    },
    onSubmit: (values) => {
      console.log('sad');

      console.log(values);

      // Handle event timeline form submission
    },
  });
  const ticketFormik = useFormik({
    initialValues: {
      title: '',
      quantity: 0,
      color: '',
      price: 0,
      description: '',
    },
    onSubmit: (values) => {
      console.log(values);
      // Handle ticket form submission
    },
  });

  const handleAddTicket = () => {
    setAddTicket(true);
  };

  const handleSubmitAddTicket = () => {
    console.log(ticketFormik.values);
  };

  return (
    <div className="rounded-lg border-2 border-cs_semi_green">
      <div className="flex items-center justify-between bg-cs_semi_green px-5 py-3 text-cs_light">
        <span>Vui lòng nhập thời gian tổ chức sự kiện</span>
        <Icon className="text-2xl" name="trash-sharp" />
      </div>
      <div className="p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            eventTimelineFormik.handleSubmit();
          }}
          className="flex flex-col gap-[18px] font-semibold text-cs_grayText"
        >
          <h1 className="font-semibold text-cs_semi_green">Ngày tổ chức</h1>
          <div className="flex flex-wrap justify-between gap-[40px]">
            <div className="flex w-[calc(50%-30px)] items-center justify-between">
              <span className="w-1/5 dark:text-gray-400">Bắt đầu:</span>
              <Input
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="beginDate"
                value={eventTimelineFormik.values.beginDate}
                onChange={eventTimelineFormik.handleChange}
              />
            </div>
            <div className="flex w-[calc(50%-30px)] items-center justify-between">
              <span className="w-1/5 dark:text-gray-400">Thời gian:</span>
              <Input
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="beginTime"
                value={eventTimelineFormik.values.beginTime}
                onChange={eventTimelineFormik.handleChange}
              />
            </div>
            <div className="flex w-[calc(50%-30px)] items-center justify-between">
              <span className="w-1/5 dark:text-gray-400">Đến:</span>
              <Input
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="endDate"
                value={eventTimelineFormik.values.endDate}
                onChange={eventTimelineFormik.handleChange}
              />
            </div>
            <div className="flex w-[calc(50%-30px)] items-center justify-between">
              <span className="w-1/5 dark:text-gray-400">Thời gian:</span>
              <Input
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="endTime"
                value={eventTimelineFormik.values.endTime}
                onChange={eventTimelineFormik.handleChange}
              />
            </div>
          </div>
          <h1 className="font-semibold text-cs_semi_green">Loại vé</h1>
          {addTicket ? (
            <form className="rounded-lg bg-cs_light_gray p-5 dark:bg-cs_semiDark dark:shadow-border-full">
              <div className="flex flex-col gap-[18px]">
                <div className="w-full">
                  <span className="dark:text-gray-400">Tên loại vé</span>
                  <Input
                    classNameInput="w-full border-2 dark:border-none"
                    name="title"
                    value={ticketFormik.values.title}
                    onChange={ticketFormik.handleChange}
                  />
                </div>
                <div className="flex h-[140px] rounded-xl border-[1px] border-[#e8e8e8] bg-cs_light p-5 dark:border-none dark:bg-[#30302f]">
                  <div className="flex w-1/4 flex-col justify-between px-3">
                    <span className="dark:text-gray-400">Giá (VND)</span>
                    <div>
                      <input id="freeTicket" type="checkbox" />
                      <label className="ml-2.5 dark:text-gray-400" htmlFor="freeTicket">
                        Vé miễn phí
                      </label>
                    </div>
                    <Input
                      type="number"
                      name="price"
                      value={ticketFormik.values.price}
                      onChange={ticketFormik.handleChange}
                      classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                    />
                  </div>
                  <div className="flex w-1/4 flex-col justify-between border-l-[1px] px-3">
                    <span className="dark:text-gray-400">Tổng số lượng vé</span>
                    <Input
                      type="number"
                      name="quantity"
                      value={ticketFormik.values.quantity}
                      onChange={ticketFormik.handleChange}
                      classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                    />
                  </div>
                  <div className="flex w-1/4 flex-col justify-between border-l-[1px] px-3">
                    <span className="dark:text-gray-400">Số lượng vé tối thiểu cho một lần mua</span>
                    <Input classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none" />
                  </div>
                  <div className="flex w-1/4 flex-col justify-between border-l-[1px] px-3">
                    <span className="dark:text-gray-400">Số lượng vé tối đa cho một lần mua</span>
                    <Input classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none" />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-2/3 border-r-[1px] border-[#CDC0C0] pr-6">
                    <div className="mb-[18px] flex items-center justify-between">
                      <span className="dark:text-gray-400">Ngày bắt đầu bán vé: </span>
                      <Input classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none" />
                      <Input classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none ml-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="dark:text-gray-400">Ngày bắt đầu bán vé: </span>
                      <Input classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none" />
                      <Input classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none ml-2" />
                    </div>
                  </div>
                  <div className="flex w-1/3 flex-col gap-3 px-6">
                    <span className="dark:text-gray-400">Màu vé ( Phân biệt vé )</span>
                    <input type="color" className="w-[150px] rounded-lg border-none bg-transparent outline-none" />
                  </div>
                </div>
                <div className="flex gap-5">
                  <textarea
                    name=""
                    placeholder="Mô tả loại vé"
                    className="h-[100px] w-2/3 rounded-xl p-4 focus:outline-none dark:bg-cs_formDark"
                  ></textarea>
                  <div className="w-1/3 rounded-xl bg-cs_light dark:bg-cs_formDark"></div>
                </div>
                <div className="flex justify-between gap-5">
                  <Button onClick={handleSubmitAddTicket} value="Hoàn thành" mode="dark" className="w-1/2" />
                  <Button type="reset" value="Hủy" className="w-1/2 dark:!bg-cs_formDark" />
                </div>
              </div>
            </form>
          ) : (
            <Button onClick={handleAddTicket} className="w-full" mode="dark" value="Thêm loại vé" />
          )}
          <Button type="submit" className="h-10 w-[120px]" value="Tạo" mode="dark" />
        </form>
      </div>
    </div>
  );
};

export default AddTimeline;
