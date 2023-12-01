import TicketProfile from '~/components/TicketProfile';
import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';
import SearchUser from '~/components/customs/SearchUser';
import { useAppSelector } from '~/hooks/useActionRedux';
import {
  useLazyGetCodeVerifySwapTicketQuery,
  useSwapTicketMutation,
  useVerifySwapTicketMutation,
} from '~/features/Auth/authApi.service';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '~/components/customs/Loading';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import useSocket from '~/hooks/useConnecrSocket';
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';

function PassTicket() {
  const navigate = useNavigate();
  const socket = useSocket();
  const [code, setCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const [userReceive, setUserReceive] = useState<IUserField | null>(null);
  const [idTicket, setIdTicket] = useState<string>('');
  const auth = useAppSelector((state) => state.auth.currentUser);
  const getTickets = useAppSelector((state) => state.ticket.ticketByEvent);
  const [getCode, resultGetCode] = useLazyGetCodeVerifySwapTicketQuery();
  // const [swap, result] = useSwapTicketMutation();
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
    if (count > 0) {
      setOpen(true);
      return;
    }
    await getCode();
    setCount(30);
  };
  const handleSubmit = async (type: string) => {
    if (type === 'send') {
      await getCode();
      setCode('');
      setCount(30);
      return;
    }
    if (type === 'confirm') {
      await verify({ myTicketId: idTicket, userId: userReceive?._id, otp: { secret, code: Number(code) } });
    }
  };

  useEffect(() => {
    if (resultGetCode.isSuccess) {
      setOpen(true);
      setSecret(resultGetCode.data?.data?.secret);
    }
    if (resultGetCode.isError) {
      errorNotify('Có lỗi xảy ra');
    }
  }, [resultGetCode.isSuccess, resultGetCode.isError]);
  useEffect(() => {
    if (resultVerify.isSuccess) {
      successNotify('Chuyển giao vé thành công');
      socket.emit('send-notification', {
        sender: auth?._id,
        recipient: userReceive?._id,
        content: `${auth?.fullName} đã chuyển giao vé cho bạn vé! Kiểm tra ví ngay`,
        url: import.meta.env.VITE_CLIENT_URL + '/user/profile/1',
      } as IPayloadNotify);
      setOpen(false);
      setCode('');
      navigate('/user/profile/1');
    }
    if (resultVerify.isError) {
      errorNotify('Xác thực thất bại');
      setCode('');
      setOpen(false);
    }
  }, [resultVerify.isSuccess, resultVerify.isError]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="space-y-5">
      {(resultGetCode.isFetching || resultVerify.isLoading) && <Loading />}
      <Dialog
        open={open}
        handler={setOpen}
        className="dark:bg-cs_lightDark"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
      >
        <DialogBody className="relative space-y-5 text-center font-normal">
          <p className="text-center text-lg font-bold uppercase text-cs_semi_green">Nhập mã OTP</p>
          <span className="">Email: {auth?.email}</span>
          <Input
            placeholder="Nhập mã OTP"
            classNameInput="w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <p className="">
            Gửi lại mã sau{' '}
            {count === 0 ? (
              <span className="cursor-pointer text-cs_semi_green" onClick={() => handleSubmit('send')}>
                Gửi lại mã
              </span>
            ) : (
              <span className="text-cs_semi_green">{count} giây</span>
            )}
          </p>
        </DialogBody>
        <DialogFooter className="flex justify-center pt-0">
          <Button
            disabled={!code}
            value="Xác nhận"
            className={` !text-white ${code ? '!bg-cs_semi_green' : 'cursor-not-allowed bg-cs_grayText'}`}
            onClick={() => handleSubmit('confirm')}
          />
        </DialogFooter>
      </Dialog>
      <h1 className="text-lg font-bold dark:text-cs_light">Chuyển giao vé</h1>
      <Link to="/user/profile/1" className="flex w-fit cursor-pointer items-center gap-3 rounded-lg bg-[#eee] px-3">
        <Icon name="return-up-back-outline" />
        <span className="">Trở về</span>
      </Link>
      {/* <div className="py-2 xl:mx-40">
        {getTickets.length > 0 &&
          getTickets.map((item: ITicket, index: number) => <TicketProfile passTicket key={index} data={item} />)}
      </div> */}
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
