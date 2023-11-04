import { useFormik } from 'formik';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
interface Prop {
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddTimeline = ({ handler }: Prop) => {
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
        </form>
      </div>
    </div>
  );
};

export default AddTimeline;
