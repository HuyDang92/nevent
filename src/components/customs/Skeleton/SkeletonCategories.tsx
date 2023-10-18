import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCategories = () => {
  return (
    <div className="w-full grid-cols-1 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton height={'210px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      <Skeleton height={'210px'} width={'100%'} borderRadius={'15px'} className="hidden animate-pulse  sm:block" />
      <Skeleton height={'210px'} width={'100%'} borderRadius={'15px'} className="hidden animate-pulse xl:block" />
    </div>
  );
};

export default SkeletonCategories;
