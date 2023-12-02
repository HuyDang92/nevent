import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { useNavigate } from 'react-router-dom';
import { addTicket, removeTicket } from '~/features/Business/businessSlice';
import { useRef, useState } from 'react';
import TicketCard from '~/pages/Payment/components/TicketCard';
import { errorNotify } from '~/components/customs/Toast';
import Icon from '~/components/customs/Icon';
import { Variants, motion } from 'framer-motion';
import useClickOutside from '~/hooks/useClickOutside';
const TicketList = () => {
  const dispatch = useAppDispatch();
  const ticketInfo = useAppSelector((state) => state.business.ticketList);
  const [freeTicketCheckbox, setFreeTicketCheckBox] = useState(false);
  const [openTicketColor, setOpenTicketColor] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useClickOutside(ref, () => {
    setOpenTicketColor(false);
  });
  const ticketColors = [
    '#13C6B3',
    '#2E0249',
    '#38E54D',
    '#2192FF',
    '#CC0E74',
    '#F9D423',
    '#5D3A3A',
    '#342EAD',
    '#FD5D5D',
    '#04009A',
    '#266352',
    '#6F1E51',
    '#C70039',
    '#FFC300',
    '#FF5733',
    '#EF4B4B',
  ];
  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      quantity: 0,
      type: '',
      color: '#13C6B3',
      price: 0,
      desc: '',
      // min: 0,
      // max: 5,
      // beginDate: '',
      // beginTime: '',
      // endDate: '',
      // endTime: '23:59',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Tên loại vé không được bỏ trống'),
      type: Yup.string()
        .required('Loại vé không được bỏ trống')
        .test('exsist', 'Đã tồn tại loại vé', (value) => {
          return !ticketInfo.find((item) => item.type === value);
        }),
      price: Yup.number().required('Giá vé không được bỏ trống'),
      quantity: Yup.number().moreThan(0, 'SL vé phải lớn hơn 0').required('SL vé không được bỏ trống'),
      color: Yup.string(),
      desc: Yup.string(),
      // beginDate: Yup.string().required('Không được bỏ trống'),
      // beginTime: Yup.string().required('Không được bỏ trống'),
      // endDate: Yup.string().required('Không được bỏ trống'),
      // endTime: Yup.string().required('Không được bỏ trống'),
    }),
    onSubmit: (values: TicketListInfo, { resetForm }) => {
      console.log(values);
      try {
        dispatch(addTicket(values));
        resetForm();
      } catch (err) {
        console.log(err);
      }
      // Handle ticket form submission
    },
  });
  const nextStep = () => {
    if (ticketInfo.length < 1) {
      errorNotify('Vui lòng thêm vé');
    } else {
      navigate('/organization/create-event/5');
    }
  };
  const handleRemoveTicket = (ticket: TicketListInfo) => {
    dispatch(removeTicket(ticket));
  };
  return (
    <>
      <div className="my-5">
        <span className="dark:text-cs_light">Danh sách vé: </span>
        {ticketInfo.length < 1 && <span className="text-cs_semi_green">Vui lòng thêm vé</span>}
        <div className="flex flex-wrap gap-4">
          {ticketInfo.map((ticket, index) => (
            <div key={index} className="relative">
              <TicketCard price={ticket.price} color={ticket.color} title={ticket.title} tooltip={ticket.desc} />
              <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-[1px] bg-cs_semi_green ">
                <Icon onClick={() => handleRemoveTicket(ticket)} name="close-outline" className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        className="rounded-lg bg-cs_light_gray p-5 dark:bg-cs_semiDark dark:shadow-border-full"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-[18px]">
          <div className="w-full">
            <span className="dark:text-gray-400">Tên loại vé</span>
            <div className="relative">
              {formik.errors.title && (
                <small className="absolute -top-[20px] left-[90px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.title}
                </small>
              )}
              <Input
                classNameInput="w-full border-2 dark:border-none"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="w-full">
            <span className="dark:text-gray-400">Loại vé</span>
            <div className="relative">
              {formik.errors.type && (
                <small className="absolute -top-[20px] left-[65px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.type}
                </small>
              )}
              <Input
                classNameInput="w-full border-2 dark:border-none"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex h-[140px] rounded-xl border-[1px] border-[#e8e8e8] bg-cs_light p-5 dark:border-none dark:bg-[#30302f]">
            <div className="flex w-1/4 flex-col justify-between px-3">
              <span className="dark:text-gray-400">Giá (VND)</span>
              {/* <div>
                <input
                  checked={freeTicketCheckbox}
                  onClick={() => setFreeTicketCheckBox(!freeTicketCheckbox)}
                  id="freeTicket"
                  type="checkbox"
                />
                <label className="ml-2.5 dark:text-gray-400" htmlFor="freeTicket">
                  Vé miễn phí
                </label>
              </div> */}
              <div className="relative">
                {formik.errors.price && (
                  <small className="absolute -bottom-[20px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.price}
                  </small>
                )}
                <Input
                  readonly={freeTicketCheckbox}
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                />
              </div>
            </div>
            <div className="flex w-1/4 flex-col justify-between border-x-[1px] px-3">
              <span className="dark:text-gray-400">Tổng số lượng vé</span>
              <div className="relative">
                {formik.errors.quantity && (
                  <small className="absolute -top-[20px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.quantity}
                  </small>
                )}
                <Input
                  type="number"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-col gap-3 px-6">
              <span className="dark:text-gray-400">Màu vé ( Phân biệt vé )</span>

              {/* Color v1 */}
              {/* <input
                name="color"
                id="color"
                type="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                className="w-[150px] rounded-lg border-none bg-transparent outline-none"
              /> */}

              {/* Color v2 */}
              <motion.nav initial={false} animate={openTicketColor ? 'open' : 'closed'}>
                <motion.button
                  type="button"
                  ref={ref}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setOpenTicketColor(!openTicketColor)}
                  style={{ backgroundColor: formik.values.color }}
                  className="w-20 h-10"
                >
                </motion.button>
                <motion.ul
                  variants={{
                    open: {
                      clipPath: 'inset(0% 0% 0% 0% round 10px)',
                      transition: {
                        type: 'spring',
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.05,
                      },
                    },
                    closed: {
                      clipPath: 'inset(10% 50% 90% 50% round 10px)',
                      transition: {
                        type: 'spring',
                        bounce: 0,
                        duration: 0.3,
                      },
                    },
                  }}
                  className="flex flex-wrap gap-2 rounded-2xl border bg-cs_light p-2 shadow-border-full"
                >
                  {ticketColors.map((color) => (
                    <motion.li
                      variants={itemVariants}
                      key={color}
                      className="h-10 w-[calc(12.5%-7px)] cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => formik.setFieldValue('color', color)}
                    ></motion.li>
                  ))}
                </motion.ul>
              </motion.nav>
            </div>
            {/* <div className="flex w-1/4 flex-col justify-between border-l-[1px] px-3">
              <span className="dark:text-gray-400">Số lượng vé tối thiểu cho một lần mua</span>
              <Input
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                type="number"
                name="min"
                value={formik.values.min}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex w-1/4 flex-col justify-between border-l-[1px] px-3">
              <span className="dark:text-gray-400">Số lượng vé tối đa cho một lần mua</span>
              <Input
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                type="number"
                name="max"
                value={formik.values.max}
                onChange={formik.handleChange}
              />
            </div> */}
          </div>
          {/* <div className="flex">
            <div className="w-2/3 border-r-[1px] border-[#CDC0C0] pr-6">
              <div className="mb-[18px] flex items-center justify-between">
                <span className="dark:text-gray-400">Ngày bắt đầu bán vé: </span>
                <div className="relative">
                  {formik.errors.beginDate && (
                    <small className="absolute -top-[18px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.beginDate}
                    </small>
                  )}
                  <Input
                    classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                    type="date"
                    name="beginDate"
                    value={formik.values.beginDate}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative w-[150px]">
                  {formik.errors.beginTime && (
                    <small className="absolute -top-[18px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.beginTime}
                    </small>
                  )}
                  <Input
                    classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none ml-2"
                    type="time"
                    name="beginTime"
                    value={formik.values.beginTime}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="dark:text-gray-400">Ngày kết thúc bán vé: </span>
                <div className="relative">
                  {formik.errors.endDate && (
                    <small className="absolute -top-[18px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.endDate}
                    </small>
                  )}
                  <Input
                    classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                    type="date"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative w-[150px]">
                  {formik.errors.endTime && (
                    <small className="absolute -top-[18px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.endTime}
                    </small>
                  )}
                  <Input
                    classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none ml-2"
                    type="time"
                    name="endTime"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex gap-5">
            <textarea
              name="desc"
              id="desc"
              placeholder="Mô tả loại vé"
              className="h-[100px] w-full rounded-xl p-4 focus:outline-none dark:bg-cs_formDark dark:text-white"
              value={formik.values.desc}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Tạo vé" />
        </div>
      </form>
      <Button onClick={nextStep} className="md:w mt-5 w-full" mode="dark" value="Tiếp tục" />
    </>
  );
};

export default TicketList;
