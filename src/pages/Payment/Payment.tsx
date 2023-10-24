import { useState } from 'react';
import PaymentStepper from './components/PaymentStepper';
import RecipientInfor from './components/RecipientInfor';
import TicketInfor from './components/TicketInfor';
import Purchase from './components/Purchase/Purchase';
import Complete from './components/Complete';
import PaymentInfor from './components/PaymentInfor';
import Header from '~/Layout/components/Header';
import BreadcrumbsComponent from '~/components/Breadcrumbs/Breadcrumbs';
const Payment = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const renderContent = (activeStep: number) => {
    //Switch case
    switch (activeStep) {
      case 0: {
        return <RecipientInfor setActiveStep={setActiveStep} />;
      }
      case 1: {
        return <TicketInfor setActiveStep={setActiveStep} />;
      }
      case 2: {
        return <Purchase setActiveStep={setActiveStep} />;
      }
      case 3: {
        return <Complete />;
      }
      case 4: {
        return <PaymentInfor setActiveStep={setActiveStep} />;
      }
      default: {
        return <h1>Not found</h1>;
      }
    }
  };
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl py-5">
        <BreadcrumbsComponent baseLink="Trang chủ" linkBack="/" link={'Name event'} />

        <div className="hidden h-[135px] items-center justify-center rounded-[15px] bg-cs_light shadow-border-full dark:bg-cs_lightDark md:flex">
          <PaymentStepper activeStep={activeStep} setActiveStep={setActiveStep} />
        </div>
        <div className="flex gap-5 md:mt-5 ">
          <div className="w-full rounded-[12px]  bg-cs_light shadow-border-full dark:bg-cs_lightDark dark:text-cs_light md:w-[70%]">
            {renderContent(activeStep)}
          </div>

          {/* Phần thông tin đặt vé */}
          <PaymentInfor className="hidden md:block" />
        </div>
      </div>
    </>
  );
};
export default Payment;
