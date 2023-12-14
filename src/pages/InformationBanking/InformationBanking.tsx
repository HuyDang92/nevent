import { useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import * as Yup from 'yup';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import { useUpdateInformationBankingMutation } from '~/features/Payment/paymentApi.service';
import { isFetchBaseQueryError } from '~/utils/helper';
import Loading from '~/components/customs/Loading';
import { useGetProfileQuery } from '~/features/Auth/authApi.service';
interface IInformationBanking {
  bank_name: string;
  bank_number: number;
  branch: string;
  owner: string;
}
export default function InformationBanking() {
  const [updateInformationBanking, { isLoading, isSuccess, isError, error }] = useUpdateInformationBankingMutation();
  const userProfile = useGetProfileQuery();
  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);
  const formik = useFormik({
    initialValues: {
      bank_name: '',
      bank_number: 0,
      branch: '',
      owner: '',
    },
    validationSchema: Yup.object({
      bank_name: Yup.string().required('Tên ngân hàng không được bỏ trống'),
      bank_number: Yup.number().required('Số TK ngân hàng không được bỏ trống'),
      branch: Yup.string().required('Chi nhánh không được bỏ trống'),
      owner: Yup.string().required('Chủ TK phải không được bỏ trống'),
    }),
    onSubmit: async (values: IInformationBanking) => {
      console.log(values);
      try {
        await updateInformationBanking(values);
      } catch (err) {
        console.log(err);
      }
    },
  });
  useEffect(() => {
    if (userProfile?.data?.data.bank) {
      formik.setValues({
        bank_name: userProfile?.data?.data.bank?.bank_name,
        bank_number: userProfile?.data?.data.bank?.bank_number,
        branch: userProfile?.data?.data.bank?.branch,
        owner: userProfile?.data?.data.bank?.owner,
      });
    }
  }, [userProfile]);
  useEffect(() => {
    if (isSuccess) {
      successNotify('Cập nhật thông tin ngân hàng thành công');
    }
    if (isError) {
      errorNotify('Cập nhật thông tin ngân hàng thất bại');
    }
  }, [isSuccess, isError]);
  return (
    <>
      {isLoading && <Loading />}
      <div className="h-full w-full rounded-2xl bg-cs_light p-3 dark:bg-cs_lightDark dark:text-cs_light xl:p-7">
      <h1 className="text-2xl font-semibold">Thông tin ngân hàng</h1>
          <div className="mt-4 rounded-xl p-10 shadow-border-light">
            <div>
              <h1 className="text-xl font-semibold">Thông tin tài khoản ngân hàng của bạn</h1>
              <i className="text-sm text-gray-600">
                Nevent sẽ chuyển tiền thu được từ việc bán vé vào tài khoản ngân hàng của bạn
              </i>
            </div>
            <div className="my-5 rounded-lg border p-2 text-sm text-gray-600">
              <Icon name="information-circle-outline" /> Tiền bán vé (sau khi trừ phí dịch vụ cho Nevent) sẽ vào tài khoản
              của bạn sau khi xác nhận sale report từ 7 - 10 ngày. Nếu bạn muốn nhận được tiền sớm hơn, vui lòng liên hệ
              chúng tôi qua số 099999999 hoặc info@nevent.vn
            </div>
            {errorForm && (
              <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-8 grid grid-cols-2 gap-4 border-b border-gray-300 pb-8">
                <div className="relative">
                  {formik.errors.owner && (
                    <small className="absolute left-[110px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.owner}
                    </small>
                  )}
                  <Input
                    name="owner"
                    id="owner"
                    label="Chủ tài khoản"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.owner ?? ''}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative">
                  {formik.errors.bank_number && (
                    <small className="absolute left-[100px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.bank_number}
                    </small>
                  )}
                  <Input
                    type="number"
                    name="bank_number"
                    id="bank_number"
                    label="Số tài khoản"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.bank_number ?? ''}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative">
                  {formik.errors.bank_name && (
                    <small className="absolute left-[90px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.bank_name}
                    </small>
                  )}
                  <Input
                    name="bank_name"
                    id="bank_name"
                    label="Ngân hàng"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.bank_name ?? ''}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="relative">
                  {formik.errors.branch && (
                    <small className="absolute left-[90px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.branch}
                    </small>
                  )}
                  <Input
                    name="branch"
                    id="branch"
                    label="Chi nhánh"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.branch ?? ''}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              {/* <div className="mt-5 flex items-center gap-2">
                <input type="checkbox" />
                <label htmlFor="" className="text-sm text-gray-600">
                  <i>Cần có hóa đơn VAT màu đỏ</i>
                </label>
              </div> */}
              <div className="flex justify-end">
                <button className="mt-5 rounded-lg bg-cs_semi_green px-4 py-2 font-semibold text-white">
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
      </div>
    </>
  );
}
