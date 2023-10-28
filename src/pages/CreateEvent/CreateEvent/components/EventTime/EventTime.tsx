import { useState } from 'react';
import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import AddTimeline from './components/AddTimeline';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

// const eventTime = [];

const EventTime = ({ setActiveStep }: Prop) => {
  const [addTimeline, setAddTimeline] = useState(false);
  return (
    <>
      <div className="w-full overflow-hidden">
        {addTimeline && <AddTimeline handler={setAddTimeline} />}
        <div
          onClick={() => setAddTimeline(!addTimeline)}
          className="mt-3 flex h-[100px] items-center justify-center rounded-lg border-2 border-dotted border-cs_semi_green"
        >
          <Icon name="time-sharp" className="text-[40px] text-cs_semi_green" />
          <h1 className="ml-7 text-2xl font-semibold text-cs_semi_green">Thêm thời gian sự kiện</h1>
        </div>
        <Button
          onClick={() => setActiveStep(2)}
          className="md:w mt-5 w-full"
          type="submit"
          mode="dark"
          value="Tiếp tục"
        />
      </div>
    </>
  );
};
export default EventTime;
