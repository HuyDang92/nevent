import { Link, useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';

const PrIframe = () => {
  const { idEvent, layout } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');

  if (layout === '1')
    return (
      <div className="fixed bottom-0 left-0 right-0 top-0">
        <div className="relative h-full w-full">
          <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
          <div className="absolute left-0 top-0 h-full w-[20vw] bg-pink-200"></div>
          <div className="absolute left-1/2 top-1/2 h-[90%] w-[80%] -translate-x-1/2 -translate-y-1/2 border-4 border-pink-200">
            <div className="relative h-full w-full p-2">
              <h1 className="w-auto bg-white p-2 font-bold text-pink-200">{event?.data?.data?.title}</h1>
            </div>
          </div>
        </div>
      </div>
    );

  if (layout === '2')
    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 flex flex-col bg-red-400">
        <div className="h-[70%] w-full bg-[#f3f3f3]"></div>
        <div className="h-[30%] w-full bg-yellow-800"></div>
        <div className="absolute left-0 top-0 h-full w-full p-8">
          <div className="flex h-full w-full overflow-hidden rounded-lg bg-yellow-200 shadow-border-light">
            <div className="h-full flex-[1.5]">
              <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
            </div>

            <h1 className="absolute left-12 top-12 rounded-lg bg-yellow-800 p-2 font-bold text-white">
              {event?.data?.data?.title}
            </h1>
          </div>
        </div>
      </div>
    );

  if (layout === '3')
    return (
      <div className="fixed bottom-0 rounded-lg left-0 right-0 top-0 flex flex-col border-2 border-teal-200 bg-white">
        <div className="relative h-full w-full p-4 ">
          <div className="relative h-full w-full border-2 border-teal-200 ">
            <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
            <p className="absolute bottom-0 left-1/2 min-w-[80%] -translate-x-1/2 translate-y-1/2 bg-white p-1 text-center font-semibold text-teal-300 shadow-border-light">
              {event?.data?.data?.title}
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 border-2 border-black bg-white">
      <Link to={`/event-detail/${idEvent}`}>
        <div className="relative h-full">
          <img src={event?.data?.data?.banner[0].url} className="h-full w-full bg-center object-cover" alt="" />
          <div className="absolute bottom-[15px] left-[15px] flex w-[calc(100%-30px)] flex-col gap-1 rounded-md border-[1px] border-cs_grayText bg-gray-600 bg-opacity-20 bg-clip-padding p-3 text-[14px] text-cs_light backdrop-blur-sm backdrop-filter">
            <h1 className="text-lg font-bold text-cs_light">{event?.data?.data?.title}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PrIframe;
