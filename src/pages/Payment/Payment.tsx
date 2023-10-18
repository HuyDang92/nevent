import { useState } from 'react';
import PaymentStepper from './components/PaymentStepper';
import RecipientInfor from './components/RecipientInfor';
import TicketInfor from './components/TicketInfor';
import Purchase from './components/Purchase/Purchase';
import Complete from './components/Complete';
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
        <div>
          <div className="flex h-[60px] items-center border-b-[0.5px] px-5">
            <h1 className="font-bold uppercase">Thông tin đặt vé</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
