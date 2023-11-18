import { NavLink } from 'react-router-dom';
import { useRive } from 'rive-react';
import { notFound } from '~/assets/rivs';
import Button from '~/components/customs/Button';
import View from '~/motion/View';

function NotFound() {
  const { RiveComponent } = useRive({
    src: notFound,
    autoplay: true,
    stateMachines: 'State Machine 1',
  });

  return (
    <View className="relative flex h-screen flex-col items-center justify-center bg-[#0f0f0f] py-16">
      <View className="mt-8 flex flex-col items-center text-white">
        <h1 className="text-[6rem] font-bold text-[#facf5a]">404</h1>
        <p className="text-center font-bold uppercase">Opp! Có vẻ như trang này không tồn tại.</p>
      </View>
      <RiveComponent width={'100%'} height={'100%'} />
      <NavLink to="/" className=" mb-4 rounded-lg lg:bottom-10">
        <Button value="Về trang chủ" type="button" className="" mode="dark" />
      </NavLink>
    </View>
  );
}

export default NotFound;
