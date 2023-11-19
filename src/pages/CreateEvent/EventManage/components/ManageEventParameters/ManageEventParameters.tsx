import React, { useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';

type ManageEventParametersProps = {
  dataEvent: any;
};

export default function ManageEventParameters({ dataEvent }: ManageEventParametersProps) {
  const handleShowTotalTicket = (dataEvent: any) => {
    let totalTicket = 0;

    dataEvent?.map((item: any) => {
      totalTicket += item?.totalTicketIssue;
    });

    return totalTicket;
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">
            Tổng số lượng sự kiện
          </p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-6xl font-bold text-cs_semi_green">{dataEvent?.length}</span>
          <span className="-translate-y-2 text-sm text-[#3f3f3f]">/ Sự kiện</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">Tổng lượng vé bán ra</p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-bold text-cs_semi_green">{handleShowTotalTicket(dataEvent)}</span>
          <span className="-translate-y-1 text-sm text-[#3f3f3f]">/ Vé</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">
            Tổng lượng người âm mua
          </p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-bold text-cs_semi_green">{handleShowTotalTicket(dataEvent)}</span>
          <span className="-translate-y-1 text-sm text-[#3f3f3f]">/ Người</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">Tổng dịch vụ sử dụng</p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-bold text-cs_semi_green">{handleShowTotalTicket(dataEvent)}</span>
          <span className="-translate-y-1 text-sm text-[#3f3f3f]">/ Dịch vụ</span>
        </div>
      </div>
    </div>
  );
}
