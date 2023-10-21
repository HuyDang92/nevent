import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonEventList = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 3xl:grid-cols-5">
      <div className="">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="my-1 animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="hidden sm:block">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="hidden sm:block">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="hidden xl:block">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="hidden xl:block">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="hidden xl:block">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
      <div className="hidden xl:block">
        <Skeleton height={'150px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'30%'} borderRadius={'15px'} className="animate-pulse" />
        <Skeleton height={'12px'} width={'100%'} borderRadius={'15px'} className="animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonEventList;
