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
    <div className="flex w-full flex-row items-start  justify-start gap-[1vw]">
      <div className="flex h-[9rem] flex-1 flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-2 3xl:p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">Số lượng sự kiện</p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-cs_semi_green 3xl:text-5xl">{dataEvent?.length}</span>
          <span className="-translate-y-2 text-sm text-[#3f3f3f]">/ Sự kiện</span>
        </div>
      </div>

      <div className="flex h-[9rem] flex-1 flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-2 3xl:p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">Số lượng vé bán</p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-cs_semi_green 3xl:text-5xl">{handleShowTotalTicket(dataEvent)}</span>
          <span className="-translate-y-1 text-sm text-[#3f3f3f]">/ Vé</span>
        </div>
      </div>

      <div className="flex h-[9rem] flex-1 flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-2 3xl:p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">Số lượng người mua</p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-cs_semi_green 3xl:text-5xl">{handleShowTotalTicket(dataEvent)}</span>
          <span className="-translate-y-1 text-sm text-[#3f3f3f]">/ Người</span>
        </div>
      </div>

      <div className="flex h-[9rem] flex-1 flex-col gap-4 rounded-xl border-2 border-cs_semi_green p-2 3xl:p-4">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-lg bg-cs_semi_green px-4 py-2 text-sm font-semibold text-white">Số dịch vụ sử dụng</p>
          <button className="flex items-center justify-center">
            <IonIcon name="ellipsis-vertical" className="text-xl text-cs_semi_green" />
          </button>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-cs_semi_green 3xl:text-5xl">{handleShowTotalTicket(dataEvent)}</span>
          <span className="-translate-y-1 text-sm text-[#3f3f3f]">/ Dịch vụ</span>
        </div>
      </div>
    </div>
  );
}
