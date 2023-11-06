import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';

interface Prop {
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IAddTimeline {
  beginDate: string;
  endDate: string;
  beginTime: string;
  endTime: string;
}
const AddTimeline = ({ handler }: Prop) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
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

      navigate(`/create-event/2`);
      // Handle event timeline form submission
    },
  });

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
                  <small className="absolute left-[0px] top-[10px] z-10 px-2 text-[12px] text-red-600">
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
              <Input
                type="time"
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="beginTime"
                value={formik.values.beginTime}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex w-[calc(50%-30px)] items-center justify-between">
              <span className="w-1/5 dark:text-gray-400">Đến:</span>
              <Input
                type="date"
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex w-[calc(50%-30px)] items-center justify-between">
              <span className="w-1/5 dark:text-gray-400">Thời gian:</span>
              <Input
                type="time"
                classNameInput="w-full border-2 shadow-none border-[#cccccc] dark:border-none"
                className="!w-4/5"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimeline;
