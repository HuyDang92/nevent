import { Card } from '@material-tailwind/react';
import TicketCard from '../TicketCard';
import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { descreaseTicket, inscreaseTicket } from '~/features/Payment/paymentSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTicketByEventIdQuery } from '~/features/Event/eventApi.service';
const TicketInfor = () => {
  const navigate = useNavigate();
  const { idEvent } = useParams();
  const dispatch = useAppDispatch();
  const TABLE_HEAD = ['Loại vé', 'Trạng thái', 'Số lượng', 'Còn lại', 'Giá vé'];
  const tickets = useAppSelector((state) => state.payment.ticket);
  const eventTicket = useGetTicketByEventIdQuery(idEvent || '');
  console.log(tickets);

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
        <div className="bg-transparent p-2 shadow-none md:hidden">
          {eventTicket?.data?.data?.map((ticket: ITicket, index: number) => {
            const ExistedTicket = tickets.find((t) => t._id === ticket._id);
            return (
              <div key={index} className={`my-[15px] flex`}>
                <div className="flex w-full items-center justify-between gap-2">
                  <TicketCard
                    className={`!px-2 text-sm ${ticket.quantity > 0 ? '' : '!bg-[#eeeeee]'}`}
                    title={ticket.title}
                    tooltip={ticket.desc}
                  />
                  {ticket?.price === 0 ? 'Miễn phí' : <span>{ticket.price?.toLocaleString('vi')}đ</span>}
                  <div className="flex min-w-[85px] justify-around rounded-[5px] border font-bold text-cs_semi_green shadow-border-full md:mx-auto">
                    <button onClick={() => descreaseTicketQuantity(ticket)}>-</button>
                    <span>{ExistedTicket ? ExistedTicket.orderQuantity : 0}</span>
                    <button onClick={() => inscreaseTicketQuantity(ticket)}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Card className="hidden bg-transparent shadow-none md:block">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className={`${index === 0 ? 'pl-5 !text-left' : ''} ${
                      index === TABLE_HEAD.length - 1 ? 'pr-5 !text-right' : ''
                    } py-5 text-center text-lg font-bold leading-none text-black opacity-70 dark:text-cs_light`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventTicket?.data?.data?.map((ticket: ITicket) => {
                const ExistedTicket = tickets.find((t) => t._id === ticket._id);
                return (
                  <tr key={ticket?._id}>
                    <td className="border-t border-[#eee] p-4">
                      <TicketCard
                        title={ticket?.title}
                        tooltip={ticket?.desc}
                        color={Number(ticket?.quantity) === Number(ticket?.sold) ? '#ccc' : ticket?.color}
                      />
                    </td>
                    <td className="border-t border-[#eee] p-4">
                      {Number(ticket?.quantity) === Number(ticket?.sold) ? (
                        <div className="mx-auto w-20 rounded-full bg-red-400 p-1 text-center text-white">Hết vé</div>
                      ) : (
                        <div className="mx-auto w-20 rounded-full bg-cs_green p-1 text-center text-white">Còn vé</div>
                      )}
                    </td>
                    <td className="border-t border-[#eee] p-4">
                      <div
                        className={`${
                          Number(ticket?.quantity) === Number(ticket?.sold) ? 'text-cs_grayText' : 'text-cs_semi_green'
                        } mx-auto flex w-[80px] justify-around rounded-[5px] font-bold  shadow-border-full`}
                      >
                        <button
                          disabled={Number(ticket?.quantity) === Number(ticket?.sold)}
                          onClick={() => descreaseTicketQuantity(ticket)}
                        >
                          -
                        </button>
                        <span>{ExistedTicket ? ExistedTicket.orderQuantity : 0}</span>
                        <button
                          disabled={Number(ticket?.quantity) === Number(ticket?.sold)}
                          onClick={() => {
                            if(!ExistedTicket) {
                              inscreaseTicketQuantity(ticket);
                            }
                            if (ExistedTicket && ticket?.quantity - ticket?.sold !== ExistedTicket.orderQuantity) {
                              inscreaseTicketQuantity(ticket);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border-t border-[#eeeeee] p-4 text-center font-bold dark:text-cs_light">
                      {ticket?.quantity - ticket?.sold} vé
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
        {tickets.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default TicketInfor;
