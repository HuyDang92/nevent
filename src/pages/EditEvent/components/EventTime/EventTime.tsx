import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router';
// import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { setEventTime } from '~/features/Business/businessSlice';
import { useGetEventByIdQuery, useUpdateEventMutation } from '~/features/Event/eventApi.service';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Loading from '~/components/customs/Loading';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import { isFetchBaseQueryError } from '~/utils/helper';
const EventTime = () => {
  const { idEvent } = useParams();
  const dispatch = useAppDispatch();
  const event = useGetEventByIdQuery(idEvent || '');
  const [updateEvent, { isLoading, isSuccess, isError, error }] = useUpdateEventMutation();
  const navigate = useNavigate();
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  const mergeDate = (date: string, time: string) => {
    const newDate = new Date(date);
    const [hour, minutes] = time.split(':');
    newDate.setHours(Number(hour) + 7);
    newDate.setMinutes(Number(minutes));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    console.log(newDate);
    const isoDateTime = newDate.toISOString();
    console.log(isoDateTime);
    return isoDateTime;
  };

  const formik = useFormik({
    initialValues: {
      beginDate: '',
      endDate: '',
      beginTime: '',
      endTime: '',
      happendDate: '',
      happendTime: '',
    },
    validationSchema: Yup.object({
      beginDate: Yup.date()
        .required('Ngày bắt đầu không được bỏ trống'),
        // .min(date, 'Ngày bắt đầu bán vé không thể trước hôm nay'),
      beginTime: Yup.string().required('Thời gian bắt đầu không được bỏ trống'),
      endDate: Yup.date()
        .required('Ngày kết thúc không được bỏ trống')
        .min(Yup.ref('beginDate'), 'Ngày kết thúc phải sau ngày bắt đầu'),
      endTime: Yup.string().required('Thời gian kết thúc không được bỏ trống'),
      happendDate: Yup.date()
        .required('Ngày tổ chức không được bỏ trống')
        .min(Yup.ref('endDate'), 'Ngày tổ chức phải sau ngày kết thúc bán vé'),
      happendTime: Yup.string().required('Thời thời gian tổ chức không được bỏ trống'),
    }),
    onSubmit: async (values: IAddTimeline) => {
      const data = {
        start_date: mergeDate(values?.happendDate, values?.happendTime),
        salesStartDate: mergeDate(values?.beginDate, values?.beginTime),
        salesEndDate: mergeDate(values?.endDate, values?.endTime),
      };
      console.log(values);

      console.log(data);

      await updateEvent({
        eventId: idEvent,
        body: {
          start_date: mergeDate(values?.happendDate, values?.happendTime),
          salesStartDate: mergeDate(values?.beginDate, values?.beginTime),
          salesEndDate: mergeDate(values?.endDate, values?.endTime),
        },
      });
      try {
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      successNotify('Cập nhật thành công');
    }
    if (isError) {
      errorNotify('Cập nhật thất bại');
    }
  }, [isError, isSuccess]);

  // Set old value
  useEffect(() => {
    if (event?.data?.data) {
      const state_date = new Date(event?.data?.data?.start_date).toISOString().split('T') || ['', ''];
      const salesStartDate = new Date(event?.data?.data.salesStartDate).toISOString().split('T');
      const salesEndDate = new Date(event?.data?.data.salesEndDate).toISOString().split('T');
      formik.setValues({
        beginDate: salesStartDate[0],
        endDate: salesEndDate[0],
        beginTime: salesStartDate[1].split('.')[0],
        endTime: salesEndDate[1].split('.')[0],
        happendDate: state_date[0],
        happendTime: state_date[1].split('.')[0],
      });
    }
  }, [event.isSuccess]);
  return (
    <>
      {isLoading && <Loading />}
      {event.isLoading && <Loading />}
      <div className="w-full overflow-hidden">
        <div className="rounded-lg border-2 border-cs_semi_green">
          <div className="flex items-center justify-between bg-cs_semi_green px-5 py-3 text-cs_light">
            <span>Vui lòng nhập thời gian tổ chức sự kiện</span>
            {/* <Icon className="text-2xl" name="trash-sharp" /> */}
          </div>
          <div className="p-5">
            {errorForm && (
              <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              className="flex flex-col gap-[18px] font-semibold text-cs_grayText"
            >
              <h1 className="font-semibold text-cs_semi_green">Thời gian bán vé</h1>
              <div className="flex flex-wrap justify-between gap-[40px]">
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
              <h1 className="font-semibold text-cs_semi_green">Ngày tổ chức sự kiện</h1>
              <div className="flex flex-wrap justify-between gap-[40px]">
                <div className="flex w-[calc(50%-30px)] items-center justify-between">
                  <span className="w-1/5 dark:text-gray-400">Ngày:</span>
                  <div className="relative w-4/5">
                    {formik.errors.happendDate && (
                      <small className="absolute -top-[20px] z-10 px-2 text-[12px] font-light text-red-600">
                        {formik.errors.happendDate}
                      </small>
                    )}
                    <Input
                      classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                      className="!w-full"
                      type="date"
                      name="happendDate"
                      value={formik.values.happendDate}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="flex w-[calc(50%-30px)] items-center justify-between">
                  <span className="w-1/5 dark:text-gray-400">Thời gian:</span>
                  <div className="relative w-4/5">
                    {formik.errors.happendTime && (
                      <small className="absolute -top-[20px] z-10 px-2 text-[12px] font-light text-red-600">
                        {formik.errors.happendTime}
                      </small>
                    )}
                    <Input
                      type="time"
                      classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                      className="!w-full"
                      name="happendTime"
                      value={formik.values.happendTime}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Lưu thông tin" />
            </form>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/organization/edit-event/${idEvent}/2`)}
          className="md:w mt-5 w-full"
          type="submit"
          mode="dark"
          value="Tiếp tục"
        />
      </div>
    </>
  );
};
export default EventTime;
