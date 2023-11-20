import React, { useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';

type ItemProps = {
  title: any;
  count: number;
  border?: boolean;
};

export default function ManageEventParameters({ title, count, border }: ItemProps) {
  return (
    <div className={`"flex flex-1 flex-col gap-4 ${border ? 'border-r' : ''} border-cs_semi_green px-4 3xl:p-4 `}>
      <div className="flex w-full items-center justify-between">
        <p className=" font-semibold text-cs_semi_green">{title}</p>
        <button className="flex items-center justify-center">
          <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
        </button>
      </div>
      <div className="flex items-end gap-1">
        <span className="py-2 text-3xl font-bold text-cs_semi_green 3xl:text-5xl">{count}</span>
        <span className="-translate-y-2 text-sm text-[#3f3f3f]"></span>
      </div>
    </div>
  );
}
