import PaymentStepper from './components/PaymentStepper';
import UserInfor from './components/UserInfor';
import TicketInfor from './components/TicketInfor';
import BillingInfor from './components/BillingInfor';
import Complete from './components/Complete';
import ReviewOrder from './components/ReviewOrder';
import { useParams } from 'react-router-dom';
const Payment = () => {
  const { step } = useParams();
  const activeStep = Number(step);
  const renderContent = (activeStep: number) => {
    //Switch case
    switch (activeStep) {
      case 0: {
        return <UserInfor />;
      }
      case 1: {
        return <TicketInfor />;
      }
      case 2: {
        return <BillingInfor />;
      }
      case 3: {
        return <Complete />;
      }
      case 4: {
        return <ReviewOrder />;
      }
      default: {
        return <h1>Not found</h1>;
      }
    }
  };
  return (
    <div className="">
      <div className="hidden h-[135px] items-center justify-center rounded-[15px] shadow-border-full md:flex">
        <PaymentStepper />
      </div>
      <div className="flex gap-10 md:mt-5">
        <div className="w-full rounded-[12px] md:p-3 shadow-border-full dark:text-cs_light md:w-[70%]">
          {renderContent(activeStep)}
        </div>

        {/* Phần thông tin đặt vé */}
        <ReviewOrder className="hidden md:block" />
      </div>
    </div>
  );
};
export default Payment;
