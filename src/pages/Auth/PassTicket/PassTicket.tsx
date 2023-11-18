import TicketProfile from '~/components/TicketProfile';
import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import SearchUser from '~/components/customs/SearchUser';
import { useAppSelector } from '~/hooks/useActionRedux';
import { useSwapTicketMutation, useVerifySwapTicketMutation } from '~/features/Auth/authApi.service';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '~/components/customs/Loading';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import useSocket from '~/hooks/useConnecrSocket';

function PassTicket() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [userReceive, setUserReceive] = useState<IUserField | null>(null);
  const [idTicket, setIdTicket] = useState<string>('');
  const auth = useAppSelector((state) => state.auth.currentUser);
  const getTickets = useAppSelector((state) => state.ticket.ticketByEvent);
  const [swap, result] = useSwapTicketMutation();
  const [verify, resultVerify] = useVerifySwapTicketMutation();

  const handleSwapTicket = async () => {
    if (!userReceive) {
      errorNotify('Vui lòng chọn người nhận');
      return;
    }
    if (!idTicket) {
      errorNotify('Vui lòng chọn loại vé');
      return;
    }
    if (auth?.email === userReceive?.email) {
      errorNotify('Vui lòng chọn người nhận khác');
      return;
    }
    await swap({ myTicketId: idTicket, userId: userReceive?._id });
    socket.emit('send-notification', {
      sender: auth?._id,
      recipient: userReceive?._id,
      content: `${auth?.fullName} đã chuyển giao vé cho bạn vé! Kiểm tra ví ngay`,
      url: import.meta.env.VITE_CLIENT_URL + '/user/profile/1',
    } as IPayloadNotify);
  };
  useEffect(() => {
    if (result.isSuccess) {
      successNotify('Chuyển giao vé thành công');
      navigate('/user/profile/1');
    }
    if (result.isError) {
      errorNotify('Chuyển giao vé thất bại');
    }
  }, [result.isSuccess, result.isError]);
  return (
    <div className="space-y-5">
      {result.isLoading && <Loading />}
      <h1 className="text-lg font-bold dark:text-cs_light">Chuyển giao vé</h1>
      <Link to="/user/profile/1" className="flex w-fit cursor-pointer items-center gap-3 rounded-lg bg-[#eee] px-3">
        <Icon name="return-up-back-outline" />
        <span className="">Trở về</span>
      </Link>
      <div className="py-2 xl:mx-40">
        {getTickets.length > 0 &&
          getTickets.map((item: ITicket, index: number) => <TicketProfile passTicket key={index} data={item} />)}
      </div>
      <div className="items-center gap-5 space-y-2 sm:flex">
        <SearchUser setUserReceive={setUserReceive} className="rounded-lg shadow-border-light" />
        <select
          onChange={(e) => setIdTicket(e.target.value)}
          className="min-w-[240px] rounded-lg p-2 text-[#ccc] shadow-border-light"
          name=""
          id=""
        >
          <option>Chọn vé</option>
          {getTickets[0]?.myTickets?.map((item: Ticket, index: number) => {
            return (
              <option key={index} value={item?._id}>
                {item?.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col items-center gap-8 rounded-xl p-5 shadow-border-inset dark:bg-cs_dark sm:flex-row">
        <div className="w-full sm:w-1/2">
          <h2 className="py-2 text-center font-semibold dark:text-cs_light">Thông tin người sỡ hữu</h2>
          <Input
            readonly
            id="fullName"
            name="fullName"
            classNameInput="w-full"
            label="Họ và tên"
            value={auth?.fullName ?? ''}
          />
          <Input
            readonly
            id="phone"
            name="phone"
            classNameInput="w-full"
            label="Số điện thoại"
            value={auth?.phone ?? 'Chưa cập nhật'}
          />
          <Input readonly id="email" name="email" classNameInput="w-full" label="Email" value={auth?.email ?? ''} />
        </div>
        <Icon name="shuffle-outline" className="rotate-90 text-2xl sm:rotate-0" />
        <div className="w-full sm:w-1/2">
          <h2 className="py-2 text-center font-semibold dark:text-cs_light">Thông tin người nhận</h2>
          <Input
            readonly
            id="fullName"
            name="fullName"
            classNameInput="w-full"
            label="Họ và tên"
            value={userReceive?.fullName ?? ''}
          />
          <Input
            readonly
            id="phone"
            name="phone"
            classNameInput="w-full"
            label="Số điện thoại"
            value={userReceive?.phone ?? ''}
          />
          <Input
            readonly
            id="email"
            name="email"
            classNameInput="w-full"
            label="Email"
            value={userReceive?.email ?? ''}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={() => setUserReceive(null)} value="Reset" className="w-32 border border-cs_semi_green" />
        <Button onClick={handleSwapTicket} value="Xác nhận" className="w-32 border border-cs_semi_green" mode="dark" />
      </div>
    </div>
  );
}

export default PassTicket;
