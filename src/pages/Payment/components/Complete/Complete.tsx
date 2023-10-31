import { Link } from 'react-router-dom';
import chameleon from '~/assets/images/chamaleon-1.svg';
import Button from '~/components/customs/Button';
const Complete = () => {
  return (
    <div>
      <img src={chameleon} alt="" className='w-full h-[120px]' />
      <h1 className='text-center my-5 font-bold text-2xl'>Thanh toán thành công</h1>
      <Link to={''}>
        <Button className='w-full' value="Quản lí vé" mode='dark' ></Button>
      </Link>
    </div>
  );
};

export default Complete;
