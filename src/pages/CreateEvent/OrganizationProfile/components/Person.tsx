import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useGetProfileQuery } from '~/features/Auth/authApi.service';
import { useUpdateBusinessMutation } from '~/features/Business/business.service';
import { useEffect, useMemo } from 'react';
import { isFetchBaseQueryError } from '~/utils/helper';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';

interface IPersonInfo {
  fullName: string;
  taxCode: string; //Mã số thuế cá nhân
  description: string;
  phone: string;
  email: string;
  cccd: string;
  city: string;
  district: string;
  road: string;
  address: string;
}
const Person = () => {
  const [updateBusiness, { isError, isLoading, error, isSuccess }] = useUpdateBusinessMutation();
  const userProfile = useGetProfileQuery();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      description: '',
      taxCode: '',
      cccd: '',
      phone: '',
      email: '',
      city: '',
      district: '',
      road: '',
      address: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Tên tổ chức không được bỏ trống'),
      taxCode: Yup.string().required('TNCN không được bỏ trống'),
      cccd: Yup.string().required('Căn cước công dân không được bỏ trống'),
      description: Yup.string().required('Giới thiệu cá nhân không được bỏ trống'),
      phone: Yup.string().required('Số điện thoại không được bỏ trống'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
      city: Yup.string().required('Thành phố/Tỉnh không được bỏ trống'),
      district: Yup.string().required('Huyện không được bỏ trống'),
      road: Yup.string().required('Phường không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
    }),
    onSubmit: async (value: IPersonInfo) => {
      await updateBusiness({
        type: 'personal',
        address: `${value.address},${value.road},${value.district},${value.city}`,
        cccd: value.cccd,
        taxCode: value.taxCode,
        name: value.fullName,
        description: value.description,
        phone: value.phone,
        email: value.email,
      });
    },
  });
  useEffect(() => {
    if (userProfile.isSuccess && userProfile.data) {
      const location = userProfile?.data?.data?.businessProfile.address?.split(',');
      const [address, road, district, city] = location ?? [];
      formik.setValues({
        fullName: userProfile?.data?.data?.businessProfile.name,
        description: userProfile?.data?.data?.businessProfile.description,
        phone: userProfile?.data?.data?.businessProfile.phone,
        email: userProfile?.data?.data?.businessProfile.email,
        city: city,
        district: district,
        road: road,
        address: address,
        cccd: userProfile?.data?.data?.businessProfile.cccd,
        taxCode: userProfile?.data?.data?.businessProfile.taxCode,
      });
    }
  }, [userProfile, userProfile?.isSuccess]);
  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      successNotify('Cập nhật thành công');
    }
    if (isError) {
      errorNotify('Cập nhật thất bại');
    }
  }, [isSuccess, isError]);
  return (
    <>
      {isLoading && <Loading />}
      {userProfile.isFetching && <Loading />}
      {!userProfile.isFetching && (
        <div className="mt-2 flex w-full justify-between">
          <form onSubmit={formik.handleSubmit} className="w-[90%]">
            <h2 className="mb-2 mt-4 text-lg font-semibold dark:text-white">Thông tin cơ bản</h2>
            {errorForm && (
              <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
            )}
            <div className="grid w-full grid-cols-2 gap-2">
              <div className="relative">
                {formik.errors.fullName && (
                  <small className="absolute left-[70px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.fullName}
                  </small>
                )}
                <Input
                  name="fullName"
                  id="fullName"
                  label="Họ & tên"
                  classNameLabel="!text-cs_label_gray !text-sm"
                  classNameInput="!w-full"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.taxCode && (
                  <small className="absolute left-[205px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.taxCode}
                  </small>
                )}
                <Input
                  name="taxCode"
                  id="taxCode"
                  label="Mã số thuế cá nhân (TNCN)"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.taxCode}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="relative">
                {formik.errors.phone && (
                  <small className="absolute left-[100px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.phone}
                  </small>
                )}
                <Input
                  name="phone"
                  id="phone"
                  label="Số điện thoại"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.email && (
                  <small className="absolute left-[50px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.email}
                  </small>
                )}
                <Input
                  name="email"
                  id="email"
                  label="Email"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.cccd && (
                  <small className="absolute left-[105px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.cccd}
                  </small>
                )}
                <Input
                  name="cccd"
                  id="cccd"
                  label="CMND/CCCD"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.cccd}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="relative mt-5">
              {formik.errors.description && (
                <small className="absolute left-[140px] top-[4px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.description}
                </small>
              )}
              <label htmlFor="description" className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Giới thiệu cá nhân
              </label>
              <textarea
                name="description"
                id="description"
                className="mt-2 !h-[200px] !w-full rounded-xl p-2 text-sm shadow-border-light  focus:outline-cs_semi_green dark:bg-cs_formDark dark:text-white dark:outline-none"
                placeholder="Nhập giới thiệu"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            <h2 className="mb-2 mt-4 text-lg font-semibold dark:text-white">Địa chỉ thường trú</h2>
            <div className="grid w-full grid-cols-2 gap-2">
              <div className="relative">
                {formik.errors.city && (
                  <small className="absolute left-[125px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.city}
                  </small>
                )}
                <Input
                  name="city"
                  id="city"
                  label="Thành phố/Tỉnh"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.district && (
                  <small className="absolute left-[60px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.district}
                  </small>
                )}
                <Input
                  name="district"
                  id="district"
                  label="Huyện"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.road && (
                  <small className="absolute left-[70px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.road}
                  </small>
                )}
                <Input
                  name="road"
                  id="road"
                  label="Phường"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.road}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="relative">
                {formik.errors.address && (
                  <small className="absolute left-[60px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                    {formik.errors.address}
                  </small>
                )}
                <Input
                  name="address"
                  id="address"
                  label="Địa chỉ"
                  classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                  classNameInput=" !w-full dark:text-white"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                className="mt-3 w-1/5 !bg-cs_semi_green font-semibold text-white"
                value="Lưu thông tin"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default Person;
