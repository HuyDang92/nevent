import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import InputIcon from '~/components/customs/InputIcon';
type FooterProp = {
  className?: string;
};
function Footer({ className }: FooterProp) {
  return (
    <footer className={`pb-[75px] md:pb-0 bg-cs_icon_black text-cs_light md:block ${className}`}>
      <div className="flex min-h-[300px] flex-col md:flex-row-reverse md:justify-between md:gap-5">
        <div className="mx-auto w-[324px] md:border-l-[1px] border-[#44425A] px-10 pt-10">
          <Typography className="mb-5 flex items-center font-semibold">Đăng ký nhận email</Typography>
          <div className='my-5'>
            <InputIcon icon="send" iconClassName="-rotate-45" placeholder="Email" />
          </div>
          <p className='text-xs'>Giấy phép Kinh doanh số 0107641285 do Sở Kế Hoạch & Đầu Tư Thành Phố Hà Nội cấp ngày 21/11/2016</p>
        </div>
        <div className="mx-auto flex md:w-[calc(100%-324px)] justify-between flex-col md:flex-row gap-10 pl-10 pt-10">
          <div className="flex">
            <ul className="text-left">
              <Typography className="mb-5 flex items-center font-semibold">Liên hệ hợp tác</Typography>
              <li className="text-xs">
                <Link to={'/'}>Điện thoại: 0243.788.00.99 (8:30 - 17:00)</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Hotline: 08.999.80.818</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Email: ticketgo.vn@gmail.com</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Địa chỉ: Số 1, Phạm Văn Bạch, phường Yên Hòa, quận Cầu Giấy, Hà Nội.</Link>
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="text-left">
              <Typography className="mb-5 flex items-center font-semibold">Thông tin</Typography>
              <li className="text-xs">
                <Link to={'/about'}>Về chúng tôi</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Khuyến mãi</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Phương thức thanh toán</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Chính sách bảo mật và các điều khoản</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Hướng dẫn đặt vé</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Các câu hỏi thường gặp</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Chính sách điều khoản sử dụng cho khách hàng</Link>
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="text-left">
              <Typography className="mb-5 flex items-center font-semibold">Khách hàng</Typography>
              <li className="text-xs">
                <Link to={'/about'}>Đăng nhập dành cho đối tác</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Tra cứu thông tin đặt vé</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Tài khoản</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Gửi sự kiện</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Danh sách sự kiện</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Sự kiện đã diễn ra</Link>
              </li>
              <li className="text-xs">
                <Link to={'/'}>Chương trình Nevent</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
