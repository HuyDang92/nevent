import { Link } from 'react-router-dom';
import chameleon from '~/assets/images/chamaleon-1.svg';
import Button from '~/components/customs/Button';
const Complete = () => {
  return (
    <div className="px-5 py-10">
      <img src={chameleon} alt="" className="h-[120px] w-full" />
      <h1 className="my-5 text-center text-2xl font-bold">Thanh toán thành công</h1>
      <Link to={'/user/profile/1'} className="flex justify-center">
        <Button className="w-52" value="Quản lí vé" mode="dark"></Button>
      </Link>
    </div>
  );
};

export default Complete;
