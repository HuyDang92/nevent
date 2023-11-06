import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';

interface IOrganizationInfo {
  organization_name: string;
  name: string;
  CRN: string;
  releasePlace: string;
  releaseDate: string;
  description: string;
  tel: string;
  email: string;
  city: string;
  district: string;
  road: string;
  address: string;
}
const Organization = () => {
  const formik = useFormik({
    initialValues: {
      organization_name: '',
      name: '',
      CRN: '',
      releasePlace: '',
      releaseDate: '',
      description: '',
      tel: '',
      email: '',
      city: '',
      district: '',
      road: '',
      address: '',
    },
    validationSchema: Yup.object({
      organization_name: Yup.string().required('Tên ban tổ chức không được bỏ trống'),
      name: Yup.string().required('Tên người tổ chức không được bỏ trống'),
      CRN: Yup.string().required('Số đăng ký không được bỏ trống'),
      description: Yup.string().required('Giới thiệu ban tổ chức không được bỏ trống'),
      releasePlace: Yup.string().required('Nơi phát hành không được bỏ trống'),
      releaseDate: Yup.string().required('Ngày phát hành không được bỏ trống'),
      tel: Yup.string().required('Số điện thoại không được bỏ trống'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
      city: Yup.string().required('Thành phố/Tỉnh không được bỏ trống'),
      district: Yup.string().required('Huyện không được bỏ trống'),
      road: Yup.string().required('Phường không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
    }),
    onSubmit: async (value: IOrganizationInfo) => {
      console.log(value);
    },
  });
  return (
    <>
      <div className="mt-2 flex justify-between">
        <form onSubmit={formik.handleSubmit} className="w-[90%]">
          <h2 className="mb-2 mt-4 text-lg font-semibold dark:text-white">Thông tin nhà tổ chức</h2>
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
              {formik.errors.name && (
                <small className="absolute left-[140px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.name}
                </small>
              )}
              <Input
                name="name"
                id="name"
                label="Tên người tổ chức"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.name}
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

          <div className="relative mt-5">
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
              {formik.errors.tel && (
                <small className="absolute left-[100px] top-[10px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.tel}
                </small>
              )}
              <Input
                name="tel"
                id="tel"
                label="Số điện thoại"
                classNameLabel="dark:!text-gray-400 !text-cs_label_gray !text-sm"
                classNameInput=" !w-full dark:text-white"
                value={formik.values.tel}
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
    </>
  );
};
export default Organization;