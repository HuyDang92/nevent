import { Typography } from '@material-tailwind/react';
import Button from '~/components/customs/Button';
import AuthImage from '~/assets/images/auth.png';
import Logo from '~/assets/svg/logo-white-desktop.svg'
import { Link } from 'react-router-dom';
function SignUpEmail() {
  return (
    <div className="flex h-screen w-screen justify-between text-cs_dark relative">
      <div className="absolute left-[30px] top-[15px]">
        <Link to={"/"}><img src={Logo} alt="" /></Link>
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

        </div>
      </div>
    </div>
  );
}

export default SignUpEmail;
