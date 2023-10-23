import * as Yup from 'yup';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useFormik } from 'formik';
import RecommendCard from '~/components/customs/RecommendCard';

interface IOrganizationInfo {
  name: string;
  CRN: string;
  releasePlace: string;
  releaseDate: string;
  tel: string;
  email: string;
  city: string;
  district: string;
  road: string;
  address: string;
}
const OrganizationProfile = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      CRN: '',
      releasePlace: '',
      releaseDate: '',
      tel: '',
      email: '',
      city: '',
      district: '',
      road: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên tổ chức không được bỏ trống'),
      CRN: Yup.string().required('Số đăng ký không được bỏ trống'),
      releasePlace: Yup.string().required('Nơi phát hành không được bỏ trống'),
      releaseDate: Yup.string().required('Ngày phát hành không được bỏ trống'),
      tel: Yup.string().required('Số điện thoại không được bỏ trống'),
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
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
      <div className="h-full w-full rounded-2xl bg-cs_light p-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Đăng ký tổ chức</h1>
          <Dropdown />
        </div>
        <div className="mt-2 flex justify-between">
          <form onSubmit={formik.handleSubmit} className="w-[70%]">
            <label htmlFor="type" className="ml-2 text-sm font-semibold text-cs_label_gray">
              Loại hình kinh doanh
            </label>
            <br />
            <select name="type" id="type" className="mt-2 w-[55%] rounded-2xl border-2 p-2 focus:border-2">
              <option value="">Doanh nghiệp/Nhà tổ chức</option>
              <option value="">Cá nhân</option>
            </select>
            <h2 className="mb-2 mt-4 text-lg">Thông tin nhà tổ chức</h2>
            <div className="grid w-full grid-cols-2 gap-2">
              <Input
                name="name"
                id="name"
                label="Tên người tổ chức"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <Input
                name="CRN"
                id="CRN"
                label="Số đăng ký công ty (CRN)"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.CRN}
                onChange={formik.handleChange}
              />
              <Input
                name="releasePlace"
                id="releasePlace"
                label="Nơi phát hành"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.releasePlace}
                onChange={formik.handleChange}
              />
              <Input
                name="releaseDate"
                id="releaseDate"
                label="Ngày phát hành"
                type="date"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.releaseDate}
                onChange={formik.handleChange}
              />
            </div>
            <h2 className="mb-2 mt-4 text-lg">Thông tin liên lạc</h2>
            <div className="grid w-full grid-cols-2 gap-2">
              <Input
                name="tel"
                id="tel"
                label="Số điện thoại"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.tel}
                onChange={formik.handleChange}
              />
              <Input
                name="email"
                id="email"
                label="Email"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <Input
                name="city"
                id="city"
                label="Thành phố/Tỉnh"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              <Input
                name="district"
                id="district"
                label="Huyện"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.district}
                onChange={formik.handleChange}
              />
              <Input
                name="road"
                id="road"
                label="Phường"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.road}
                onChange={formik.handleChange}
              />
              <Input
                name="address"
                id="address"
                label="Địa chỉ"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!bg-cs_input_gray !shadow-none !w-full"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                className="mt-3 w-1/5 !bg-cs_leaf-500 font-semibold text-white"
                value="Lưu thông tin"
              />
            </div>
          </form>
          <div className="flex w-[25%] flex-col gap-10">
            <RecommendCard title="Gói đề xuất sự kiện" sale="30" price={9000000} theme_color="green" />
            <RecommendCard title="Gói tiêu diệt đối thủ" sale="80" price={12000000} theme_color="yellow" />
          </div>
        </div>
      </div>
    </>
  );
};
export default OrganizationProfile;
