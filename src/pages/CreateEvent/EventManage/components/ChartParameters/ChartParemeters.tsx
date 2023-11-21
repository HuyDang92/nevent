import React from 'react';
import { LineChart } from '~/components/Chart';

export default function ChartParemeters() {
  return (
    <div className="h-full w-full p-2">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-[#474747] dark:text-white">Doanh thu</h1>
        <p className="text-xl font-bold text-cs_semi_green 3xl:text-3xl">34.000.000 vnđ</p>
      </div>
      <LineChart
        className="rounded-2xl dark:bg-white dark:p-4"
        data={[150, 230, 224, 218, 135, 147, 260]}
        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      />
    </div>
  );
}
