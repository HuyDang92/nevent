import Dropdown from '~/components/Dropdown';
const CreateEvent = () => {
  return (
    <>
      <div className="h-full w-full rounded-2xl bg-cs_light p-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Tạo sự kiện</h1>
          <Dropdown />
        </div>
      </div>
    </>
  );
};
export default CreateEvent;
