import { Card, TabsHeader, Typography } from '@material-tailwind/react';
import TicketCard from '../TicketCard';

const TicketInfor = () => {
  const TABLE_HEAD = ['Loại vé', 'Trạng thái', 'Số lượng', 'Giá vé'];
  const conVe = true;
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
      job: 'Executive',
    },
    {
      title: 'Ghost Ticket',
      job: 'Developer',
    },
  ];
  return (
    <div>
      <div className="flex h-[60px] items-center border-b-[0.5px] px-5">
        <h1 className="font-bold uppercase">Thông tin vé</h1>
      </div>
      <div className='m-4'>
        <Card className='bg-transparent shadow-border-full'>
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
                    <td className="border-t border-cs_gray p-4">
                      <TicketCard title={ticket.title} tooltip="Tooltip here" />
                    </td>
                    <td className="border-t border-cs_gray p-4">
                      {conVe ? (
                        <div className="mx-auto w-20 rounded-full bg-cs_green p-1 text-center text-white">Còn vé</div>
                      ) : (
                        <div className="mx-auto w-20 rounded-full bg-red-400 p-1 text-center text-white">Hết vé</div>
                      )}
                    </td>
                    <td className="border-t border-cs_gray p-4">
                      <div className="w-[85px] mx-auto rounded-[5px] shadow-border-full flex justify-around text-cs_semi_green font-bold">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </td>
                    <td className="border-t border-cs_gray p-4 text-right font-bold dark:text-cs_light">4.600.000 VND</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default TicketInfor;
