import React from 'react'

export default function InformationBanking() {
    return (
        <section className='p-8 rounded-xl bg-white min-h-screen'>
            <h1 className='font-semibold text-2xl'>Thông tin ngân hàng</h1>
            <div className='mt-4 p-8 shadow-border-light rounded-xl'>
                <div>
                    <h1 className='font-semibold text-xl'>Thông tin tài khoản ngân hàng của bạn</h1>
                    <i className='text-sm text-gray-600'>Ticketbox sẽ chuyển tiền thu được từ việc bán vé vào tài khoản ngân hàng của bạn</i>
                </div>
                <div className='mt-8 grid grid-cols-2 border-b border-gray-300 pb-8 gap-8'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-base font-semibold text-gray-800'>Chủ tài khoản</label>
                        <input type="text" id='name' className='outline-none py-3 px-4 rounded-lg border border-gray-300' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name" className='text-base font-semibold text-gray-800'>Số tài khoản</label>
                        <input type="text" id='name' className='outline-none py-3 px-4 rounded-lg border border-gray-300' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-base font-semibold text-gray-800'>Ngân hàng</label>
                        <input type="text" id='name' className='outline-none py-3 px-4 rounded-lg border border-gray-300' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-base font-semibold text-gray-800'>Chi nhánh</label>
                        <input type="text" id='name' className='outline-none py-3 px-4 rounded-lg border border-gray-300' />
                    </div>
                </div>
                <div className='flex items-center gap-2 mt-8'>
                    <input type="checkbox" />
                    <label htmlFor="" className='text-sm text-gray-600'>
                        <i>Cần có hóa đơn VAT màu đỏ</i>
                    </label>
                </div>
                <button className='mt-8 font-semibold py-3 rounded-lg bg-cs_semi_green text-white w-full'>
                    Lưu thông tin
                </button>
            </div>
        </section>
    )
}
