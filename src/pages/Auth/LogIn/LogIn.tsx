import { Typography } from '@material-tailwind/react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import SectionTitle from '~/components/customs/SectionTitle';
import Button from '~/components/customs/Button';
import AuthImage from '~/assets/images/auth.png';
import LogoGoogle from '~/assets/icon/logo_google.svg';
import LogoFacebook from '~/assets/icon/logo_facebook.svg';
import Logo from '~/assets/icon/logo-desktop.svg';
import { Link } from 'react-router-dom';
import Input from '~/components/customs/Input';
interface SignInFormValues {
  email: string;
  password: string;
}
import { LogoWhite } from '~/assets/icon';
function LogIn() {
  const initialValues: SignInFormValues = { email: '', password: '' };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  return (
    <div className="relative flex h-screen w-screen justify-between text-cs_dark">
      <div className="absolute left-[30px] top-[15px]">
        <Link to={'/'}>
          <LogoWhite />
        </Link>
      </div>
      <div className="grid w-1/2 place-content-center">
        <div className="w-[580px] rounded-[25px] bg-white px-[70px] py-[50px] text-center shadow-border-full">
          <div className="mb-[40px]">
            <Typography className="text-[35px] font-bold">Đăng nhập</Typography>
            <span className="text-[#989898]">Đăng nhập tài khoản để đăng ký sự kiện nào!</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Button
              className="flex w-full justify-center rounded-full border-[#BAB1B1] text-lg !text-cs_dark"
              icon={LogoGoogle}
              value="Đăng nhập bằng Google"
            />
            <Button
              className="flex w-full justify-center rounded-full border-[#BAB1B1] text-lg !text-cs_dark"
              icon={LogoFacebook}
              value="Đăng nhập bằng Facebook"
            />
          </div>
          <SectionTitle size="!text-base" value="hoặc" />
          <div className="mb-3">
            <form action="" className="flex flex-col gap-4">
              <Input id="email" label="Email" placeholder="Vui lòng nhập email" classNameInput="w-full" />
              <Input
                type="password"
                id="email"
                label="Mật khẩu"
                placeholder="Vui lòng nhập mật khẩu"
                classNameInput="w-full"
              />
            </form>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center">
                <input type="checkbox" className="mr-3" />
                Lưu đăng nhập
              </span>
              <Link to={'/forgot-password'} className="font-semibold text-cs_purple">
                Quên mật khẩu
              </Link>
            </div>
            <div>
              <Button
                className="flex w-full justify-center rounded-full bg-cs_purple text-lg text-white"
                value="Đăng nhập"
              />
            </div>
            <div className="text-left">
              Bạn chưa có tài khoản&nbsp;
              <Link className="font-semibold text-cs_purple" to={'/signup'}>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-1/2 h-full bg-[url('~/assets/images/auth.png')] bg-no-repeat object-fill">
        asda
      </div> */}
      <div className="h-full w-1/2">
        <img className="h-full w-full object-cover" src={AuthImage} alt="" />
      </div>
    </div>
  );
}

export default LogIn;
