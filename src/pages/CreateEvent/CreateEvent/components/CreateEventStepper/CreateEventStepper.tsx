import { Stepper, Step, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router';
import Icon from '~/components/customs/Icon';
interface CreateEventStepperProps {
  className?: string;
}
const CreateEventStepper = ({ className }: CreateEventStepperProps) => {
  const navigate = useNavigate();
  const { step } = useParams();
  const activeStep = Number(step);
  return (
    <div className={`w-full px-24 py-4 ${className}`}>
      <Stepper activeStep={activeStep} activeLineClassName="bg-cs_semi_green">
        <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 0 : activeStep)}
          onClick={() => {
            if (activeStep >= 1) {
              navigate(`/organization/create-event/0`);
            }
          }}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <Icon name="person-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 0 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Thông tin sự kiện
            </Typography>
          </div>
        </Step>
        <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 1 : activeStep)}
          onClick={() => {
            if (activeStep >= 2) {
              navigate(`/organization/create-event/1`);
            }
          }}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <Icon name="time-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 1 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Thời gian sự kiện
            </Typography>
          </div>
        </Step>
        <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 1 : activeStep)}
          onClick={() => {
            if (activeStep >= 3) {
              navigate(`/organization/create-event/2`);
            }
          }}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <Icon name="ticket-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 2 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Vé
            </Typography>
          </div>
        </Step>
        {/* <Step
          // onClick={() => setActiveStep(activeStep >= 1 ? 2 : activeStep)}
          onClick={() => {
            if (activeStep >= 4) {
              navigate(`/organization/create-event/3`);
            }
          }}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <Icon name="settings-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 3 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Cài đặt
            </Typography>
          </div>
        </Step>
        <Step
          //  onClick={() => setActiveStep(activeStep >= 1 ? 3 : activeStep)}
          onClick={() => {
            if (activeStep >= 5) {
              navigate(`/organization/create-event/4`);
            }
          }}
          activeClassName="!bg-cs_semi_green text-white"
          completedClassName="!bg-cs_semi_green text-white"
        >
          <Icon name="checkmark-outline" className="h-5 w-5 text-2xl" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography variant="h6" className={`${activeStep === 4 ? '!text-cs_semi_green' : 'text-cs_label_gray'}`}>
              Thông tin banking
            </Typography>
          </div>
        </Step> */}
      </Stepper>
    </div>
  );
};

export default CreateEventStepper;
