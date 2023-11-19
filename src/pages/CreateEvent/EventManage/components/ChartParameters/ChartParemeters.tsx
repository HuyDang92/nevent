import React from 'react'
import { LineChart } from '~/components/Chart'

export default function ChartParemeters() {



    return (
        <div className='p-2 w-full  h-full'>
            <div className='w-full justify-between items-center flex mb-4'>
                <h1 className="font-bold text-xl text-[#474747]">Doanh thu</h1>
                <p>34.000.000 vnđ</p>
            </div>
            <div className='w-full h-full'>
                <LineChart data={[150, 230, 224, 218, 135, 147, 260]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
            </div>
        </div>
    )
}
