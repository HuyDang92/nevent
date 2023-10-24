import { Card } from '@material-tailwind/react';
import TicketCard from '../TicketCard';
import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const TicketInfor = ({ setActiveStep }: Prop) => {
  const TABLE_HEAD = ['Loại vé', 'Trạng thái', 'Số lượng', 'Giá vé'];
  const conVe = false;
  const ticketList = [
    {
      title: 'VVip',
      price: 4600000,
    },
    {
      title: 'Offical Ticket',
      price: 4600000,
    },
    {
      title: 'VIP',
      price: 4600000,
    },
    {
      title: 'Ghost Ticket',
      price: 4600000,
    },
  ];
  return (
    <div>
      <div className="relative flex h-[60px] items-center border-b-[0.5px] px-5">
        <button
          onClick={() => setActiveStep(0)}
          className="z-10 flex cursor-pointer items-center md:hidden"
        >
          <Icon name="arrow-back-outline" className="mr-2 text-xl" />
        </button>
        <h1 className="absolute w-[calc(100%-40px)] text-center font-bold uppercase md:static md:text-left">
          Thông tin vé
        </h1>
      </div>
      <div className="">
        <Card className="bg-transparent p-1 md:hidden">
          {ticketList.map((ticket, index) => (
            <div key={index} className={`my-[15px] flex`}>
              <div className="flex w-full items-center justify-between">
                <TicketCard
                  className={`!px-1 ${conVe ? '' : '!bg-[#eeeeee]'}`}
                  title={ticket.title}
                  tooltip="Tooltip here"
                />
                <span>{ticket.price?.toLocaleString('vi')} VNĐ</span>
                <div className="flex border w-[85px] justify-around rounded-[5px] font-bold text-cs_semi_green shadow-border-full md:mx-auto">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                {/* <div className="ml-[15px] md:ml-0 ">
                  {conVe ? (
                    <div className="w-20 rounded-full bg-cs_green p-1 text-center text-white md:mx-auto">Còn vé</div>
                  ) : (
                    <div className="w-20 rounded-full bg-red-400 p-1 text-center text-white md:mx-auto">Hết vé</div>
                  )}
                </div> */}
              </div>
            </div>
          ))}
        </Card>
        <Card className="hidden bg-transparent md:block">
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
              {ticketList.map((ticket, index) => {
                return (
                  <tr key={index}>
                    <td className="border-t border-[#eeeeee] p-4">
                      <TicketCard title={ticket.title} tooltip="Tooltip here" />
                    </td>
                    <td className="border-t border-[#eeeeee] p-4">
                      {conVe ? (
                        <div className="mx-auto w-20 rounded-full bg-cs_green p-1 text-center text-white">Còn vé</div>
                      ) : (
                        <div className="mx-auto w-20 rounded-full bg-red-400 p-1 text-center text-white">Hết vé</div>
                      )}
                    </td>
                    <td className="border-t border-[#eeeeee] p-4">
                      <div className="mx-auto border flex w-[85px] justify-around rounded-[5px] font-bold text-cs_semi_green shadow-border-full">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
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
        <div className="w-full text-right">
          <Button
            onClick={() => setActiveStep(2)}
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
