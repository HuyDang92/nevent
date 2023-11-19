import React from 'react';
import { LineChart } from '~/components/Chart';

export default function ChartParemeters() {
  return (
    <div className="h-full w-full  p-2">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-[#474747]">Doanh thu</h1>
        <p>34.000.000 vnđ</p>
      </div>
      <div className="h-full w-full">
        <LineChart
          data={[150, 230, 224, 218, 135, 147, 260]}
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        />
      </div>
    </div>
  );
}
