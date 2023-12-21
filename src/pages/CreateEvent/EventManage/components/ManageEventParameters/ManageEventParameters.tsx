import React, { useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';

type ItemProps = {
  title: any;
  count: number;
  border?: boolean;
};

export default function ManageEventParameters({ title, count, border }: ItemProps) {
  return (
    <div
      className={`flex w-full flex-col gap-4 xl:w-auto xl:flex-1 ${
        border ? 'border-b xl:border-b-0 xl:border-r' : ''
      } border-cs_semi_green px-4 3xl:p-4`}
    >
      <div className="flex w-full items-center justify-between">
        <p className=" font-semibold text-cs_semi_green">{title} </p>
        <button className="flex items-center justify-center">
          <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
        </button>
      </div>

      <div className="">
        {/* {title === 'Tổng phí dịch vụ' && (
          <p className="text-xs text-cs_semi_green">(Phí dịch vụ= 5% + 10.000 VND / vé)</p>
        )} */}
        <span className="py-2 text-3xl font-bold text-cs_semi_green 3xl:text-5xl">{count ?? 0}</span>
      </div>
    </div>
  );
}
