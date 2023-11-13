import Icon from '~/components/customs/Icon';
import TicketCard from '../TicketCard';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
import { Icon as Iconify } from '@iconify/react';
import { useAppSelector } from '~/hooks/useActionRedux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Loading from '~/components/customs/Loading';
import { usePayTicketMutation } from '~/features/Payment/paymentApi.service';
import { useEffect, useState } from 'react';
interface Prop {
  className?: string;
  event?: IEvent;
  activeTab?: number;
}
const ReviewOrder = ({ className, event, activeTab }: Prop) => {
  const { idEvent } = useParams();
  const navigate = useNavigate();
  const tickets: any[] = useAppSelector((state) => state.payment.ticket);
  const userInfor = useAppSelector((state) => state.payment.userInfor);

  const [buyTicket, result] = usePayTicketMutation();

  const handleBuyTicket = async () => {
    const body = tickets.map((ticket) => {
      return {
        ticketId: ticket._id,
        quantity: Number(ticket.orderQuantity),
      };
    });
    console.log(body);
    await buyTicket({ tickets: body });
    // navigate(`/user/payment/3`);
  };
  useEffect(() => {
    if (result.isSuccess) {
      window.location.href = result.data?.data;
    }
  }, [result.isLoading]);
  return (
    <div className={`mb-10 rounded-[12px] p-4 shadow-border-full dark:text-cs_light xl:w-[30%] ${className}`}>
      {result.isLoading && <Loading />}
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
          <p className="w-[95%]">{event?.location?.name}</p>
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
        {/* <span>
          <b>Địa chỉ:</b> {userInfor?.address}
        </span> */}
      </div>
      {/* /// */}
      <div className="flex flex-col gap-2 border-b-[0.5px] py-4">
        {tickets?.map((ticket, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TicketCard title={ticket.title} tooltip="Tooltip here" className="w-full" />
                <span className="font-bold text-cs_gray"> x{ticket.orderQuantity} </span>
              </div>
              <span className="text-lg font-bold text-cs_icon_black dark:text-cs_light">
                {(ticket.orderQuantity * ticket.price).toLocaleString('vi')}đ
              </span>
            </div>
          );
        })}
      </div>
      {/* /// */}
      <div className="border-b-[0.5px] py-4">
        <div className="flex w-1/3 items-center gap-2 rounded-xl border p-2 font-semibold shadow-lg">
          <Iconify icon="arcticons:v-vnpay" className="text-2xl dark:text-cs_light" />
          <span>VNPAY</span>
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
          Tổng cộng{' '}
          <span className="text-sm">
            {tickets.reduce((total, item) => total + item.price * item.orderQuantity, 0).toLocaleString('vi')}đ
          </span>
        </p>
        <p className="my-2 flex items-center justify-between font-semibold text-cs_gray">
          Mã giảm giá <span className="text-sm">{'0'}đ</span>
        </p>
        <p className="my-2 flex items-center justify-between text-lg font-bold">
          Thành tiền{' '}
          <span className="text-base text-cs_semi_green">
            {tickets.reduce((total, item) => total + item.price * item.orderQuantity, 0).toLocaleString('vi')}đ
          </span>
        </p>
        {tickets.reduce((total, item) => total + item.price * item.orderQuantity, 0) >= 5000 ? (
          <Button
            onClick={handleBuyTicket}
            value="Thanh toán"
            className="w-full !bg-cs_semi_green text-white !shadow-none"
          />
        ) : (
          <p className="pt-3 text-center text-xs text-red-500">Tổng thanh toán phải trên 5.000đ</p>
        )}
        {/* {(activeTab === 2 || activeTab === 4) && (
        )} */}
      </div>
      {/* /// */}
    </div>
  );
};

export default ReviewOrder;
