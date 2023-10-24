import { Link } from 'react-router-dom';
import complete from '~/assets/rivs/complete.webm';
import Button from '~/components/customs/Button';
const Complete = () => {
  return (
    <div>
      <img src={complete} alt="" className='w-full h-[120px]' />
      <h1 className='text-center my-5 font-bold text-2xl'>Thanh toán thành công</h1>
      <Link to={''}>
        <Button className='w-full' value="Quản lí vé" mode='dark' ></Button>
      </Link>
    </div>
  );
};

export default Complete;
