import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import AuthImage from '~/assets/images/bgLogin.webp';
import { Link } from 'react-router-dom';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { Checkbox } from '@material-tailwind/react';
import logoWhite from '~/assets/images/logoWhite.png';

interface SignInFormValues {
  email: string;
  password: string;
}
function LogIn() {
  const initialValues: SignInFormValues = { email: '', password: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  return (
    <div className="relative flex h-screen w-screen flex-row-reverse justify-between text-cs_dark">
      <div className="absolute left-[30px] top-[15px]">
        <Link to={'/'}>
          <div className="flex items-center gap-2 py-3">
            <img src={logoWhite} alt="logo" className="h-[20px] w-[40px]" />
            <span className="text-xl font-black text-cs_light">NEVENT</span>
          </div>
        </Link>
      </div>
      <div
        // initial={{ x: -400 }} // Chuyển từ bên trái vào
        // animate={{ x: 0 }} // Chạy đến vị trí ban đầu
        // transition={{
        //   duration: 0.5,
        //   type: 'spring', // Loại hiệu ứng rung lắc
        //   damping: 15, // Độ nảy của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
        //   stiffness: 100, // Độ cứng của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
        // }}
        className="grid w-1/2  place-content-center text-center"
      >
        <div className="w-[400px] space-y-5">
          <div>
            <h1 className="text-2xl font-extrabold dark:text-cs_light">CHÀO MỪNG ĐẾN NEVENT!</h1>
            <p className=" py-2 text-center text-cs_blur_black">
              Đăng nhập nhanh để có thể sử dụng dịch vụ của Nevent một cách hoàn toàn miễn phí.
            </p>
          </div>
          <form className="space-y-2">
            <Input placeholder="Email" classNameInput="w-full" />
            <Input placeholder="Mật khẩu" classNameInput="w-full" />
            <div className="flex items-center justify-between text-sm">
              <Checkbox crossOrigin={{}} label="Remember Me" className="h-4 w-4" />
              <Link to="/" className="hover:underline dark:text-cs_light">
                Quên mật khẩu?
              </Link>
            </div>
            <Button className="w-full font-normal dark:bg-cs_lightDark" mode="dark" value="Đăng nhập" />
          </form>
          <div className="relative flex items-center justify-center gap-4">
            <span className="h-[1px] w-32 rounded-full bg-black "></span>
            <span className="">hoặc</span>
            <span className="h-[1px] w-32 rounded-full bg-black "></span>
          </div>
          <div className="flex justify-center gap-1">
            <Button className="font-semibold " value="Google" icon="logo-google" />
            <Button className="" value="Facebook" icon="logo-facebook" />
          </div>
          <div className="pt-5">
            <span className="dark:text-cs_light">Bạn chưa có tài khoản? </span>
            <Link to="/signup" className="font-bold hover:underline dark:text-cs_light">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      <div
        // initial={{ x: 400 }} // Chuyển từ bên phải vào
        // animate={{ x: 0 }} // Chạy đến vị trí ban đầu
        // transition={{ duration: 0.5 }}
        className="h-full w-1/2 p-3"
      >
        <img className="h-full w-full rounded-xl object-cover" src={AuthImage} alt="" />
      </div>
    </div>
  );
}

export default LogIn;
