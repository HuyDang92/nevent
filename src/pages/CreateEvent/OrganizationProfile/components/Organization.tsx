import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateBusinessMutation,
} from '~/features/Business/business.service';
import { useEffect, useMemo, useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import { isFetchBaseQueryError } from '~/utils/helper';
import Loading from '~/components/customs/Loading';
import { setAuthCurrentUser, setBusinessProfile } from '~/features/Auth/authSlice';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import ZoomComp from '~/components/customs/Zoom/Zoom';
import Icon from '~/components/customs/Icon';
import { useGetLocationsQuery } from '~/features/location/location.service';
import { useUploadFile } from '~/hooks/useUpLoadFile';

interface IOrganizationInfo {
  organization_name: string;
  fullName: string;
  CRN: string;
  releasePlace: string;
  releaseDate: string;
  description: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  cccd: string;
  taxCode: string;
}
const Organization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [updateBusiness, { data, isError, isLoading, error, isSuccess }] = useUpdateBusinessMutation();
  const userProfile = useGetProfileQuery();
  const [getProfile] = useLazyGetProfileQuery();
  const getLocation = useGetLocationsQuery();
  const { upLoad, loading } = useUploadFile();

  // address
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [wardList, setWardList] = useState<any[]>([]);

  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  const formik = useFormik({
    initialValues: {
      organization_name: '',
      fullName: '',
      CRN: '',
      releasePlace: '',
      releaseDate: '',
      description: '',
      phone: '',
      email: '',
      city: '',
      district: '',
      ward: '',
      cccd: '',
      taxCode: '',
    },
    validationSchema: Yup.object({
      organization_name: Yup.string().required('Tên ban tổ chức không được bỏ trống'),
      fullName: Yup.string().required('Tên người tổ chức không được bỏ trống'),
      CRN: Yup.string().required('Số đăng ký không được bỏ trống'),
      description: Yup.string().required('Giới thiệu ban tổ chức không được bỏ trống'),
      releasePlace: Yup.string().required('Nơi phát hành không được bỏ trống'),
      releaseDate: Yup.string().required('Ngày phát hành không được bỏ trống'),
      phone: Yup.string().required('Số điện thoại không được bỏ trống'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
      city: Yup.string().required('Thành phố/Tỉnh không được bỏ trống'),
      district: Yup.string().required('Huyện không được bỏ trống'),
      ward: Yup.string().required('Phường không được bỏ trống'),
      cccd: Yup.string().required('Căn cước công dân không được bỏ trống'),
      taxCode: Yup.string().required('Mã số thuế không được bỏ trống'),
    }),
    onSubmit: async (value: IOrganizationInfo) => {
      console.log(value);
      if (selectedFile) {
        const avatarId = await upLoad(selectedFile);
        await updateBusiness({
          type: 'business',
          address: `${value.ward}, ${value.district}, ${value.city}`,
          cccd: value.cccd,
          crn: value.CRN,
          dateOfIssue: value.releaseDate,
          name: value.fullName,
          placeOfIssue: value.releasePlace,
          taxCode: value.taxCode,
          organization_name: value.organization_name,
          description: value.description,
          phone: value.phone,
          email: value.email,
          avatar: avatarId,
        });
      } else {
        await updateBusiness({
          type: 'business',
          address: `${value.ward}, ${value.district}, ${value.city}`,
          cccd: value.cccd,
          crn: value.CRN,
          dateOfIssue: value.releaseDate,
          name: value.fullName,
          placeOfIssue: value.releasePlace,
          taxCode: value.taxCode,
          organization_name: value.organization_name,
          description: value.description,
          phone: value.phone,
          email: value.email,
        });
      }
      const user = await getProfile().unwrap();
      console.log('user', user);
    },
  });
  console.log(userProfile);

  useEffect(() => {
    if (userProfile?.isSuccess) {
      if (userProfile?.data?.data?.role?.name === 'user') {
        navigate('/user/organization-profile');
      } else {
        navigate('/organization/organization-profile');
        console.log(user);
      }
    }
  }, [userProfile.isFetching]);

  useEffect(() => {
    if (isSuccess) {
      successNotify('Cập nhật thành công');
    }
    if (isError) {
      errorNotify('Cập nhật thất bại');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (userProfile?.data?.data?.businessProfile) {
      // Set business avatar as preview image
      setImagePreviewUrl(userProfile?.data?.data?.businessProfile?.avatar);

      // Handle locations
      const location = userProfile?.data?.data?.businessProfile?.address?.split(', ');
      const [ward, district, city] = location ?? [];
      const districts = getLocation?.data?.find((location: any) => location.name === city)?.districts;
      setDistrictList(districts);
      const wards = districts?.find((location: any) => location.name === district)?.wards;
      setWardList(wards);

      // Set old data
      formik.setValues({
        organization_name: userProfile?.data?.data?.businessProfile?.organization_name,
        fullName: userProfile?.data?.data?.businessProfile?.name,
        CRN: userProfile?.data?.data?.businessProfile?.crn,
        releasePlace: userProfile?.data?.data?.businessProfile?.placeOfIssue,
        releaseDate: userProfile?.data?.data?.businessProfile?.dateOfIssue,
        description: userProfile?.data?.data?.businessProfile?.description,
        phone: userProfile?.data?.data?.businessProfile?.phone,
        email: userProfile?.data?.data?.businessProfile?.email,
        city: city,
        district: district,
        ward: ward,
        cccd: userProfile?.data?.data?.businessProfile?.cccd,
        taxCode: userProfile?.data?.data?.businessProfile?.taxCode,
      });
    } else {
      // Use user data as default
      formik.initialValues.fullName = userProfile?.data?.data?.fullName;
      formik.initialValues.email = userProfile?.data?.data?.email;
      formik.initialValues.phone = userProfile?.data?.data?.phone;
    }
  }, [userProfile, getLocation]);

  return (
    <>
      {(isLoading || userProfile?.isLoading || getLocation.isLoading || loading) && <Loading />}
      <div className="mt-2">
        <form onSubmit={formik.handleSubmit} className="">
          <h2 className="mb-2 mt-4 text-lg font-semibold dark:text-white">Thông tin nhà tổ chức</h2>
          {errorForm && (
            <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
          )}
          <div className="grid w-full grid-cols-2 gap-2">
            <div className="relative">
              {formik.errors.organization_name && (
                <small className="absolute left-[130px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.organization_name}
                </small>
              )}
              <Input
                name="organization_name"
                id="organization_name"
                label="Tên ban tổ chức"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.organization_name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.fullName && (
                <small className="absolute left-[140px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.fullName}
                </small>
              )}
              <Input
                name="fullName"
                id="fullName"
                label="Tên người tổ chức"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.fullName || userProfile?.data?.data.fullName}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.CRN && (
                <small className="absolute left-[190px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.CRN}
                </small>
              )}
              <Input
                name="CRN"
                id="CRN"
                label="Số đăng ký công ty (CRN)"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.CRN}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.releasePlace && (
                <small className="absolute left-[115px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.releasePlace}
                </small>
              )}
              <Input
                name="releasePlace"
                id="releasePlace"
                label="Nơi phát hành"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.releasePlace}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.cccd && (
                <small className="absolute left-[150px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.cccd}
                </small>
              )}
              <Input
                name="cccd"
                id="cccd"
                label="Căn cước công dân"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.cccd}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.taxCode && (
                <small className="absolute left-[95px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.taxCode}
                </small>
              )}
              <Input
                name="taxCode"
                id="taxCode"
                label="Mã số thuế"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.taxCode}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.releaseDate && (
                <small className="absolute left-[125px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.releaseDate}
                </small>
              )}
              <Input
                name="releaseDate"
                id="releaseDate"
                label="Ngày phát hành"
                type="date"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.releaseDate}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="relative my-5 w-fit">
            <div className="h-[90px] w-[90px] overflow-hidden rounded-full border-[2px] border-cs_semi_green sm:h-[120px] sm:w-[120px]">
              {!imagePreviewUrl && (
                <ZoomComp>
                  <img className="h-full w-full object-cover" src={DefaultAvatar} alt="" />
                </ZoomComp>
              )}
              {imagePreviewUrl && (
                <ZoomComp>
                  <img
                    className="h-[90px] w-[90px]  object-cover sm:h-[120px] sm:w-[120px]"
                    src={imagePreviewUrl}
                    alt=""
                  />
                </ZoomComp>
              )}
            </div>
            <label
              htmlFor="avatar"
              className="absolute left-[calc(100%/6*5)] top-[calc(100%/6*5)] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1px] border-cs_semi_green bg-cs_light shadow-border-light shadow-cs_light"
            >
              <Icon name="pencil-outline" />
            </label>
            <input
              type="file"
              hidden
              id="avatar"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0];
                if (selectedFile) {
                  setSelectedFile(selectedFile);
                  setImagePreviewUrl(URL.createObjectURL(selectedFile));
                }
              }}
            />
          </div>
          <div className="relative">
            {formik.errors.description && (
              <small className="absolute left-[170px] top-[4px] z-10 px-2 text-[12px] text-red-600">
                {formik.errors.description}
              </small>
            )}
            <label htmlFor="description" className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400">
              Giới thiệu ban tổ chức
            </label>
            <textarea
              name="description"
              id="description"
              className="mt-2 !h-[200px] !w-full rounded-xl p-2 text-sm shadow-border-light  focus:outline-cs_semi_green dark:bg-cs_formDark dark:text-white dark:outline-none"
              placeholder="Nhập giới thiệu về ban tổ chức"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
          <h2 className="mb-2 mt-4 text-lg font-semibold dark:text-white">Thông tin liên lạc</h2>
          <div className="grid w-full grid-cols-2 gap-2">
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
            {/* <div className="relative">
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
                <small className="absolute left-[100px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.district}
                </small>
              )}
              <Input
                name="district"
                id="district"
                label="Quận/Huyện"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.district}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.road && (
                <small className="absolute left-[90px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.road}
                </small>
              )}
              <Input
                name="road"
                id="road"
                label="Phường/Xã"
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
            </div> */}
            <div className="relative pt-3">
              {formik.errors.city && (
                <small className="absolute left-[130px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.city}
                </small>
              )}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Tỉnh / Thành phố
              </label>
              <br />
              <select
                name="city"
                id="city"
                className=" w-[100%] rounded-xl p-[10px] shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
                value={formik.values.city}
                onChange={(e) => {
                  setDistrictList(
                    getLocation?.data?.find((location: any) => location.name === e.target.value)?.districts,
                  );
                  formik.handleChange(e);
                }}
              >
                <option value={''}>Hãy chọn địa chỉ </option>
                {getLocation?.data?.map((location: any, index: number) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative pt-3">
              {formik.errors.district && (
                <small className="absolute left-[110px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.district}
                </small>
              )}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Quận / Huyện
              </label>
              <br />
              <select
                name="district"
                id="district"
                className=" w-[100%] rounded-xl p-[10px] shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
                value={formik.values.district}
                onChange={(e) => {
                  setWardList(districtList.find((location: any) => location.name === e.target.value)?.wards);
                  formik.handleChange(e);
                }}
              >
                <option value={''}>Hãy chọn địa chỉ </option>
                {districtList?.map((location: any, index: number) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative pt-3">
              {formik.errors.ward && (
                <small className="absolute left-[100px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.ward}
                </small>
              )}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Phường / Xã
              </label>
              <br />
              <select
                name="ward"
                id="ward"
                className=" w-[100%] rounded-xl p-[10px] shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
                value={formik.values.ward}
                onChange={formik.handleChange}
              >
                <option value={''}>Hãy chọn địa chỉ </option>
                {wardList?.map((location: any, index: number) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
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
    </>
  );
};
export default Organization;
