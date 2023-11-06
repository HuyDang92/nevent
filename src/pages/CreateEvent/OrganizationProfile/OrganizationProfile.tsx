import { useState } from 'react';
import Dropdown from '~/components/Dropdown';
import RecommendCard from '~/components/customs/RecommendCard';
import Organization from './components/Organization';
import Person from './components/Person';
const OrganizationProfile = () => {
  const [selectedValue, setSelectedValue] = useState('organization');

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Đăng ký tổ chức</h1>
          <Dropdown />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="w-full">
            <label htmlFor="type" className="ml-2 text-sm font-semibold text-cs_label_gray dark:text-gray-400">
              Loại hình kinh doanh
            </label>
            <br />
            <select
              name="type"
              id="type"
              className="mt-2 w-[55%] rounded-xl border-2 p-2 focus:border-2 focus:outline-none dark:border-none dark:bg-cs_formDark dark:text-white"
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="organization">Doanh nghiệp/Nhà tổ chức</option>
              <option value="person">Cá nhân</option>
            </select>
            {selectedValue === 'organization' && <Organization />}
            {selectedValue === 'person' && <Person />}
          </div>
          <div className="flex w-[30%] flex-col gap-10">
            <RecommendCard title="Gói đề xuất sự kiện" sale="30" price={9000000} theme_color="green" />
            <RecommendCard title="Gói tiêu diệt đối thủ" sale="80" price={12000000} theme_color="yellow" />
          </div>
        </div>
      </div>
    </>
  );
};
export default OrganizationProfile;
