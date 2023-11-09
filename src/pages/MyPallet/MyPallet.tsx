import IonIcon from '@reacticons/ionicons'
import React from 'react'

export default function MyPallet() {
    return (
        <section className='p-8 rounded-xl bg-white min-h-screen'>
            <h1 className='font-semibold text-2xl'>Tài khoản ví: <span className='text-cs_semi_green ml-2'>1.223.000.000 USD</span></h1>
            <div className='flex gap-8 mt-8'>
                <div className='flex-1 rounded-xl flex-col gap-4 shadow-border-light p-4 flex justify-center items-center'>
                    <img src="https://i.pinimg.com/originals/d1/7b/48/d17b48444021c047dd006dd632da4955.gif" alt="" className='w-[10rem]' />
                    <h1 className='font-bold animate-pulse'>Đang tải dữ liệu</h1>
                </div>
                <div className='flex-1 max-w-[24rem] flex flex-col gap-4'>
                    <div className=' p-4 rounded-xl shadow-border-light'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold text-lg'>Tỷ lệ doanh thu</h1>
                            <IonIcon name='arrow-up' className='text-cs_semi_green text-2xl ' />
                        </div>
                        <div className='flex justify-start items-center gap-4 mt-4'>
                            <div className="relative w-40 h-40">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200 stroke-current"
                                        stroke-width="10"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    ></circle>
                                    <circle
                                        className="text-cs_semi_green  progress-ring__circle stroke-current"
                                        stroke-width="10"
                                        stroke-linecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                        stroke-dashoffset="calc(400 - (400 * 45) / 100)"
                                    ></circle>
                                    <text x="50" y="50" font-size="12" text-anchor="middle" alignment-baseline="middle" className='font-black text-xl'>70%</text>

                                </svg>
                            </div>
                            <div className='relative'>
                                <h1 className='font-semibold text-sm text-gray-700'>Biến động hơn so với tháng trước</h1>
                                <div className='py-1 px-4 mt-4 rounded-full bg-[#13c6b434]'>
                                    <span className='text-cs_semi_green text-xs font-semibold'>+ 20% so với tháng trước</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' p-4 rounded-xl shadow-border-light'>
                        <div className='flex items-center justify-between gap-2'>
                            <h1 className='font-semibold text-lg'>Doanh thu sự kiện</h1>
                            <i className='text-xs text-gray-600 underline'>So với ngày đăng</i>
                        </div>
                        <div className='mt-4'>
                            <div className='flex flex-col gap-4 overflow-y-scroll max-h-[40vh]'>
                                {
                                    [1, 2, 3, 4, 5, 6].map((_, index) => (
                                        <div key={index} className='shadow-border-light flex items-center gap-2  p-2 rounded-lg'>
                                            <div className='h-[3rem] w-[6rem] rounded-lg overflow-hidden '>
                                                <img src='https://i.pinimg.com/564x/d7/7a/6f/d77a6f8c541152801451703f60b1a3c2.jpg' className='w-full h-full object-cover' />
                                            </div>
                                            <div className='flex-1 flex flex-col'>
                                                <h1 className='text-base font-semibold'>RAIN SHIT CHUBIN</h1>
                                                <span className='text-sm font-semibold text-gray-600'>Tăng 12%</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
