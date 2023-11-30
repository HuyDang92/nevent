import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import InputIcon from '~/components/customs/InputIcon';
type FooterProp = {
  className?: string;
};
function Footer({ className }: FooterProp) {
  return (
    <footer className={`bg-cs_icon_black pb-[75px] text-cs_light xl:block xl:pb-0 ${className}`}>
      <div className="flex min-h-[300px] flex-col xl:flex-row-reverse xl:justify-between xl:gap-5 xl:px-20">
        <div className="mx-auto w-[324px] px-10 pt-10">
          <Typography className="mb-5 flex items-center  font-semibold">Đăng ký nhận email</Typography>
          <div className="my-5">
            <InputIcon icon="send" iconClassName="-rotate-45" placeholder="Email" />
          </div>
          <p className="text-sm">
            Giấy phép Kinh doanh số 0107641285 do Sở Kế Hoạch & Đầu Tư Thành Phố Hà Nội cấp ngày 21/11/2016
          </p>
        </div>
        <div className="mx-auto flex flex-col justify-between gap-10 pl-10 pt-10 xl:w-[calc(100%-324px)] xl:flex-row">
          <div className="flex">
            <ul className="space-y-3 text-left">
              <Typography className="mb-5 flex items-center font-semibold xl:text-xl">Liên hệ hợp tác</Typography>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Điện thoại: 0243.788.00.99 (8:30 - 17:00)</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Hotline: 08.999.80.818</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Email: ticketgo.vn@gmail.com</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Địa chỉ: Số 1, Phạm Văn Bạch, phường Yên Hòa, quận Cầu Giấy, Hà Nội.</Link>
              </li>
            </ul>
          </div>
          <div className="flex ">
            <ul className="space-y-3 text-left">
              <Typography className="mb-5 flex items-center font-semibold xl:text-xl">Thông tin</Typography>
              <li className="text-xs xl:text-sm">
                <Link to={'/about'}>Về chúng tôi</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Khuyến mãi</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Phương thức thanh toán</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Chính sách bảo mật và các điều khoản</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Hướng dẫn đặt vé</Link>
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="space-y-3 text-left">
              <Typography className="mb-5 flex items-center font-semibold xl:text-xl">Khách hàng</Typography>
              <li className="text-xs xl:text-sm">
                <Link to={'/about'}>Đăng nhập dành cho đối tác</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Tra cứu thông tin đặt vé</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Sự kiện đã diễn ra</Link>
              </li>
              <li className="text-xs xl:text-sm">
                <Link to={'/'}>Chương trình Nevent</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-4">
        <span>Copyright @ 2023 | Nevent team</span>
      </div>
    </footer>
  );
}

export default Footer;
