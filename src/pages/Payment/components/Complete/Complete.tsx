import { Link } from 'react-router-dom';
import chameleon from '~/assets/images/chamaleon-1.svg';
import Button from '~/components/customs/Button';
import paymentFaild from '~/assets/images/paymentFaild.png';
const Complete = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('s');

  return (
    <div className="px-5 py-20">
      <div className='flex justify-center'>
        {myParam === '00' ? (
          <img src={chameleon} alt="" className="h-[120px] w-full" />
        ) : (
          <img src={paymentFaild} alt="" className="h-[120px] w-[120px]" />
        )}
      </div>
      <h1 className="my-5 text-center text-2xl font-bold">
        Thanh toán {`${myParam === '00' ? 'thành công' : 'thất bại'}`}
      </h1>
      <Link to={'/user/profile/1'} className="flex justify-center">
        {myParam === '00' ? (
          <Button className="w-52" value="Quản lí vé" mode="dark"></Button>
        ) : (
          <Button className="w-52" value="Thử lại" mode="dark"></Button>
        )}
      </Link>
    </div>
  );
};

export default Complete;
