import { useFormik } from 'formik';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useAppSelector } from '~/hooks/useActionRedux';

const RecipientInfor = () => {
  const auth = useAppSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      fullName: auth?.currentUser?.fullName ?? '',
      email: auth?.currentUser?.email ?? '',
      phone: auth?.currentUser?.phone ?? '',
      address: auth?.currentUser?.address ?? '',
    },
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <div>
      <div className="flex h-[60px] items-center border-b-[0.5px] px-5">
        <h1 className="font-bold uppercase">Thông tin người nhận</h1>
      </div>
      <div className="p-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-4">
          <div className="w-[calc(50%-8px)]">
            <Input
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              classNameInput="w-full"
              label="Họ và tên"
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              classNameInput="w-full"
              label="Email"
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <Input
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              classNameInput="w-full"
              label="Số điện thoại"
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <Input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              type="text"
              classNameInput="w-full"
              label="Địa chỉ"
            />
          </div>
          <div className="w-full text-right">
            <Button type="submit" mode="dark" value="Xác nhận" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipientInfor;
