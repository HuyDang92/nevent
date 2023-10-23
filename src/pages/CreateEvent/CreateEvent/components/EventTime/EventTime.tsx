import Button from '~/components/customs/Button';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const EventTime = ({ setActiveStep }: Prop) => {
  return (
    <>
      <div className="w-full text-right">
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
