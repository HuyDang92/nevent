import { Radios, Radio } from '~/components/customs/Radio';
import Input from '~/components/customs/Input';
import * as Yup from 'yup';
import Button from '~/components/customs/Button';
import { useFormik } from 'formik';
import { useUpdateProfileMutation } from '~/features/Auth/authApi.service';
import { useEffect, useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { setAuthCurrentUser } from '~/features/Auth/authSlice';

interface UserInfoProp {
  className?: string;
  data?: IUserField | null;
}

const UserInfo = ({ data, className }: UserInfoProp) => {
  const dispatch = useAppDispatch();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [updateProfile, result] = useUpdateProfileMutation();
  const formik = useFormik({
    initialValues: {
      // username: data?.username ?? '',
      fullName: data?.fullName ?? '',
      phone: data?.phone ?? '',
    },
    validationSchema: Yup.object({
      // username: Yup.string().required('Username không được bỏ trống'),
      fullName: Yup.string().required('Họ và tên không được bỏ trống'),
      phone: Yup.string().required('Số điện thoại không được bỏ trống'),
    }),
    onSubmit: async (value: any) => {
      await updateProfile(value);
    },
  });
  useEffect(() => {
    if (result.isSuccess) {
      successNotify('Cập nhật thông tin thành công');
      dispatch(setAuthCurrentUser(result?.data?.data?.userUpdated));
    }
    if (result.isError) {
      errorNotify('Cập nhật thông tin thất bại');
    }
  }, [result.isSuccess, result.isError]);

  return (
    <div className={`${className}`}>
      {result.isLoading && <Loading />}
      <h1 className="text-xl font-bold">Thông tin tài khoản</h1>
      <form onSubmit={formik.handleSubmit} className="flex-wrap gap-5 sm:flex">
        {/* <div className="w-full md:w-[calc(50%-20px)]">
          <Input
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            classNameInput={`w-full  ${isSubmitted && formik.errors.username ? 'border-red-500 border' : ''}`}
            label="Username"
          />
        </div> */}

        <div className="sm:w-[calc(50%-20px)]">
          <Input readonly={true} value={data?.email} classNameInput={`w-full bg-[#eee]`} label="Email" />
        </div>
        <div className="sm:w-[calc(50%-20px)]">
          <Input
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            label="Họ và tên"
            classNameInput={`w-full ${isSubmitted && formik.errors.fullName ? 'border-red-500 border' : ''}`}
          />
        </div>
        <div className="w-full md:w-[calc(50%-20px)]">
          <Input
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            classNameInput={`w-full`}
            label="Số điện thoại"
          />
        </div>

        {/* <div className="w-full md:w-[calc(50%-20px)]">
          <Radios label="Giới tính" classNameInput="flex gap-4">
            <Radio className="flex gap-2" name="gender" label="Nam" id="nam" />
            <Radio className="flex gap-2" name="gender" label="Nữ" id="nu" />
          </Radios>
        </div> */}
        <div className="mt-5 w-full text-right sm:mt-0">
          <Button
            onClick={() => setIsSubmitted(true)}
            type="submit"
            className="w-[230px]"
            value="Lưu thông tin"
            mode="dark"
          />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
