import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '~/components/customs/Input';
import { Radio } from '~/components/customs/Radio';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { setEventSetting } from '~/features/Business/businessSlice';
import { useNavigate } from 'react-router-dom';

const EventSettings = () => {
  const dispatch = useAppDispatch();
  const eventSetting = useAppSelector((state) => state.business.eventSetting);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: eventSetting
      ? eventSetting
      : {
          URL: '',
          privacy: '',
          name: '',
          noti: '',
          active_noti: false,
        },
    validationSchema: Yup.object({
      URL: Yup.string().required('URL sự kiện không được bỏ trống'),
      privacy: Yup.string()
        .required('Vui lòng chọn quyền riêng tư')
        .oneOf(['public', 'private'], 'Vui lòng chọn một tùy chọn quyền riêng tư.'),
    }),
    onSubmit: async (values: IEventSettings) => {
      console.log(values);
      try {
        dispatch(setEventSetting(values));
        navigate('/organization/create-event/4');
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full rounded-xl p-5 shadow-border-full dark:bg-cs_lightDark">
          <div className="border-b-[1px] pb-6 dark:border-b-gray-600">
            <h2 className="flex items-center gap-2 text-lg font-bold dark:text-white">
              <Icon name="link-outline" className="text-2xl" />
              URL Event
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-cs_label_gray dark:text-gray-400">
                https://nevent/envent/
              </span>
              <div className="relative">
                {formik.errors.URL && (
                  <small className="absolute -top-[20px] z-10 px-2 text-[12px] text-red-600">{formik.errors.URL}</small>
                )}
                <Input
                  placeholder="Tên đường dẫn..."
                  name="URL"
                  id="URL"
                  classNameInput="!text-sm w-[300px]"
                  value={formik.values.URL}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="border-b-[1px] py-6 dark:border-b-gray-600">
            <h2 className="flex items-center gap-2 text-lg font-bold dark:text-white">
              <Icon name="lock-closed" className="text-xl" />
              Quyền riêng tư của sự kiện
            </h2>
            {formik.errors.privacy && (
              <small className="z-10 px-2 text-[12px] text-red-600">{formik.errors.privacy}</small>
            )}
            <div className="ml-6 mt-3 flex flex-col justify-center gap-2">
              <Radio
                label={
                  <div className=" flex flex-col">
                    <p className="font-semibold text-cs_label_gray dark:text-white">Sự kiện công khai</p>
                    <span className="text-xs font-light dark:text-gray-400">
                      Sự kiện này sẽ mở công khai cho sự kiện
                    </span>
                  </div>
                }
                id="privacy"
                name="privacy"
                icon="globe-outline"
                classNameIcon="bg-gray-200 p-1 rounded-lg text-cs_label_gray text-2xl"
                className="flex items-center gap-6"
                classNammeInput="w-4 h-4"
                value="public"
                checked={formik.values.privacy === 'public'}
                onChange={() => formik.setFieldValue('privacy', 'public')}
              />
              <Radio
                label={
                  <div className=" flex flex-col">
                    <p className="font-semibold text-cs_label_gray dark:text-white">Sự kiện riêng tư</p>
                    <span className="text-xs font-light dark:text-gray-400">
                      Sự kiện này chỉ dành cho những người có liên kết trực tiếp
                    </span>
                  </div>
                }
                id="privacy2"
                name="privacy"
                icon="lock-closed-outline"
                classNameIcon="bg-gray-200 p-1 rounded-lg text-cs_label_gray text-2xl"
                className="flex items-center gap-6"
                classNammeInput="w-4 h-4"
                value="private"
                checked={formik.values.privacy === 'private'}
                onChange={() => formik.setFieldValue('privacy', 'private')}
              />
            </div>
          </div>
          <div className="border-b-[1px] py-6 dark:border-b-gray-600">
            <h2 className="flex items-center gap-2 text-lg font-bold dark:text-white">
              <Icon name="notifications" className="text-2xl" />
              Thông báo cho người tham gia sự kiện
            </h2>
            <div className="ml-6 flex flex-col gap-4 ">
              <span className="text-sm text-cs_label_gray dark:text-gray-400">
                Tin nhắn xác nhận này sẽ được gửi đến người tham dự cùng với xác nhận đặt chỗ của họ sau khi đăng ký
                thành công
              </span>
              <textarea
                name="noti"
                id="noti"
                className="h-[120px] w-full rounded-xl p-3 text-sm shadow-border-full focus:outline-cs_semi_green dark:bg-cs_formDark dark:text-white"
                placeholder="(Không bắt buộc)"
                value={formik.values.noti}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full text-right"></div>
        <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Tiếp tục" />
      </form>
    </>
  );
};
export default EventSettings;
