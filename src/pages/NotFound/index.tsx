import { NavLink } from 'react-router-dom';
import { useRive } from 'rive-react';
import { notFound } from '~/assets/rivs';
import View from '~/motion/View';

function NotFound() {

  const { rive, RiveComponent } = useRive({
    src: notFound,
    autoplay: true,
    stateMachines: "State Machine 1",
  })

  return (
    <View className='h-screen bg-[#0f0f0f] flex  flex-col justify-center items-center relative' >
      <View className='flex flex-col items-center text-white mt-8'>
        <h1 className='font-bold text-[6rem]'>404</h1>
        <p>Opp! Có vẻ như trang này không tồn tại.</p>
      </View>
      <RiveComponent width={'100%'} height={'100%'} />
      <NavLink to='/' className=' mb-4 py-4 px-8 rounded-lg bg-white text-black lg:bottom-10'>Cút về trang chủ</NavLink>
    </View>
  );
}

export default NotFound;
