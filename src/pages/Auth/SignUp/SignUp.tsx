import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import AuthImage from '~/assets/images/bgLogin.png';
import { Link } from 'react-router-dom';
import logoDark from '~/assets/images/logoDark.png';
import logoWhite from '~/assets/images/logoWhite.png';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { Checkbox } from '@material-tailwind/react';
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
    <div className="relative flex h-screen w-screen flex-row justify-between text-cs_dark">
      <div className="absolute left-[30px] top-[15px]">
        <Link to="/">
          <div className="flex items-center gap-2 py-3">
            <img src={logoDark} alt="logo" className="hidden h-[20px] w-[40px] dark:hidden sm:block" />
            <img src={logoWhite} alt="logo" className="hidden h-[20px] w-[40px] dark:block" />
            <span className="text-xl font-black text-cs_dark dark:text-cs_light">NEVENT</span>
          </div>
        </Link>
      </div>
      <div
        // initial={{ x: 400 }} // Chuyển từ bên trái vào
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
            <h1 className="text-2xl font-extrabold dark:text-cs_light">ĐĂNG KÝ TÀI KHOẢN!</h1>
            <p className=" py-2 text-center text-cs_blur_black">
              Đăng ký tài khoản miễn phí để sử dụng dịch vụ của Nevent một cách nhanh chóng nào!
            </p>
          </div>
          <form className="space-y-2">
            <Input placeholder="Họ và tên" classNameInput="w-full" />
            <Input placeholder="Email" classNameInput="w-full" />
            <Input placeholder="Mật khẩu" classNameInput="w-full" />
            <div className="flex items-center text-sm">
              <Checkbox
                label="Tôi đồng ý với điều khoản dịch vụ của của Nevent."
                crossOrigin={{}}
                className="h-4 w-4"
              />
              <p></p>
            </div>
            <Button className="w-full font-normal dark:bg-cs_lightDark" mode="dark" value="Đăng ký" />
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
            <span className="dark:text-cs_light">Bạn đã có tài khoản? </span>
            <Link to="/login" className="font-bold hover:underline dark:text-cs_light">
              Đăng nhập
            </Link>
          </div>
        </div>
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
        className="h-full w-1/2 p-3"
      >
        <img className="h-full w-full rounded-xl object-cover" src={AuthImage} alt="" />
      </div>
    </div>
  );
}

export default LogIn;
