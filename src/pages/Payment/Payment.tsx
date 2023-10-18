import { useState } from 'react';
import PaymentStepper from './components/PaymentStepper';
import RecipientInfor from './components/RecipientInfor';
import TicketInfor from './components/TicketInfor';
import Purchase from './components/Purchase/Purchase';
import Complete from './components/Complete';
import Icon from '~/components/customs/Icon';
import momo from '~/assets/images/momo.svg';
import { Tooltip, Typography } from '@material-tailwind/react';
import Input from '~/components/customs/Input';
import Button from '~/components/customs/Button';
const Payment = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const renderContent = (activeStep: number) => {
    //Switch case
    switch (activeStep) {
      case 0: {
        return <RecipientInfor />;
      }
      case 1: {
        return <TicketInfor />;
      }
      case 2: {
        return <Purchase />;
      }
      case 3: {
        return <Complete />;
      }
      default: {
        return <h1>Not found</h1>;
      }
    }
  };
  return (
    <div className="">
      <div className="flex h-[135px] items-center justify-center rounded-[15px] shadow-border-full">
        <PaymentStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
      <div className="mt-5 flex gap-10">
        <div className="w-[70%] rounded-[12px] shadow-border-full">{renderContent(activeStep)}</div>

        {/* Phần thông tin đặt vé */}
        <div className="w-[30%] rounded-[12px] bg-cs_light p-4 shadow-border-full">
          <div className="flex items-center border-b-[0.5px]">
            <h2 className="mb-4 text-sm font-bold uppercase">Thông tin đặt vé</h2>
          </div>
          {/* /// */}
          <div className="flex flex-col gap-3 border-b-[0.5px] py-4">
            <h3 className="text-xl font-bold">Ford V Ferratir</h3>
            <p className="flex items-center gap-1 text-sm font-semibold">
              <Icon name="time-outline" />
              18:00
            </p>
            <p className="flex items-center gap-1 text-sm font-semibold">
              <Icon name="calendar" />
              Ngày 21 tháng 10 năm 2023
            </p>
            <div className="flex items-center justify-between text-sm font-semibold">
              <Icon name="location" className="" />
              <p className="w-[95%]">
                Trung tâm Hội nghị Adora Center, 431 Hoàng Văn Thụ, Phường 4, Tân Bình, Hồ Chí Minh
              </p>
            </div>
          </div>
          {/* /// */}
          <div className="flex flex-col gap-2 border-b-[0.5px] py-4">
            {/* item */}
            <div className="flex items-center justify-between">
              <div className="flex w-[28%] items-center gap-3">
                <div className="flex items-center justify-between gap-1 rounded-xl bg-cs_semi_green px-4 py-2 text-center font-semibold text-white">
                  VVip{' '}
                  <Tooltip
                    className="bg-white shadow-lg"
                    content={
                      <div className="w-80 ">
                        <Typography color="black" className="font-medium">
                          Material Tailwind
                        </Typography>
                        <Typography variant="small" color="black" className="font-normal opacity-80">
                          Material Tailwind is an easy to use components library for Tailwind CSS and Material Design.
                        </Typography>
                      </div>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-5 w-5 cursor-pointer text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </Tooltip>
                </div>
                <span className="font-bold text-cs_gray"> x2 </span>
              </div>
              <span className="text-lg font-bold text-cs_icon_black">9.200.000đ</span>
            </div>
            {/* item */}
            <div className="flex items-center justify-between">
              <div className="flex w-[28%] items-center gap-3">
                <div className="flex items-center justify-between gap-1 rounded-xl bg-cs_semi_green px-4 py-2 text-center font-semibold text-white">
                  VVip{' '}
                  <Tooltip
                    className="bg-white shadow-lg"
                    content={
                      <div className="w-80 ">
                        <Typography color="black" className="font-medium">
                          Material Tailwind
                        </Typography>
                        <Typography variant="small" color="black" className="font-normal opacity-80">
                          Material Tailwind is an easy to use components library for Tailwind CSS and Material Design.
                        </Typography>
                      </div>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-5 w-5 cursor-pointer text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </Tooltip>
                </div>
                <span className="font-bold text-cs_gray"> x2 </span>
              </div>
              <span className="text-lg font-bold text-cs_icon_black">9.200.000đ</span>
            </div>
          </div>
          {/* /// */}
          <div className="border-b-[0.5px] py-4">
            <div className="flex w-1/3 items-center gap-2 rounded-xl border p-2 font-semibold shadow-lg">
              <img src={momo} alt="momo" className="w-[25px]" />
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
            <Button value="Thanh toán" className="w-full !bg-cs_semi_green text-white !shadow-none" />
          </div>
          {/* /// */}
        </div>
      </div>
    </div>
  );
};
export default Payment;
