import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
interface IPaymentInfo {
  owner: string;
  account_num: string;
  bank: string;
  branch: string;
  VAT: boolean;
}

const PaymentInfo = ({ setActiveStep }: Prop) => {
  const formik = useFormik({
    initialValues: {
      owner: '',
      account_num: '',
      bank: '',
      branch: '',
      VAT: false,
    },
    validationSchema: Yup.object({
      owner: Yup.string().required('Chủ tài khoản không được bỏ trống'),
      account_num: Yup.string().required('Số tài khoản không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
      bank: Yup.string().required('Ngân hàng không được bỏ trống'),
      branch: Yup.string().required('Chi nhánh không được bỏ trống'),
    }),
    onSubmit: async (value: IPaymentInfo) => {
      console.log(value);
      setActiveStep(1);
    },
  });
  return (
    <>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className=" w-full rounded-xl p-5 shadow-border-full">
            <div className="flex w-full gap-2">
              <Icon name="card-outline" className="text-3xl dark:text-white" />
              <div className="">
                <h2 className="text-lg font-bold dark:text-white">Thông tin ngân hàng</h2>
                <p className="text-sm text-cs_label_gray dark:text-gray-400">
                  Ticketbox sẽ chuyển tiền thu được từ việc bán vé vào tài khoản ngân hàng của bạn
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl p-3 shadow-border-light dark:bg-cs_formDark">
              <Icon name="alert-circle" className="!w-[6%] text-2xl text-cs_label_gray dark:text-white" />
              <span className="text-sm text-cs_label_gray dark:text-white">
                Tiền (sau khi trừ phí dịch vụ cho Nevent) sẽ được gửi vào tài khoản ngân hàng của bạn sau khi xác nhận
                báo cáo bán hàng 7-10 ngày. Nếu bạn muốn nhận tiền sớm hơn, vui lòng liên hệ với chúng tôi theo số
                0164857214 hoặc nevent@gmai.com
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <div className="relative">
                {formik.errors.owner && (
                  <small className="absolute left-[125px] top-[12px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.owner}
                  </small>
                )}
                <Input
                  label="Chủ tài khoản"
                  className="w-full"
                  classNameInput="w-full"
                  id="owner"
                  name="owner"
                  value={formik.values.owner}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.account_num && (
                  <small className="absolute left-[110px] top-[12px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.account_num}
                  </small>
                )}
                <Input
                  label="Số tài khoản"
                  className="w-full"
                  classNameInput="w-full"
                  id="account_num"
                  name="account_num"
                  value={formik.values.account_num}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.bank && (
                  <small className="absolute left-[100px] top-[12px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.bank}
                  </small>
                )}
                <Input
                  label="Ngân hàng"
                  className="w-full"
                  classNameInput="w-full"
                  id="bank"
                  name="bank"
                  value={formik.values.bank}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.branch && (
                  <small className="absolute left-[93px] top-[12px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.branch}
                  </small>
                )}
                <Input
                  label="Chi nhánh"
                  className="w-full"
                  classNameInput="w-full"
                  id="branch"
                  name="branch"
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <input type="checkbox" className="" id="VAT" name="VAT" />
                <label htmlFor="active_noti" className="font-semibold text-cs_label_gray dark:text-gray-400">
                  Cần hóa đơn VAT màu đỏ
                </label>
              </div>
            </div>
          </div>

          <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Đăng sự kiện" />
        </form>
      </div>
    </>
  );
};
export default PaymentInfo;
