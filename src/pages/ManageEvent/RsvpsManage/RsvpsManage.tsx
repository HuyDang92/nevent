import Dropdown from '~/components/Dropdown';

const RsvpsManage = () => {
  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý RSVPS</h1>
        <Dropdown />
      </div>
    </div>
  );
};

export default RsvpsManage;
