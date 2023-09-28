import { Typography } from '@material-tailwind/react';
import Button from '~/components/customs/Button';
import SectionTitle from '~/components/customs/SectionTitle';
import AuthImage from '~/assets/images/auth.png';
import LogoGoogle from '~/assets/icon/logo_google.svg';
import LogoFacebook from '~/assets/icon/logo_facebook.svg';
// import Logo from '~/assets/svg/logo-white-desktop.svg';
import { Link } from 'react-router-dom';
import { LogoWhiteDesktop } from '~/assets/icon';
function SignUp() {
  return (
    <div className="relative flex h-screen w-screen justify-between text-cs_dark">
      <div className="absolute left-[30px] top-[15px]">
        <Link to={'/'}>
          <LogoWhiteDesktop />
          {/* <img src={Logo} alt="" /> */}
        </Link>
      </div>
      {/* <div className="w-1/2 h-full bg-[url('~/assets/images/auth.png')] bg-no-repeat object-fill">
        asda
      </div> */}
      <div className="h-full w-1/2">
        <img className="h-full w-full object-cover" src={AuthImage} alt="" />
      </div>
      <div className="grid w-1/2 place-content-center">
        <div className="w-[580px] rounded-[25px] bg-white px-[70px] py-[50px] text-center shadow-border-full">
          <div className="mb-[40px]">
            <Typography className="text-[35px] font-bold">Đăng ký</Typography>
            <span className="text-[#989898]">Đăng ký tài khoản để sử dụng dịch vụ của chúng tôi</span>
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
          <div>
            <Link to={'/signup-email'}>
              <Button
                className="flex w-full justify-center rounded-full border-[#BAB1B1] text-lg !text-cs_dark"
                icon="mail"
                value="Đăng ký bằng email"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
