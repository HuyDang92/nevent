import { Stepper, Step, Typography } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
interface PaymentStepperProps {
  className?: string;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const PaymentStepper = ({ activeStep = 0, setActiveStep, className }: PaymentStepperProps) => {
  return (
    <div className={`w-full px-24 py-4 ${className}`}>
      <Stepper activeStep={activeStep} activeLineClassName="bg-cs_semi_green">
        <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 0 : activeStep)}
          onClick={() => setActiveStep(0)}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <IonIcon name="ticket-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 0 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Thông tin người mua
            </Typography>
          </div>
        </Step>
        <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 1 : activeStep)}
          onClick={() => setActiveStep(1)}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <IonIcon name="person-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 1 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Thông tin vé
            </Typography>
          </div>
        </Step>
        <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 2 : activeStep)}
          onClick={() => setActiveStep(2)}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <IonIcon name="wallet-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 2 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Thanh toán
            </Typography>
          </div>
        </Step>
        <Step
          //  onClick={() => setActiveStep(activeStep >= 1 ? 3 : activeStep)}
          onClick={() => setActiveStep(3)}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <IonIcon name="checkmark-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 3 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Hoàn thành
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default PaymentStepper;
