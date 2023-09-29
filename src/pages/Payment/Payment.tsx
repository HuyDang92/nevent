import { useState } from 'react';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';

const Payment = () => {
  const [activeStep, setActiveStep] = useState(0);
  //   const [isLastStep, setIsLastStep] = useState(false);
  //   const [isFirstStep, setIsFirstStep] = useState(false);

  //   const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  //   const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <>
      <div className="mx-auto w-4/6 px-24 py-4">
        <Stepper
          activeStep={activeStep}
          //   isLastStep={(value) => setIsLastStep(value)}
          //   isFirstStep={(value) => setIsFirstStep(value)}
          activeLineClassName="bg-cs_purple"
        >
          <Step
            onClick={() => setActiveStep(0)}
            activeClassName="!bg-cs_purple text-white"
            completedClassName="!bg-cs_purple text-white"
          >
            <IonIcon name="ticket-outline" className="h-5 w-5 text-2xl" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography variant="h6" color={activeStep === 0 ? 'blue-gray' : 'gray'}>
                Thông tin vé
              </Typography>
            </div>
          </Step>
          <Step
            onClick={() => setActiveStep(1)}
            activeClassName="!bg-cs_purple text-white"
            completedClassName="!bg-cs_purple text-white"
          >
            <IonIcon name="person-outline" className="h-5 w-5 text-2xl" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography variant="h6" color={activeStep === 1 ? 'blue-gray' : 'gray'}>
                Thông tin người mua
              </Typography>
            </div>
          </Step>
          <Step
            onClick={() => setActiveStep(2)}
            activeClassName="!bg-cs_purple text-white"
            completedClassName="!bg-cs_purple text-white"
          >
            <IonIcon name="wallet-outline" className="h-5 w-5 text-2xl" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography variant="h6" color={activeStep === 2 ? 'blue-gray' : 'gray'}>
                Thanh toán
              </Typography>
            </div>
          </Step>
          <Step
            onClick={() => setActiveStep(3)}
            activeClassName="!bg-cs_purple text-white"
            completedClassName="!bg-cs_purple text-white"
          >
            <IonIcon name="checkmark-outline" className="h-5 w-5 text-2xl" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography variant="h6" color={activeStep === 3 ? 'blue-gray' : 'gray'}>
                Hoàn thành
              </Typography>
            </div>
          </Step>
        </Stepper>
        {/* <div className="mt-32 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div> */}
      </div>
    </>
  );
};
export default Payment;
