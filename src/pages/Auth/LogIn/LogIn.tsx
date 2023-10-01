import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import AuthImage from '~/assets/images/backgroundLogin2.webp';
import LogoGoogle from '~/assets/icon/logo_google.svg';
import LogoFacebook from '~/assets/icon/logo_facebook.svg';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logoDarkDesktop.png';
import logoMobile from '~/assets/images/logo.svg';
import { LogoWhite, LogoWhiteDesktop, LogoDarkDesktop } from '~/assets/icon';
import Button from '~/components/customs/Button';

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
          <LogoWhiteDesktop />
        </Link>
      </div>
      <div className="grid w-3/5 place-content-center">
        <h1 className="text-2xl font-extrabold">CHÀO MỪNG ĐẾN NEVENT!</h1>
        <p className="w-[335px] py-2 text-center text-cs_blur_black">
          Đăng nhập nhanh để có thể sử dụng dịch vụ của Nevent một cách hoàn toàn miễn phí.
        </p>
        <div className="flex gap-1 justify-center">
          <Button className="text-cs_blur_black font-semibold" value="Google" icon="logo-google" />
          <Button className="text-cs_blur_black" value="Facebook" icon='logo-facebook'/>
        </div>
      </div>

      <div className="h-full w-2/5">
        <img className="h-full w-full object-cover" src={AuthImage} alt="" />
      </div>
    </div>
  );
}

export default LogIn;
