import { Card } from '@material-tailwind/react';
import TicketCard from '../TicketCard';
import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { descreaseTicket, inscreaseTicket } from '~/features/Payment/paymentSlice';
import { useNavigate, useParams } from 'react-router-dom';
const TicketInfor = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams();
  const dispatch = useAppDispatch();
  const TABLE_HEAD = ['Loại vé', 'Trạng thái', 'Số lượng', 'Giá vé'];
  const tickets = useAppSelector((state) => state.payment.ticket);
  const eventTicket = [
    {
      _id: 'd09f4246-7957-11ee-b962-0242ac120002',
      title: 'VVip',
      type: '',
      event_id: 'string',
      color: 'red',
      price: 4600000,
      quantity: 12,
      status: false,
    },
    {
      _id: 'd09f4246-7947-12ee-b962-0242bc120032',
      title: 'Offical Ticket',
      type: '',
      event_id: 'string',
      color: 'red',
      price: 4600000,
      quantity: 12,
      status: false,
    },
    {
      _id: 'd09f4246-7657-11ve-a962-0245ac125001',
      title: 'Vip',
      type: '',
      event_id: 'string',
      color: 'red',
      price: 4600000,
      quantity: 0,
      status: false,
    },
    {
      _id: 'd29f4246-7957-11ee-b964-0242vc120402',
      type: '',
      event_id: 'string',
      color: 'red',
      title: 'Ghost Ticket',
      price: 4600000,
      quantity: 12,
      status: false,
    },
  ];

  // Functions

  const inscreaseTicketQuantity = (ticket: ITicket) => {
    if (ticket.quantity > 0) {
      dispatch(inscreaseTicket(ticket));
    }
  };

  const descreaseTicketQuantity = (ticket: ITicket) => {
    if (ticket.quantity > 0) {
      dispatch(descreaseTicket(ticket));
    }
  };

  return (
    <div>
      <div className="relative flex h-[60px] items-center border-b-[0.5px] px-5">
        <button
          onClick={() => {
            navigate(`/user/payment/${idEvent}/0`);
          }}
          className="z-10 flex cursor-pointer items-center"
        >
          <Icon name="arrow-back-outline" className="mr-2 text-xl" />
        </button>
        <h1 className="absolute w-[calc(100%-40px)] text-center font-bold uppercase md:static md:text-left">
          Thông tin vé
        </h1>
      </div>
      <div className="">
        <Card className="bg-transparent p-2 shadow-none md:hidden">
          {eventTicket?.map((ticket: any, index) => {
            const ExistedTicket = tickets.find((t) => t._id === ticket._id);
            return (
              <div key={index} className={`my-[15px] flex`}>
                <div className="flex gap-5 w-full items-center justify-between">
                  <TicketCard
                    className={`!px-1 ${ticket.quantity > 0 ? '' : '!bg-[#eeeeee]'}`}
                    title={ticket.title}
                    tooltip="Tooltip here"
                  />
                  <span>{ticket.price?.toLocaleString('vi')} VNĐ</span>
                  <div className="flex w-[85px] justify-around rounded-[5px] border font-bold text-cs_semi_green shadow-border-full md:mx-auto">
                    <button onClick={() => descreaseTicketQuantity(ticket)}>-</button>
                    <span>{ExistedTicket ? ExistedTicket.orderQuantity : 0}</span>
                    <button onClick={() => inscreaseTicketQuantity(ticket)}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
        <Card className="hidden bg-transparent shadow-none md:block">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`${index === 0 ? 'pl-5 !text-left' : ''} ${
                      index === TABLE_HEAD.length - 1 ? 'pr-5 !text-right' : ''
                    } w-1/4 py-5 text-center text-lg font-bold leading-none text-black opacity-70 dark:text-cs_light`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventTicket.map((ticket: ITicket) => {
                const ExistedTicket = tickets.find((t) => t._id === ticket._id);
                return (
                  <tr key={ticket._id}>
                    <td className="border-t border-[#eee] p-4">
                      <TicketCard
                        title={ticket.title}
                        tooltip="Tooltip here"
                        className={`${ticket.quantity === 0 && 'bg-[#ccc]'}`}
                      />
                    </td>
                    <td className="border-t border-[#eee] p-4">
                      {ticket.quantity > 0 ? (
                        <div className="mx-auto w-20 rounded-full bg-cs_green p-1 text-center text-white">Còn vé</div>
                      ) : (
                        <div className="mx-auto w-20 rounded-full bg-red-400 p-1 text-center text-white">Hết vé</div>
                      )}
                    </td>
                    <td className="border-t border-[#eee] p-4">
                      <div className="mx-auto flex w-[85px] justify-around rounded-[5px] font-bold text-cs_semi_green shadow-border-full">
                        <button onClick={() => descreaseTicketQuantity(ticket)}>-</button>
                        <span>{ExistedTicket ? ExistedTicket.orderQuantity : 0}</span>
                        <button onClick={() => inscreaseTicketQuantity(ticket)}>+</button>
                      </div>
                    </td>
                    <td className="border-t border-[#eeeeee] p-4 text-right font-bold dark:text-cs_light">
                      {ticket.price?.toLocaleString('vi')} VNĐ
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <div className="w-full px-3 pb-3 text-right">
          <Button
            onClick={() => {
              navigate(`/user/payment/${idEvent}/2`);
            }}
            className="md:w mt-5 w-full"
            type="submit"
            mode="dark"
            value="Xác nhận"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketInfor;
