import PaymentStepper from './components/PaymentStepper';
import UserInfor from './components/UserInfor';
import TicketInfor from './components/TicketInfor';
import BillingInfor from './components/BillingInfor';
import Complete from './components/Complete';
import ReviewOrder from './components/ReviewOrder';
import { useParams } from 'react-router-dom';
import BreadcrumbsComponent from '~/components/Breadcrumbs/Breadcrumbs';
import Header from '~/Layout/components/Header';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { refreshPayment } from '~/features/Payment/paymentSlice';
import { useEffect } from 'react';
const Payment = () => {
  const dispatch = useAppDispatch();
  const { step, idEvent } = useParams();
  const activeStep = Number(step);
  const { data } = useGetEventByIdQuery(idEvent || '');
  const event = data?.data;
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
        return <ReviewOrder event={event} />;
      }
      default: {
        return <h1>Not found</h1>;
      }
    }
  };
  const previousEvent = useAppSelector((state) => state.payment.idEvent);
  useEffect(() => {
    if (idEvent !== previousEvent) {
      dispatch(refreshPayment(idEvent));
    }
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <Header />
      <div className="mx-auto py-5 md:w-5/6 ">
        <BreadcrumbsComponent baseLink="Trang chủ" linkBack="/" link={`${event?.title}`} />
        <div className="mx-2 xl:mx-0 ">
          <div className="hidden items-center justify-center rounded-[15px] bg-cs_light shadow-border-full dark:bg-cs_lightDark md:flex">
            <PaymentStepper />
          </div>
          <div className={`${activeStep !== 3 && 'flex'} mt-2 gap-5 xl:mt-5`}>
            <div
              className={`w-full rounded-[12px]  bg-cs_light shadow-border-full dark:bg-cs_lightDark dark:text-cs_light ${
                activeStep !== 3 && 'xl:w-[70%]'
              } `}
            >
              {renderContent(activeStep)}
            </div>

            {/* Phần thông tin đặt vé */}
            {activeStep !== 3 && (
              <ReviewOrder event={event} className="hidden bg-cs_light dark:bg-cs_lightDark xl:block" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;
