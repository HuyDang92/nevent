import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
// import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { setEventTime } from '~/features/Business/businessSlice';

const EventTime = () => {
  const dispatch = useAppDispatch();
  const eventTime = useAppSelector((state) => state.bussiness.eventTime);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: eventTime
      ? eventTime
      : {
          beginDate: '',
          endDate: '',
          beginTime: '',
          endTime: '',
        },
    validationSchema: Yup.object({
      beginDate: Yup.string().required('Ngày bắt đầu không được bỏ trống'),
      beginTime: Yup.string().required('Thời gian bắt đầu không được bỏ trống'),
      endDate: Yup.string().required('Ngày kết thúc không được bỏ trống'),
      endTime: Yup.string().required('Thời gian kết thúc không được bỏ trống'),
    }),
    onSubmit: (values: IAddTimeline) => {
      console.log(values);
      try {
        dispatch(setEventTime(values));
        navigate(`/organization/create-event/2`);
      } catch (err) {
        console.log(err);
      }
      // Handle event timeline form submission
    },
  });

  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="rounded-lg border-2 border-cs_semi_green">
          <div className="flex items-center justify-between bg-cs_semi_green px-5 py-3 text-cs_light">
            <span>Vui lòng nhập thời gian tổ chức sự kiện</span>
            {/* <Icon className="text-2xl" name="trash-sharp" /> */}
          </div>
          <div className="p-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              className="flex flex-col gap-[18px] font-semibold text-cs_grayText"
            >
              <h1 className="font-semibold text-cs_semi_green">Ngày tổ chức</h1>
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
              <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Tiếp tục" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventTime;
