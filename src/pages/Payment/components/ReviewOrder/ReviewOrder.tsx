import Icon from '~/components/customs/Icon';
import TicketCard from '../TicketCard';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
import { Icon as Iconify } from '@iconify/react';
import { useAppSelector } from '~/hooks/useActionRedux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useBuyTicket } from '~/hooks/useFirebase';
import Loading from '~/components/customs/Loading';
interface Prop {
  className?: string;
  event?: IEvent;
}
const ReviewOrder = ({ className, event }: Prop) => {
  console.log(event);

  const { idEvent } = useParams();
  const navigate = useNavigate();
  const tickets = useAppSelector((state) => state.payment.ticket);
  const userInfor = useAppSelector((state) => state.payment.userInfor);
  const auth = useAppSelector((state) => state.auth.currentUser);

  const { buyTicket, isPending } = useBuyTicket();

  const handleBuyTicket = async () => {
    const data = {
      event_id: event?._id,
      bannerEvent: event?.banner[0]?.url,
      category: event?.categories[0]?.name,
      date: event?.start_date,
      titleEvent: event?.title,
      owner: auth?._id,
      tickets: tickets,
    };
    await buyTicket(data);
    navigate(`/user/payment/${idEvent}/3`);
  };

  return (
    <div className={`rounded-[12px] p-4 shadow-border-full dark:text-cs_light md:w-[30%] ${className}`}>
      {isPending && <Loading />}
      <div className="relative flex h-[60px] items-center border-b-[0.5px]">
        <button
          onClick={() => {
            navigate(`/user/payment/${idEvent}/2`);
          }}
          className="z-10 flex cursor-pointer items-center md:hidden"
        >
          <Icon name="arrow-back-outline" className="mr-2 text-xl" />
        </button>
        <h1 className="absolute w-full text-center font-bold uppercase">Thông tin đặt vé</h1>
      </div>
      {/* /// */}
      <div className="flex flex-col gap-3 border-b-[0.5px] py-4">
        <h3 className="text-xl font-bold">{event?.title}</h3>
        <p className="flex items-center gap-1 text-sm font-semibold">
          <Icon name="time-outline" />
          18:00
        </p>
        <p className="flex items-center gap-1 text-sm font-semibold">
          <Icon name="calendar" />
          {moment(event?.start_date).format('dddd, DD MMMM YY')}
        </p>
        <div className="flex items-center justify-between text-sm font-semibold">
          <Icon name="location" className="" />
          <p className="w-[95%]">{event?.location}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-b-[0.5px] py-4">
        <h3 className="text-xl font-bold">Thông tin người nhận</h3>
        <span>
          <b>Họ và tên:</b> {userInfor?.fullName}
        </span>
        <span>
          <b>Email:</b> {userInfor?.email}
        </span>
        <span>
          <b>Số điện thoại:</b> {userInfor?.phone}
        </span>
        <span>
          <b>Địa chỉ:</b> {userInfor?.address}
        </span>
      </div>
      {/* /// */}
      <div className="flex flex-col gap-2 border-b-[0.5px] py-4">
        {tickets?.map((ticket) => (
          <div key={ticket._id} className="flex items-center justify-between">
            <div className="flex w-[28%] items-center gap-3">
              <TicketCard title={ticket.title} tooltip="Tooltip here" />
              <span className="font-bold text-cs_gray"> x{ticket.orderQuantity} </span>
            </div>
            <span className="text-lg font-bold text-cs_icon_black dark:text-cs_light">
              {(ticket.orderQuantity * ticket.price).toLocaleString('vi')}đ
            </span>
          </div>
        ))}
      </div>
      {/* /// */}
      <div className="border-b-[0.5px] py-4">
        <div className="flex w-1/3 items-center gap-2 rounded-xl border p-2 font-semibold shadow-lg">
          <Iconify icon="arcticons:momo" className="text-2xl dark:text-cs_light" />
          <span>MoMo</span>
        </div>
      </div>
      {/* /// */}
      <div className="border-b-[0.5px] py-4">
        <Input placeholder="Nhập mã giảm giá" className="" classNameInput="w-full !shadow-none !border-2" />
        <Button value="Xác nhận" className="mt-2 w-full border-2 border-cs_semi_green !shadow-none" />
      </div>
      {/* /// */}
      <div className="border-b-[0.5px] px-1 py-4">
        <p className="flex items-center justify-between font-semibold text-cs_gray">
          Tổng cộng <span className="text-sm">13.800.000 VND</span>
        </p>
        <p className="my-2 flex items-center justify-between font-semibold text-cs_gray">
          Mã giảm giá <span className="text-sm">1.800.000 VND</span>
        </p>
        <p className="my-2 flex items-center justify-between text-lg font-bold">
          Thành tiền <span className="text-base text-cs_semi_green">12.000.000 VND</span>
        </p>
        <Button
          onClick={handleBuyTicket}
          value="Thanh toán"
          className="w-full !bg-cs_semi_green text-white !shadow-none"
        />
      </div>
      {/* /// */}
    </div>
  );
};

export default ReviewOrder;
