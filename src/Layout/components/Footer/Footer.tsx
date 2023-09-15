import { Typography } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';
import LogoWhite from '~/assets/svg/logo-white.svg';
import InputIcon from '~/components/customs/InputIcon';
type FooterProp = {
  className?: string;
};
function Footer({ className }: FooterProp) {
  return (
    <footer className={`bg-cs_dark text-cs_light ${className}`}>
      <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-3">
        <div className="flex justify-center">
          <ul className="text-left text-xl">
            <Typography className="flex h-20 items-center font-medium">
              <img src={LogoWhite} alt="Photo of NEVENT" />
              <span className="text-3xl">NEVENT</span>
            </Typography>
            <li className='my-2'>
              Hotline: <b>0999999999</b>
            </li>
            <li className='my-2'>Email: nevent@gmail.com</li>
            <li className='my-2'>Địa chỉ: HCMC</li>
            <li className='mt-6'>
              <IonIcon name="logo-instagram" className="text-5xl" />
              <IonIcon name="logo-facebook" className="text-5xl ml-5" />
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="text-left text-xl">
            <Typography className="flex h-20 items-center text-2xl font-medium">THÔNG TIN</Typography>
            <li className='my-2'>
              <Link to={'/about'}>Về chúng tôi</Link>
            </li>
            <li className='my-2'>
              <Link to={'/'}>Giới thiệu về NEVENT</Link>
            </li>
            <li className='my-2'>
              <Link to={'/'}>Chính sách và điều khoản</Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <ul className="text-left text-xl">
            <Typography className="flex h-20 items-center text-2xl font-medium">TRUNG TÂM HỖ TRỢ</Typography>
            <li className='my-2'>
              <Link to={'/'}>FAQs</Link>
            </li>
            <li className='my-2'>
              <Link to={'/'}>Đăng kí nhận email</Link>
            </li>
            <li className='my-2'>
              <InputIcon icon="mail" />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-cs_gray py-4">Copyright &copy; 2023 Team NEVENT</div>
    </footer>
  );
}

export default Footer;
