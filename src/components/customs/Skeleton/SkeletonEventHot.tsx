import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonEventHot = () => {
  return (
    <div className="">
      <Skeleton height={'50vh'} width={'100%'} borderRadius={'15px'} className="hidden animate-pulse xl:block" />
      <Skeleton height={'20vh'} width={'100%'} borderRadius={'15px'} className="animate-pulse xl:block" />
    </div>
  );
};

export default SkeletonEventHot;
