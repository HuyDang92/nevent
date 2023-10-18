import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonEventHot = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 xl:grid-cols-5 3xl:grid-cols-6">
      <Skeleton height={'280px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      <Skeleton height={'280px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      <Skeleton height={'280px'} width={'100%'} borderRadius={'15px'} className="hidden animate-pulse sm:block" />
      <Skeleton height={'280px'} width={'100%'} borderRadius={'15px'} className="hidden animate-pulse xl:block" />
      <Skeleton height={'280px'} width={'100%'} borderRadius={'15px'} className="hidden animate-pulse xl:block" />
    </div>
  );
};

export default SkeletonEventHot;
