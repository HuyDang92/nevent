import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';

const TicketList = () => {
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

  return (
    <form
      className="rounded-lg bg-cs_light_gray p-5 dark:bg-cs_semiDark dark:shadow-border-full"
      onSubmit={ticketFormik.handleSubmit}
    >
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
              <span className="dark:text-gray-400">Ngày kết thúc bán vé: </span>
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
        <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Tiếp tục" />
      </div>
    </form>
  );
};

export default TicketList;
