import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonDetailEvent = () => {
  return (
    <>
      <div className="w-full">
        {/* modal right */}
        <div className="right-0 top-[100px] w-full rounded-lg p-3 shadow-border-full lg:absolute lg:w-[380px]">
          <Skeleton borderRadius={'15px'} className="h-[250px] w-full animate-pulse lg:h-[180px]" />
          <Skeleton borderRadius={'15px'} className="mt-4 h-[25px] w-1/2 animate-pulse" />
          <Skeleton height={'20px'} width={'30%'} borderRadius={'15px'} className="mt-2 h-[20px] w-1/3 animate-pulse" />
          <div className="mt-3 flex flex-col gap-2">
            <Skeleton borderRadius={'15px'} className="h-[25px] w-[20%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[70%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-full animate-pulse" />
          </div>
          <Skeleton borderRadius={'15px'} className="mt-3 h-[80px] w-full animate-pulse" />
          <Skeleton borderRadius={'15px'} className="mt-4 h-[30px] w-full animate-pulse" />
        </div>
        {/* main */}
        <div className="w-full xl:w-[70%]">
          <div className="hidden lg:block">
            <Skeleton borderRadius={'15px'} className="h-[450px] w-full animate-pulse" />
            <Skeleton borderRadius={'15px'} className="mt-3 h-[30px] w-1/2 animate-pulse" />
            <div className="mt-3 flex gap-2">
              <Skeleton borderRadius={'15px'} className="h-[120px] w-[120px] animate-pulse" />
              <div className="w-full ">
                <Skeleton
                  height={'30px'}
                  width={'30%'}
                  borderRadius={'15px'}
                  className="h-[30px] w-1/3 animate-pulse"
                />
                <Skeleton borderRadius={'15px'} className="h-[30px] w-[80%] animate-pulse" />
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Skeleton borderRadius={'15px'} className="mb-2 h-[30px] w-[30%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[70%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[80%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[50%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[500px] w-[full%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[70%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[80%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[50%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[70%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[80%] animate-pulse" />
            <Skeleton borderRadius={'15px'} className="h-[20px] w-[50%] animate-pulse" />
          </div>
          {/* <div className="mt-3 flex gap-3 bg-red-300">
            <Skeleton borderRadius={'15px'} className="h-[120px] w-[50%] animate-pulse" />
            <div className="w-full">
              <Skeleton borderRadius={'15px'} className="h-[20px] w-[100%] animate-pulse" />
              <Skeleton borderRadius={'15px'} className="h-[20px] w-[100%] animate-pulse" />
              <Skeleton borderRadius={'15px'} className="h-[20px] w-[50%] animate-pulse" />
            </div>
          </div> */}
          <div className="mt-3 flex gap-2 rounded-xl p-2 shadow-border-full">
            <Skeleton borderRadius={'15px'} className="h-[120px] w-[200px] animate-pulse" />
            <div className="mt-2 w-full">
              <Skeleton borderRadius={'15px'} className="h-[20px] w-[80%] animate-pulse" />
              <Skeleton borderRadius={'15px'} className="h-[20px] w-[80%] animate-pulse" />
              <Skeleton borderRadius={'15px'} className="h-[20px] w-[50%] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SkeletonDetailEvent;
