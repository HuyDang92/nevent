import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/customs/Button';
import { Icon as Iconfy } from '@iconify/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';

const Statistics = () => {
  const { idEvent } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');
  // Chart JS
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bán vé theo ngày (Chỉ trả tiền)',
      },
    },
  };
  const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const data = {
    labels,
    datasets: [
      {
        data: [1, 3, 4, 5, 7, 11, 13, 15, 15, 15, 23, 24, 25, 26, 32, 35, 35, 35, 38, 41, 41, 45, 47, 45, 35],
        borderColor: 'rgb(255, 255, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  // ===========================

  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Thống kê sự kiện</h1>
        <Dropdown />
      </div>
      <div className="mt-2 flex items-start justify-between rounded-xl border-[1px] border-cs_semi_green p-5">
        <div className="flex items-center">
          <img src={event?.data?.data.banner[0].url} alt={event?.data?.data.title} className="mr-4 h-[110px] w-[110px]" />
          <div className="flex flex-col gap-1 text-[14px] text-cs_grayText dark:text-cs_light">
            <h1 className="mb-4 text-lg font-bold text-cs_dark dark:text-cs_light">{event?.data?.data?.title}</h1>
            <div className="flex items-center gap-[15px]">
              <Iconfy icon="ph:timer-bold" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
              <span className="w-[90%] dark:text-cs_light">18:00</span>
            </div>
            <div className="flex items-center gap-[15px]">
              <Iconfy icon="solar:calendar-bold" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
              <span className="w-[90%] dark:text-cs_light">
                {moment(event?.data?.data?.start_date).format('dddd, DD MMMM YY')}&nbsp;
              </span>
            </div>
            <div className="flex items-center gap-[15px]">
              <Iconfy icon="carbon:location-filled" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
              <span className="w-[90%] dark:text-cs_light">
                <span>{event?.data?.data.location.name}</span>
              </span>
            </div>
          </div>
        </div>
        <Link to={`/scan-ticket`}>
          <Button mode="dark" value="Check in" />
        </Link>
      </div>
      <div className="mt-8 rounded-xl border-[1px] border-cs_semi_green p-4">
        <div className="flex justify-between rounded-lg bg-cs_light_gray px-4 py-3">
          <b>Tổng thu nhập: </b>
          <span className="font-bold text-cs_semi_green">0 VNĐ</span>
        </div>
        <div className="my-3 flex justify-between gap-3">
          <div className="flex w-1/2 justify-between rounded-lg bg-cs_light_gray px-4 py-3">
            <b>Vé đã thanh toán: </b>
            <span className="font-bold text-cs_semi_green">0 VNĐ</span>
          </div>
          <div className="flex w-1/2 justify-between rounded-lg bg-cs_light_gray px-4 py-3">
            <b>Vé giá nộp: </b>
            <span className="font-bold text-cs_semi_green">8.8% + 15,000 VND / vé</span>
          </div>
        </div>
        <div className="flex w-[calc(50%-6px)] justify-between rounded-lg bg-cs_light_gray px-4 py-3">
          <b>Phí dịch vụ: </b>
          <span className="font-bold text-cs_semi_green">0 VNĐ</span>
        </div>
      </div>
      <div className="mt-8 rounded-xl border-[1px] border-cs_semi_green p-4 dark:text-cs_light">
        <b>Thời gian: </b>
        <div className="mt-2 flex items-center gap-4">
          <b>Từ: </b> <div className="rounded border-[1px] border-cs_semi_green px-6 py-2">12/12/2023</div>
          <b>Đến: </b> <div className="rounded border-[1px] border-cs_semi_green px-6 py-2">12/12/2023</div>
          <Button value="Áp dụng" mode="dark" />
        </div>
      </div>
      <div className="mt-8 flex gap-5">
        <div className="flex h-8 w-32 items-center justify-center rounded-md bg-cs_semi_green text-[14px] font-semibold text-cs_light">
          Trả : 0
        </div>
        <div className="flex h-8 w-32 items-center justify-center rounded-md bg-[#FF0000] text-[14px] font-semibold text-cs_light">
          Đã hủy : 0
        </div>
        <div className="flex h-8 w-32 items-center justify-center rounded-md bg-[#F0B724] text-[14px] font-semibold text-cs_light">
          Hết hạn : 0
        </div>
      </div>
      <div className="mt-8">
        <b className="mb-5 block dark:text-cs_light">Tóm tắt vé</b>
        <div className="text-[14px]">
          <div className="mb-3 flex justify-between rounded-lg bg-cs_light_gray  px-10 py-4 font-semibold">
            <span className="w-1/5 text-center">Loại vé</span>
            <span className="w-1/5 text-center">Giá vé</span>
            <span className="w-1/5 text-center">Xử lý vé</span>
            <span className="w-1/5 text-center">Tổng số vé</span>
            <span className="w-1/5 text-center">Doanh số (VNĐ) </span>
          </div>
          <ul>
            <li className="flex justify-between rounded-lg border-[1px] border-cs_gray px-10 py-4 font-semibold dark:text-cs_light">
              <span className="w-1/5 text-center">VVIP</span>
              <span className="w-1/5 text-center">10.000</span>
              <span className="w-1/5 text-center">0</span>
              <span className="w-1/5 text-center">0</span>
              <span className="w-1/5 text-center">0</span>
            </li>
          </ul>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Statistics;
