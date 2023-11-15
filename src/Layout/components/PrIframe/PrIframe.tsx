import { Link, useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';
import { Icon as Iconfy } from '@iconify/react';
import moment from 'moment';
const PrIframe = () => {
  const { idEvent } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50">
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
