import { Radios, Radio } from '../customs/Radio';
import Input from '../customs/Input';
import * as Yup from 'yup';
import Button from '../customs/Button';
import { useFormik } from 'formik';

interface UserInfoProp {
  className?: string;
  data: IUserField;
}

interface IUserInfo {
  fullName: string;
  phone: string;
  createdAt: string;
}

const UserInfo = ({ data, className }: UserInfoProp) => {
  const formik = useFormik({
    initialValues: {
      fullName: data.fullName,
      phone: data.phone,
      createdAt: data.createdAt,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Họ và tên không được bỏ trống'),
      phone: Yup.string().required('Số điện thoại không được bỏ trống'),
      createdAt: Yup.string().required('Ngày sinh không được bỏ trống'),
    }),
    onSubmit: async (value: IUserInfo) => {
      console.log('submiting');
      console.log(value);
    },
  });

  return (
    <div className={`${className}`}>
      <h1 className="text-2xl font-bold">Thông tin tài khoản</h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-10">
        <div className="w-[calc(50%-20px)]">
          <Input
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            label="Họ và tên"
            classNameInput="w-full"
          />
        </div>
        <div className="w-[calc(50%-20px)]">
          <Input readonly={true} value={data.email} classNameInput="w-full" label="Email" />
        </div>
        <div className="w-[calc(50%-20px)]">
          <Input
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            classNameInput="w-full"
            label="Số điện thoại"
          />
        </div>
        <div className="w-[calc(50%-20px)]">
          <Input
            id="createdAt"
            name="createdAt"
            value={undefined}
            onChange={formik.handleChange}
            type="date"
            classNameInput="w-full"
            label="Ngày sinh"
          />
        </div>
        <div className="w-full">
          <Radios label="Giới tính" classNameInput="flex gap-4">
            <Radio className="flex gap-2" name="gender" label="Nam" id="nam" />
            <Radio className="flex gap-2" name="gender" label="Nữ" id="nu" />
          </Radios>
        </div>
        <div className="w-full text-right">
          <Button type="submit" className="w-[230px]" value="Lưu thông tin" mode="dark" />
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
