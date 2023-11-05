import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import Chamaleon2 from '~/assets/images/chamaleon-2.svg';
import { useState } from 'react';
import banner3 from '~/assets/images/banner3.jpg';
import { useUploadFile } from '~/hooks/useUpLoadFile';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

interface IEventInfo {
  banner: string;
  logo: string;
  name: string;
  location: string;
  address: string;
  category: string;
  description: string;
  file: null | File;
  // organization_name: string;
  // organization_desc: string;
  // organization_phone: string;
  // organization_email: string;
  // organization_img: string;
}
const EventInfo = ({ setActiveStep }: Prop) => {
  const { data: categories } = useGetAllCategoryQuery();
  const { upLoad, loading } = useUploadFile();
  // console.log(categories);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // console.log(selectedFile);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      banner: '',
      logo: '',
      name: '',
      location: '',
      address: '',
      category: '',
      description: '',
      file: null,
      // organization_name: '',
      // organization_desc: '',
      // organization_phone: '',
      // organization_email: '',
      // organization_img: Chamaleon2,
    },
    validationSchema: Yup.object({
      // banner: Yup.string().required('Banner không được bỏ trống'),
      // logo: Yup.string().required('Logo không được bỏ trống'),
      name: Yup.string().required('Tên sự kiện không được bỏ trống'),
      location: Yup.string().required('Địa điểm tổ chức không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
      category: Yup.string().required('Danh mục sự kiện không được bỏ trống'),
      description: Yup.string().required('Mô tả sự kiện không được bỏ trống'),
      file: Yup.mixed()
        .required('A file is required')
        .test('fileSize', 'The file is too large', (value: any) => {
          return value ? value.size <= 1024000 : true; // 1MB
        }),
      // organization_name: Yup.string().required('Tên tổ chức không được bỏ trống'),
      // organization_phone: Yup.string().required('Hotline tổ chức không được bỏ trống'),
      // organization_desc: Yup.string().required('Mô tả tổ chức không được bỏ trống'),
      // organization_email: Yup.string()
      //   .required('Email không được bỏ trống')
      //   .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
    }),
    onSubmit: async (value: IEventInfo) => {
      console.log(value);
      const bannerId = await upLoad(value.file!);
      value.banner = bannerId;
      // setActiveStep(1);
    },
  });
  return (
    <>
      <div className="">
        {/* Banner sự kiện */}
        <form onSubmit={formik.handleSubmit} className="mt-3">
          <div className="group relative h-[250px] w-full">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="banner" className="h-full w-full rounded-xl object-cover " />
            ) : (
              <img src={banner3} alt="banner" className="h-full w-full rounded-xl object-cover " />
            )}
            <div
              className={`absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-50 transition ${
                imagePreviewUrl && '!opacity-0 group-hover:!opacity-50'
              }`}
            ></div>
            <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center ">
              <div
                className={`relative z-20 w-[250px] overflow-hidden rounded-xl border-2 border-white text-center text-sm text-white  transition hover:scale-105 ${
                  imagePreviewUrl && '!opacity-0 group-hover:!opacity-100'
                }`}
              >
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="absolute left-0 top-0 h-full cursor-pointer text-2xl opacity-0"
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0];
                    formik.setFieldValue('file', selectedFile);
                    if (selectedFile) {
                      // setSelectedFile(selectedFile);
                      setImagePreviewUrl(URL.createObjectURL(selectedFile));
                    }
                  }}
                />
                <Icon name="image" className="text-3xl" />
                <p>Kích thước ảnh 1500 x 600 (Ảnh không quá 1MB) </p>
              </div>
            </div>
            {formik.errors.file ? <div className="z-10 px-2 text-[12px] text-red-600">{formik.errors.file}</div> : null}
          </div>
          {/* //// */}
          {/* <div className="mt-7 flex items-center gap-2">
            <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-cs_input_gray">
              <input
                type="file"
                name="logo"
                id="logo"
                className="absolute left-0 top-0 cursor-pointer text-2xl opacity-0"
              />
              <Icon name="add" className="cursor-pointer text-2xl" />
            </div>
            <span className="font-semibold dark:text-white">Logo sự kiện</span>
          </div> */}
          {/* //// */}
          <div className="mt-5 grid w-full grid-cols-2 gap-2">
            <div className="relative">
              {formik.errors.name && (
                <small className="absolute left-[90px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.name}
                </small>
              )}
              <Input
                name="name"
                id="name"
                label="Tên sự kiện"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.address && (
                <small className="absolute left-[130px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.address}
                </small>
              )}
              <Input
                name="address"
                id="address"
                label="Địa điểm sự kiện"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative">
              {formik.errors.location && (
                <small className="absolute left-[60px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.location}
                </small>
              )}
              <Input
                name="location"
                id="location"
                label="Địa chỉ"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative pt-3">
              {formik.errors.category && (
                <small className="absolute left-[140px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.category}
                </small>
              )}
              {/* <Input
                name="category"
                id="category"
                label="Danh mục sự kiện"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.category}
                onChange={formik.handleChange}
              /> */}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Danh mục sự kiện
              </label>
              <br />
              <select
                name="category"
                id="category"
                className=" w-[100%] rounded-xl p-[10px] shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <option value={''}>Hãy chọn danh mục </option>
                {categories?.data?.map((category: ICategory, index: number) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative mt-5">
            {formik.errors.description && (
              <small className="absolute left-[130px] top-[4px] z-10 px-2 text-[12px] text-red-600">
                {formik.errors.description}
              </small>
            )}
            <label htmlFor="description" className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400">
              Giới thiệu sự kiện
            </label>
            <textarea
              name="description"
              id="description"
              className="mt-2 !h-[200px] !w-full rounded-xl p-2 text-sm shadow-border-light  focus:outline-cs_semi_green dark:bg-cs_formDark dark:text-white dark:outline-none"
              placeholder="Nhập giới thiệu về sự kiện"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
          {/* //// */}
          {/* <div className="">
            <label
              htmlFor="organization_name"
              className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400"
            >
              Thông tin ban tổ chức
            </label>
            <div className="flex justify-between gap-3">
              <div className="group relative h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-cs_semi_green">
                <img
                  src={formik.values.organization_img}
                  alt="oraganization pic"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-0  transition group-hover:opacity-40"></div>
                <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <div className="relative overflow-hidden transition hover:scale-105">
                    <input
                      type="file"
                      name="organization_img"
                      id="organization_img"
                      onChange={formik.handleChange}
                      className="absolute left-0 top-0 h-full cursor-pointer text-2xl opacity-0"
                    />
                    <Icon name="image" className="text-xl text-white" />
                  </div>
                </div>
              </div>
              <div className="flex w-[88%] flex-col gap-2">
                <div className="relative">
                  {formik.errors.organization_name && (
                    <small className="absolute left-[125px] top-[9px] z-10 px-2 text-[12px] text-red-600">
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
                  {formik.errors.organization_desc && (
                    <small className="absolute left-[150px] top-[4px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_desc}
                    </small>
                  )}
                  <label
                    htmlFor="organization_desc"
                    className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400"
                  >
                    Thông tin giới thiệu
                  </label>
                  <textarea
                    name="organization_desc"
                    id="organization_desc"
                    className="mt-2 !h-[200px] !w-full rounded-xl p-2 text-sm shadow-border-light  focus:outline-cs_semi_green dark:bg-cs_formDark dark:text-white dark:outline-none"
                    placeholder="Nhập thông tin giới thiệu"
                    onChange={formik.handleChange}
                    value={formik.values.organization_desc}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm font-semibold dark:text-white">
                Thông tin liên hệ{' '}
                <span className="text-xs font-normal italic">
                  (Thông tin này chỉ được sử dụng để kết nối giữa Nevent và Ban tổ chức nên sẽ không được đăng tải trên
                  website Nevent)
                </span>
              </p>
              <div className="mt-6 flex justify-between gap-5">
                <div className="relative w-1/2">
                  {formik.errors.organization_phone && (
                    <small className="absolute -top-[20px] left-[60px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_phone}
                    </small>
                  )}
                  <Input
                    name="organization_phone"
                    id="organization_phone"
                    type="text"
                    placeholder="Hotline"
                    classNameInput="w-full rounded-xl p-2 pl-20 text-sm"
                    value={formik.values.organization_phone}
                    onChange={formik.handleChange}
                  />
                  <div className="absolute top-0 flex h-full w-16 items-center justify-center rounded-l-xl bg-cs_semi_green text-xl text-white">
                    <Icon name="call" />
                  </div>
                </div>
                <div className="relative w-1/2">
                  {formik.errors.organization_email && (
                    <small className="absolute -top-[20px] left-[60px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_email}
                    </small>
                  )}
                  <Input
                    name="organization_email"
                    id="organization_email"
                    type="text"
                    placeholder="Email"
                    classNameInput="w-full rounded-xl p-2 pl-20 text-sm"
                    value={formik.values.organization_email}
                    onChange={formik.handleChange}
                  />
                  <div className="absolute top-0 flex h-full w-16 items-center justify-center rounded-l-xl bg-cs_semi_green text-xl text-white">
                    <Icon name="mail" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* //// */}
          <div className="w-full text-right"></div>
          <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Tiếp tục" />
        </form>
        {/* //// */}
      </div>
    </>
  );
};
export default EventInfo;
