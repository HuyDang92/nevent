import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import Loading from '~/components/customs/Loading';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import { useChangePasswordMutation } from '~/features/Auth/authApi.service';
import * as Yup from 'yup';
import { isFetchBaseQueryError } from '~/utils/helper';
interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}
const ChangePassword = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [changePass, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();

  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Mật khẩu không được bỏ trống'),
      newPassword: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]){6,15}$/,
          'Mật khẩu 6 -15 ký tự, ít nhất 1 chữ cái và 1 số và 1 kí tự đặc biệt',
        ),
      rePassword: Yup.string()
        .required('Xác nhận mật khẩu không được bỏ trống')
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu không trùng khớp'),
    }),
    onSubmit: async (value: IChangePassword, { resetForm }) => {
      await changePass({ oldPassword: value.oldPassword, password: value.newPassword });
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      successNotify('Đổi mật khẩu thành công');
    }
    if (isError) {
      errorNotify('Đổi mật khẩu thất bại');
    }
  }, [isSuccess, isError]);
  return (
    <div>
      {isLoading && <Loading />}
      <h1 className="text-xl font-bold">Đổi mật khẩu</h1>
      <form onSubmit={formik.handleSubmit}>
        {errorForm && (
          <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
        )}
        <div>
          <Input
            id="oldPassword"
            name="oldPassword"
            classNameInput="w-full border"
            type="password"
            label="Mật khẩu cũ"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
          />
          {isSubmitted && formik.errors.oldPassword && (
            <small className="px-2 text-[12px] text-red-600">{formik.errors.oldPassword}</small>
          )}
        </div>
        <Input
          id="newPassword"
          name="newPassword"
          classNameInput="w-full border"
          type="password"
          label="Mật khẩu mới"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
        />
        {isSubmitted && formik.errors.newPassword && (
          <small className="px-2 text-[12px] text-red-600">{formik.errors.newPassword}</small>
        )}
        <Input
          id="rePassword"
          name="rePassword"
          classNameInput="w-full border"
          type="password"
          label="Xác nhận mật khẩu mới"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
        />
        {isSubmitted && formik.errors.rePassword && (
          <small className="px-2 text-[12px] text-red-600">{formik.errors.rePassword}</small>
        )}
        <div className="mt-20 text-right">
          <Button
            className="w-[200px]"
            mode="dark"
            value="Lưu thông tin"
            type="submit"
            onClick={() => setIsSubmitted(true)}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
