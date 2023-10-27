import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Chamaleon2 from '~/assets/images/chamaleon-2.svg';
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
  organization_name: string;
  organization_desc: string;
  organization_phone: string;
  organization_email: string;
  organization_img: string;
}
const EventInfo = ({ setActiveStep }: Prop) => {
  const formik = useFormik({
    initialValues: {
      banner: '',
      logo: '',
      name: '',
      location: '',
      address: '',
      category: '',
      description: '',
      organization_name: '',
      organization_desc: '',
      organization_phone: '',
      organization_email: '',
      organization_img: Chamaleon2,
    },
    validationSchema: Yup.object({
      // banner: Yup.string().required('Banner không được bỏ trống'),
      // logo: Yup.string().required('Logo không được bỏ trống'),
      name: Yup.string().required('Tên sự kiện không được bỏ trống'),
      location: Yup.string().required('Địa điểm tổ chức không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
      category: Yup.string().required('Danh mục sự kiện không được bỏ trống'),
      description: Yup.string().required('Mô tả sự kiện không được bỏ trống'),
      organization_name: Yup.string().required('Tên tổ chức không được bỏ trống'),
      organization_phone: Yup.string().required('Hotline tổ chức không được bỏ trống'),
      organization_desc: Yup.string().required('Mô tả tổ chức không được bỏ trống'),
      organization_email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
    }),
    onSubmit: async (value: IEventInfo) => {},
  });
  return (
    <>
      <div className="">
        {/* Banner sự kiện */}
        <form action="" className="mt-3">
          <div className="group relative h-[250px] w-full">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-japanese-illustration-cherry-tree-petals_23-2149601832.jpg?w=1060&t=st=1698044776~exp=1698045376~hmac=1f7473d50dc44b63c902367920bec46f7ec41bad300ce5510c2f8cde7e022d68"
              alt="banner"
              className="h-full w-full rounded-xl object-cover "
            />
            <div className="absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-0 transition group-hover:opacity-50"></div>
            <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center ">
              <div className="relative z-20 w-[250px] overflow-hidden rounded-xl border-2 border-white text-center text-sm text-white opacity-0 transition hover:scale-105 group-hover:opacity-100">
                <input
                  type="file"
                  name="banner"
                  id="banner"
                  className="absolute left-0 top-0 h-full cursor-pointer text-2xl opacity-0"
                />
                <Icon name="image" className="text-3xl" />
                <p>Kích thước ảnh 1500 x 600 (Ảnh không quá 1MB) </p>
              </div>
            </div>
          </div>
          {/* //// */}
          <div className="mt-7 flex items-center gap-2">
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
          </div>
          {/* //// */}
          <div className="mt-3 grid w-full grid-cols-2 gap-2">
            <Input
              name="name"
              id="name"
              label="Tên sự kiện"
              classNameLabel="!text-cs_label_gray !text-sm"
              classNameInput="!w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Input
              name="address"
              id="address"
              label="Địa điểm sự kiện"
              classNameLabel="!text-cs_label_gray !text-sm"
              classNameInput="!w-full"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <Input
              name="location"
              id="location"
              label="Địa chỉ"
              classNameLabel="!text-cs_label_gray !text-sm"
              classNameInput="!w-full"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
            <Input
              name="category"
              id="category"
              label="Danh mục sự kiện"
              classNameLabel="!text-cs_label_gray !text-sm"
              classNameInput="!w-full"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-3">
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
          <div className="">
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
                <Input
                  name="organization_name"
                  id="organization_name"
                  label="Tên ban tổ chức"
                  classNameLabel="!text-cs_label_gray !text-sm"
                  classNameInput="!w-full"
                  value={formik.values.organization_name}
                  onChange={formik.handleChange}
                />
                <div className="">
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
          </div>
          {/* //// */}
          <div className="w-full text-right">
            <Button
              onClick={() => setActiveStep(1)}
              className="md:w mt-5 w-full"
              type="submit"
              mode="dark"
              value="Tiếp tục"
            />
          </div>
        </form>
        {/* //// */}
      </div>
    </>
  );
};
export default EventInfo;
