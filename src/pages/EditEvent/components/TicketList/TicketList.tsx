import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTicket, editTicket, removeTicket, setTicketInfo } from '~/features/Business/businessSlice';
import { useEffect, useState, useMemo } from 'react';
import TicketCard from '~/pages/Payment/components/TicketCard';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import {
  useAddTicketMutation,
  useDeleteTicketMutation,
  useGetEventByIdQuery,
  useGetTicketByEventIdQuery,
  useUpdateTicketMutation,
} from '~/features/Event/eventApi.service';
import Icon from '~/components/customs/Icon';
import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { isFetchBaseQueryError } from '~/utils/helper';
import Loading from '~/components/customs/Loading';
const TicketList = () => {
  const dispatch = useAppDispatch();
  const { idEvent } = useParams();
  const tickets = useGetTicketByEventIdQuery(idEvent || '');
  const [freeTicketCheckbox, setFreeTicketCheckBox] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteTicket, setDeteleTicket] = useState<TicketListInfo | null>(null);
  const [currentTicket, setCurrentTicket] = useState<TicketListInfo | null>(null);
  const navigate = useNavigate();
  const [
    deleteTicketMutation,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteTicketMutation();
  const [
    addTicketMutation,
    { isLoading: isLoadingAdd, isSuccess: isSuccessAdd, isError: isErrorAdd, error: errorAdd },
  ] = useAddTicketMutation();
  const [
    updateTicketMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateTicketMutation();

  const errorAddTicket = useMemo(() => {
    if (isFetchBaseQueryError(errorAdd)) {
      return errorAdd;
    }
    return null;
  }, [errorAdd]);
  const errorDeleteTicket = useMemo(() => {
    if (isFetchBaseQueryError(errorDelete)) {
      return errorDelete;
    }
    return null;
  }, [errorDelete]);
  const errorUpdateTicket = useMemo(() => {
    if (isFetchBaseQueryError(errorUpdate)) {
      return errorUpdate;
    }
    return null;
  }, [errorUpdate]);

  const handleRemoveTicket = async (ticket: TicketListInfo) => {
    await deleteTicketMutation(ticket._id);
    tickets.refetch();
    setOpen(false);
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
          if (currentTicket) {
            let check = true;
            tickets?.data?.data?.forEach((ticket: TicketListInfo) => {
              if (value === ticket.type && value !== currentTicket.type) {
                check = false;
              }
            });
            return check;
          } else {
            return !tickets?.data?.data?.find((item: TicketListInfo) => item.type === value);
          }
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
    onSubmit: async (values: TicketListInfo, { resetForm }) => {
      console.log(values);
      try {
        if (currentTicket) {
          await updateTicketMutation({
            ticketId: currentTicket._id,
            body: values,
          });
          setCurrentTicket(null);
          tickets.refetch();
        } else {
          await addTicketMutation({ ...values, event: idEvent });
          tickets.refetch();
        }
        resetForm();
      } catch (err) {
        console.log(err);
      }
      // Handle ticket form submission
    },
  });

  useEffect(() => {
    if (currentTicket) {
      formik.setValues({
        title: currentTicket?.title,
        quantity: currentTicket?.quantity,
        type: currentTicket?.type,
        color: currentTicket?.color,
        price: currentTicket?.price,
        desc: currentTicket?.desc,
      });
    } else {
      formik.resetForm();
    }
  }, [currentTicket]);

  useEffect(() => {
    if (isSuccessAdd) {
      successNotify('Thêm vé thành công');
    }
    if (isErrorAdd) {
      errorNotify('Thêm vé thất bại');
    }
  }, [isErrorAdd, isSuccessAdd]);

  useEffect(() => {
    if (isSuccessDelete) {
      successNotify('Xóa vé thành công');
    }
    if (isErrorDelete) {
      errorNotify('Xóa vé thất bại');
    }
  }, [isErrorDelete, isSuccessDelete]);

  useEffect(() => {
    if (isSuccessUpdate) {
      successNotify('Cập nhật vé thành công');
    }
    if (isErrorUpdate) {
      errorNotify('Cập nhật vé thất bại');
    }
  }, [isErrorUpdate, isSuccessUpdate]);

  return (
    <>
      {isLoadingAdd || isLoadingUpdate || isLoadingDelete ? <Loading /> : <></>}
      <div className="my-5">
        <div>
          {errorAddTicket && (
            <small className="px-2 text-center text-[12px] text-red-600">{(errorAddTicket.data as any).message}</small>
          )}
          {errorUpdateTicket && (
            <small className="px-2 text-center text-[12px] text-red-600">
              {(errorUpdateTicket.data as any).message}
            </small>
          )}
          {errorDeleteTicket && (
            <small className="px-2 text-center text-[12px] text-red-600">
              {(errorDeleteTicket.data as any).message}
            </small>
          )}
        </div>
        <span className="dark:text-cs_light">Danh sách vé: </span>
        {tickets?.data?.data.length < 1 ? (
          <span className="text-cs_semi_green">Vui lòng thêm vé</span>
        ) : (
          <div className="flex flex-wrap gap-4">
            {tickets?.data?.data.map((ticket: TicketListInfo, index: number) => (
              <div key={index} className="relative">
                <div className="cursor-pointer" onClick={() => setCurrentTicket(ticket)}>
                  <TicketCard price={ticket.price} color={ticket.color} title={ticket.title} tooltip={ticket.desc} />
                </div>
                <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-[1px] bg-cs_semi_green ">
                  <Icon
                    onClick={() => {
                      setDeteleTicket(ticket);
                      setOpen(true);
                    }}
                    name="close-outline"
                    className="text-white"
                  />
                </div>
              </div>
            ))}
            <div
              onClick={() => setCurrentTicket(null)}
              className="flex w-fit cursor-pointer items-center justify-center gap-3 rounded-xl bg-cs_semi_green px-4 py-2 text-cs_light"
            >
              Thêm vé
              <Icon name="add-circle-outline"></Icon>
            </div>
          </div>
        )}
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
              <div>
                <input
                  checked={freeTicketCheckbox}
                  onClick={() => setFreeTicketCheckBox(!freeTicketCheckbox)}
                  id="freeTicket"
                  type="checkbox"
                />
                <label className="ml-2.5 dark:text-gray-400" htmlFor="freeTicket">
                  Vé miễn phí
                </label>
              </div>
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
            <div className="flex flex-col gap-3 px-6">
              <span className="dark:text-gray-400">Màu vé ( Phân biệt vé )</span>
              <input
                name="color"
                id="color"
                type="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                className="w-[150px] rounded-lg border-none bg-transparent outline-none"
              />
            </div>
          </div>
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
          <Button
            className="md:w mt-5 w-full"
            type="submit"
            mode="dark"
            value={currentTicket ? 'Lưu thay đổi' : 'Tạo vé'}
          />
        </div>
      </form>
      <Dialog open={open} handler={setOpen} size="xs">
        <DialogHeader>Cảnh báo</DialogHeader>
        <DialogBody className="text-center">Bạn chắc chắn muốn xóa vé {deleteTicket && deleteTicket.title}</DialogBody>
        <DialogFooter className="flex justify-center gap-5">
          <Button mode="dark" value="Xác nhận" onClick={() => deleteTicket && handleRemoveTicket(deleteTicket)} />
          <Button mode="dark" value="Hủy" onClick={() => setOpen(false)} />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TicketList;
