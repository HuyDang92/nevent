import { Link } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import RecommendCard from '~/components/customs/RecommendCard';
import SearchBar from '~/components/customs/SearchBar';
const EventManage = () => {
  return (
    <>
      <div className="h-full w-full rounded-2xl bg-cs_light p-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Quản lý sự kiện</h1>
          <Dropdown />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="w-[60%]">
            <Link to="/create-event" className="">
              <Button type="button" className="mt-3 !bg-cs_leaf-500 font-semibold text-white" value="Tạo sự kiện" />
            </Link>
            <br />
            <SearchBar className="mt-4 w-full" classNameInput="!bg-cs_input_gray !rounded-full" />
            <div className="mt-8">
              <p className="text-center font-semibold text-cs_gray underline">Bạn chưa có sự kiện nào!</p>
            </div>
          </div>
          <div className="flex w-[25%] flex-col gap-10">
            <RecommendCard title="Gói đề xuất sự kiện" sale="30" price={9000000} theme_color="green" />
            <RecommendCard title="Gói tiêu diệt đối thủ" sale="80" price={12000000} theme_color="yellow" />
          </div>
        </div>
      </div>
    </>
  );
};
export default EventManage;
