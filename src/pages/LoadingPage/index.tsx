import { JellyfishSpinner } from 'react-spinners-kit';
import View from '~/motion/View';

function LoadingPage() {
  return (
    <View className="relative flex h-screen flex-col items-center justify-center bg-[#f5f7fc] py-16 dark:bg-cs_dark">
      <View className="mt-8 flex flex-col items-center text-white">
        {/* <img
          src="https://i.pinimg.com/originals/16/f1/d6/16f1d6eadfa1ccd785c91f64b535aabb.gif"
          className="h-full w-full object-cover"
        /> */}
        <h1 className="text-[1.5rem] font-bold text-cs_semi_green">NEVENT</h1>
        <JellyfishSpinner color="#13C6B3" />
      </View>
    </View>
  );
}

export default LoadingPage;
