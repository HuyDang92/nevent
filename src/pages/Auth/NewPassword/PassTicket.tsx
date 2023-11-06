import { useEffect, useState } from 'react';
import TicketProfile from '~/components/TicketProfile';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import SearchUser from '~/components/customs/SearchUser';
import { useAppSelector } from '~/hooks/useActionRedux';
import { useGetTicketsUser } from '~/hooks/useFirebase';

function PassTicket() {
  const [dataTicket, setDataTicket] = useState<any[]>([]);
  const { getTickets, data, isPending } = useGetTicketsUser();
  const auth = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    getTickets(auth ? auth?._id : '');
    if (data) {
      setDataTicket(data);
    }
  }, [auth]);

  useEffect(() => {
    if (!isPending) {
      setDataTicket(data);
    }
  }, [isPending]);
  return (
    <div className="space-y-5">
      <h1 className="text-lg font-bold dark:text-cs_light">Chuyển giao vé</h1>
      {dataTicket.length > 0 && dataTicket.map((item, index) => <TicketProfile key={index} data={item} />)}
      <div className="flex items-center gap-5">
        <SearchUser className="rounded-lg shadow-border-light" />
        <select className="min-w-[240px] rounded-lg p-2 text-[#ccc] shadow-border-light" name="" id="">
          <option value="">Chọn loại vé</option>
        </select>
      </div>
      <div className="flex gap-10 rounded-lg p-5 shadow-border-inset dark:bg-cs_dark">
        <div className="w-1/2">
          <h2 className="font-semibold dark:text-cs_light text-center py-2">Thông tin người sỡ hữu</h2>
          <Input id="fullName" name="fullName" classNameInput="w-full" label="Họ và tên" />
          <Input id="phone" name="phone" classNameInput="w-full" label="Số điện thoại" />
          <Input id="email" name="email" classNameInput="w-full" label="Email" />
        </div>
        <div className="w-1/2">
          <h2 className="font-semibold dark:text-cs_light text-center py-2">Thông tin người nhận</h2>
          <Input id="fullName" name="fullName" classNameInput="w-full" label="Họ và tên" />
          <Input id="phone" name="phone" classNameInput="w-full" label="Số điện thoại" />
          <Input id="email" name="email" classNameInput="w-full" label="Email" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button value="Reset" className='border border-cs_semi_green w-32'/>
        <Button value="Xác nhận" className='border border-cs_semi_green w-32' mode='dark'/>
      </div>
    </div>
  );
}

export default PassTicket;