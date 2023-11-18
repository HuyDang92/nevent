import { Link, useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';
const PrIframe = () => {
  const { idEvent, layout } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');

  if (layout === '1') return (
    <div className='fixed bottom-0 left-0 top-0 right-0'>
      <div className='w-full h-full relative'>
        <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
        <div className='absolute top-0 left-0 w-[20vw] h-full bg-pink-200'></div>
        <div className='absolute w-[80%] h-[90%] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-4 border-pink-200'>
          <div className='p-2 w-full h-full relative'>
            <h1 className='font-bold p-2 bg-white text-pink-200 w-auto'>{event?.data?.data?.title}</h1>
            <p className='text-sm text-white absolute bottom-2 right-2 line-clamp-6 max-w-[20rem]'>{event?.data?.data?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (layout === '2') return (
    <div className='fixed bottom-0 flex flex-col bg-red-400 left-0 top-0 right-0'>
      <div className='h-[70%] w-full bg-[#f3f3f3]'></div>
      <div className='h-[30%] w-full bg-yellow-800'></div>
      <div className='absolute w-full h-full p-8 left-0 top-0'>
        <div className='w-full h-full bg-yellow-200 overflow-hidden shadow-border-light flex rounded-lg'>
          <div className='flex-[1.5] h-full'>
            <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
          </div>
          <div className='flex-1 h-full flex justify-end items-end relative p-2'>
            <p className='text-sm text-black line-clamp-6 max-w-[20rem]'>{event?.data?.data?.desc}</p>
          </div>
          <h1 className='font-bold absolute text-white top-12 left-12 bg-yellow-800 p-2 rounded-lg'>{event?.data?.data?.title}</h1>
        </div>
      </div>
    </div>
  )


  if (layout === '3') return (
    <div className='fixed bottom-0 flex flex-col bg-white border-2 border-teal-200 left-0 top-0 right-0'>
      <div className='w-full h-full p-4 relative'>
        <div className='w-full h-full relative border-2 border-teal-200'>
          <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
          <p className='absolute left-1/2 -translate-x-1/2 bottom-0 bg-white translate-y-1/2 p-1 font-semibold text-teal-300 min-w-[80%] text-center shadow-border-light'>{event?.data?.data?.title}</p>
        </div>
      </div>
    </div>
  )


  return (


    <div className="fixed bottom-0 left-0 right-0 border-2 border-black top-0 z-50 bg-white">
      <Link to={`/event-detail/${idEvent}`}>
        <div className="relative h-full">
          <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
          <div className="absolute left-[15px] bottom-[15px] w-[calc(100%-30px)] flex flex-col gap-1 rounded-md border-[1px] border-cs_grayText bg-gray-600 bg-opacity-20 bg-clip-padding p-3 text-[14px] text-cs_light backdrop-blur-sm backdrop-filter">
            <h1 className="text-lg font-bold text-cs_light">{event?.data?.data?.title}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PrIframe;
