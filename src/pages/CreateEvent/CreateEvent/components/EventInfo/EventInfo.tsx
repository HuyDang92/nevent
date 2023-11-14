import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import Chamaleon2 from '~/assets/images/chamaleon-2.svg';
import { useEffect, useState } from 'react';
// import banner3 from '~/assets/images/banner3.jpg';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { setEventInfo } from '~/features/Business/businessSlice';
import { useGetLocationsQuery } from '~/features/Event/eventApi.service';
import { Carousel, IconButton } from '@material-tailwind/react';

const EventInfo = () => {
  const dispatch = useAppDispatch();
  const eventInfo = useAppSelector((state) => state.bussiness.eventInfo);
  const { data: locations } = useGetLocationsQuery();
  const { data: categories } = useGetAllCategoryQuery();
  const navigate = useNavigate();
  // console.log(categories);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // console.log(selectedFile);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);
  useEffect(() => {
    if (eventInfo?.banner) {
      setImagePreviewUrl(eventInfo?.banner);
    }
  }, []);
  const formik = useFormik({
    initialValues: eventInfo
      ? eventInfo
      : {
          address: '',
          banner: [],
          logo: '',
          name: '',
          location: null,
          category: '',
          description: '',
          file: null,
          categories: null,
          // organization_name: '',
          // organization_desc: '',
          // organization_phone: '',
          // organization_email: '',
          // organization_img: Chamaleon2,
        },
    validationSchema: Yup.object({
      banner: Yup.mixed(),
      // logo: Yup.string().required('Logo không được bỏ trống'),
      name: Yup.string().required('Tên sự kiện không được bỏ trống'),
      address: Yup.string().required('Địa điểm tổ chức không được bỏ trống'),
      category: Yup.string().required('Danh mục sự kiện không được bỏ trống'),
      description: Yup.string().required('Mô tả sự kiện không được bỏ trống'),
      // file: Yup.mixed()
      //   .required('Yêu cầu banner sự kiện')
      //   .test('fileSize', 'File ảnh quá lớn', (value: any) => {
      //     return value ? value.size <= 1024000 : true; // 1MB
      //   }),
      file: Yup.mixed()
        .test('filesize', 'file size is too large', (value: any) => {
          if (value && value?.length > 0) {
            for (let i = 0; i < value.length; i++) {
              if (value[i].size > 5242880) {
                return false;
              }
            }
          }
          return true;
        })
        .test('filetype', 'unsupported file format', (value: any) => {
          if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
              if (value[i].type != 'image/png' && value[i].type != 'image/jpg' && value[i].type != 'image/jpeg') {
                return false;
              }
            }
          }
          return true;
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
      try {
        if (value.file) {
          console.log(value.file);
          // const fileArray = Array.from(selectedFile);
        }
        value.location = locations?.data?.find((item: ILocation) => item._id === value.address);
        value.categories = categories?.data?.find((item: ICategory) => item._id === value.category);
        dispatch(setEventInfo(value));
        navigate(`/organization/create-event/1`);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <>
      <div className="">
        {/* Banner sự kiện */}
        <form onSubmit={formik.handleSubmit} className="mt-3">
          <div className="group relative h-[250px] w-full">
            {imagePreviewUrl.length > 0 ? (
              <Carousel
                className="rounded-xl"
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute left-4 top-2/4 z-40 -translate-y-2/4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute !right-4 top-2/4 z-40 -translate-y-2/4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </IconButton>
                )}
              >
                {imagePreviewUrl.map((image) => (
                  <img src={image} alt="banner" className="h-full w-full rounded-xl object-cover " />
                ))}
              </Carousel>
            ) : (
              <img
                src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=1060&t=st=1699186131~exp=1699186731~hmac=9b55cc41f50452febc175954dbc59a7a19eb60e6cc3bd19e65822d2dad11d941"
                alt="banner"
                className="h-full w-full rounded-xl object-cover "
              />
            )}
            <div
              className={`pointer-events-none absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-30 transition ${
                imagePreviewUrl && '!opacity-0 group-hover:!opacity-50'
              }`}
            ></div>
            <div className=" `pointer-events-none absolute top-0 flex h-full w-full cursor-pointer items-center justify-center ">
              <div
                className={`relative z-20 w-[250px] overflow-hidden rounded-xl border-2 border-white text-center text-sm text-white  transition hover:scale-105 ${
                  imagePreviewUrl && '!opacity-0 group-hover:!opacity-100'
                }`}
              >
                <input
                  multiple
                  type="file"
                  name="file"
                  id="file"
                  className="absolute left-0 top-0 h-full cursor-pointer text-2xl opacity-0 shadow-border-light"
                  onChange={(event) => {
                    const selectedFile = event.target.files;
                    formik.setFieldValue('file', selectedFile);
                    if (selectedFile) {
                      // setSelectedFile(selectedFile);
                      const fileArray = Array.from(selectedFile);
                      const filesURL = fileArray.map((file) => {
                        return URL.createObjectURL(file);
                      });
                      setImagePreviewUrl(filesURL);
                      formik.setFieldValue('banner', filesURL);
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
            <div className="relative pt-3">
              {formik.errors.address && (
                <small className="absolute left-[140px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.address}
                </small>
              )}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Địa chỉ
              </label>
              <br />
              <select
                name="address"
                id="address"
                className=" w-[100%] rounded-xl p-[10px] shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
                value={formik.values.address}
                onChange={formik.handleChange}
              >
                <option value={''}>Hãy chọn danh mục </option>
                {locations?.data?.map((location: ILocation, index: number) => (
                  <option key={index} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
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
