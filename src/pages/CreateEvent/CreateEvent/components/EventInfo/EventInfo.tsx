import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const EventInfo = ({ setActiveStep }: Prop) => {
  return (
    <>
      <div className="">
        {/* Banner sự kiện */}
        <div className="relative mt-3 h-[250px] w-full">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-japanese-illustration-cherry-tree-petals_23-2149601832.jpg?w=1060&t=st=1698044776~exp=1698045376~hmac=1f7473d50dc44b63c902367920bec46f7ec41bad300ce5510c2f8cde7e022d68"
            alt="banner"
            className="h-full w-full rounded-xl object-cover "
          />
          <div className="absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-50"></div>
          <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center">
            <div className="z-20 w-[250px] rounded-xl border-2 border-white text-center text-sm text-white transition hover:scale-105">
              <Icon name="image" className="text-3xl" />
              <p>Kích thước ảnh 1500 x 600 (Ảnh không quá 1MB) </p>
            </div>
          </div>
        </div>
        {/* //// */}
        <div className="w-full text-right">
          <Button
            onClick={() => setActiveStep(1)}
            className="md:w mt-5 w-full"
            type="submit"
            mode="dark"
            value="Xác nhận"
          />
        </div>
      </div>
    </>
  );
};
export default EventInfo;
