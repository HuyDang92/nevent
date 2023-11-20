import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import Icon from '~/components/customs/Icon';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { addTicketByEvent } from '~/features/Auth/ticketSlice';
import { MouseEvent } from 'react';

type ActionProps = {
  data: ITicket;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};
const Action = ({ data, onClick }: ActionProps) => {
  const dispatch = useAppDispatch();
  const [openAction, setOpenAction] = useState<boolean>(false);
  const toolRef: any = useRef(null);
  //   console.log(toolRef);

  useClickOutside(toolRef, () => {
    setOpenAction(false);
  });

  const handlePass = (item: ITicket) => {
    dispatch(addTicketByEvent(item));
    setOpenAction(false);
  };
  return (
    <>
      <div ref={toolRef} onClick={() => setOpenAction(!openAction)} className="">
        <Icon
          name="ellipsis-vertical-outline"
          className="rounded-full p-1 text-xl transition-all hover:scale-110 hover:bg-[#eee] hover:text-cs_dark"
        />
      </div>
      <div
        className={`${
          openAction ? 'h-fit w-fit p-2' : 'h-0 w-0'
        } absolute right-6 top-12 z-20 overflow-hidden rounded-lg bg-cs_light text-sm  text-cs_grayText transition-all`}
      >
        {data?.myTickets?.length > 1 && (
          <button
            onClick={onClick}
            className="flex w-full cursor-pointer items-center gap-2  rounded-md p-2 transition-all hover:bg-[#eee]"
          >
            <Icon name="download-outline" />
            <span>Tải vé</span>
          </button>
        )}
        <li onClick={() => handlePass(data)}>
          <Link
            to="/user/pass-event"
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:bg-[#eee]"
          >
            <Icon name="send-outline" />
            <span>Chuyển giao vé</span>
          </Link>
        </li>
      </div>
    </>
  );
};
export default Action;
