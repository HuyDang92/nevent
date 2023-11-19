import React, { useEffect } from 'react'
import IonIcon from '@reacticons/ionicons';

type ManageEventParametersProps = {
    dataEvent: any
}



export default function ManageEventParameters({ dataEvent }: ManageEventParametersProps) {

    const handleShowTotalTicket = (dataEvent: any) => {
        let totalTicket = 0

        dataEvent?.map((item: any) => {
            totalTicket += item?.totalTicketIssue
        })

        return totalTicket
    }

    return (
        <div className='flex flex-col gap-4 w-full'>
            <div className='p-4 flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green'>
                <div className='w-full flex justify-between items-center'>
                    <p className='text-sm py-2 px-4 font-semibold rounded-lg bg-cs_semi_green text-white'>Tổng số lượng sự kiện</p>
                    <button className='flex justify-center items-center'>
                        <IonIcon name='ellipsis-vertical' className='text-xl text-cs_semi_green' />
                    </button>
                </div>
                <div className='flex gap-1 items-end'>
                    <span className='font-bold text-6xl text-cs_semi_green'>
                        {dataEvent?.length}
                    </span>
                    <span className='text-sm text-[#3f3f3f] -translate-y-2'>
                        / Sự kiện
                    </span>
                </div>
            </div>

            <div className='p-4 flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green'>
                <div className='w-full flex justify-between items-center'>
                    <p className='text-sm py-2 px-4 font-semibold rounded-lg bg-cs_semi_green text-white'>Tổng lượng vé bán ra</p>
                    <button className='flex justify-center items-center'>
                        <IonIcon name='ellipsis-vertical' className='text-xl text-cs_semi_green' />
                    </button>
                </div>
                <div className='flex gap-1 items-end'>
                    <span className='font-bold text-5xl text-cs_semi_green'>
                        {handleShowTotalTicket(dataEvent)}
                    </span>
                    <span className='text-sm text-[#3f3f3f] -translate-y-1'>
                        / Vé
                    </span>
                </div>
            </div>

            <div className='p-4 flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green'>
                <div className='w-full flex justify-between items-center'>
                    <p className='text-sm py-2 px-4 font-semibold rounded-lg bg-cs_semi_green text-white'>Tổng lượng người âm mua</p>
                    <button className='flex justify-center items-center'>
                        <IonIcon name='ellipsis-vertical' className='text-xl text-cs_semi_green' />
                    </button>
                </div>
                <div className='flex gap-1 items-end'>
                    <span className='font-bold text-5xl text-cs_semi_green'>
                        {handleShowTotalTicket(dataEvent)}
                    </span>
                    <span className='text-sm text-[#3f3f3f] -translate-y-1'>
                        / Người
                    </span>
                </div>
            </div>

            <div className='p-4 flex flex-col gap-4 rounded-xl border-2 border-cs_semi_green'>
                <div className='w-full flex justify-between items-center'>
                    <p className='text-sm py-2 px-4 font-semibold rounded-lg bg-cs_semi_green text-white'>Tổng dịch vụ sử dụng</p>
                    <button className='flex justify-center items-center'>
                        <IonIcon name='ellipsis-vertical' className='text-xl text-cs_semi_green' />
                    </button>
                </div>
                <div className='flex gap-1 items-end'>
                    <span className='font-bold text-5xl text-cs_semi_green'>
                        {handleShowTotalTicket(dataEvent)}
                    </span>
                    <span className='text-sm text-[#3f3f3f] -translate-y-1'>
                        / Dịch vụ
                    </span>
                </div>
            </div>
        </div>
    )
}
