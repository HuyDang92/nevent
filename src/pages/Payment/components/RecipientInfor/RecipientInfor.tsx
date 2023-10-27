import { useFormik } from 'formik';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import * as Yup from 'yup';
import { addUserInfor } from '~/features/Payment/paymentSlice';
interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const RecipientInfor = ({ setActiveStep }: Props) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const userInfor = useAppSelector((state) => state.payment.userInfor);
  const formik = useFormik({
    initialValues: userInfor
      ? userInfor
      : {
          fullName: auth?.currentUser?.fullName ?? '',
          email: auth?.currentUser?.email ?? '',
          phone: auth?.currentUser?.phone ?? '',
          address: auth?.currentUser?.address ?? '',
        },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Họ và tên không được bỏ trống'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
      phone: Yup.string().required('Số điện thoại không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
    }),
    onSubmit(values) {
      try {
        dispatch(addUserInfor(values));
        setActiveStep(1);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      <div className="relative flex h-[60px] items-center border-b-[0.5px] px-5">
        <h1 className="absolute w-[calc(100%-40px)] text-center font-bold uppercase md:static md:text-left">
          Thông tin người nhận
        </h1>
      </div>
      <div className="p-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-4">
          <div className="w-full md:w-[calc(50%-8px)]">
            {formik.errors.fullName && (
              <small className="px-2 text-[12px] text-red-600">{formik.errors.fullName}</small>
            )}
            <Input
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              classNameInput="w-full"
              label="Họ và tên"
            />
          </div>
          <div className="w-full md:w-[calc(50%-8px)]">
            {formik.errors.email && <small className="px-2 text-[12px] text-red-600">{formik.errors.email}</small>}
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              classNameInput="w-full"
              label="Email"
            />
          </div>
          <div className="w-full md:w-[calc(50%-8px)]">
            {formik.errors.phone && <small className="px-2 text-[12px] text-red-600">{formik.errors.phone}</small>}
            <Input
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              classNameInput="w-full"
              label="Số điện thoại"
            />
          </div>
          <div className="w-full md:w-[calc(50%-8px)]">
            {formik.errors.address && <small className="px-2 text-[12px] text-red-600">{formik.errors.address}</small>}
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
            <Button className="md:w w-full" type="submit" mode="dark" value="Xác nhận" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipientInfor;
