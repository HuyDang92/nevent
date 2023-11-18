import IonIcon from '@reacticons/ionicons';
import React from 'react';

export default function MyPallet() {
  return (
    <section className="min-h-screen rounded-xl bg-white p-8">
      <h1 className="text-2xl font-semibold">
        Tài khoản ví: <span className="ml-2 text-cs_semi_green">1.223.000.000 USD</span>
      </h1>
      <div className="mt-8 flex gap-8">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl p-4 shadow-border-light">
          <img
            src="https://i.pinimg.com/originals/d1/7b/48/d17b48444021c047dd006dd632da4955.gif"
            alt=""
            className="w-[10rem]"
          />
          <h1 className="animate-pulse font-bold">Đang tải dữ liệu</h1>
        </div>
        <div className="flex max-w-[24rem] flex-1 flex-col gap-4">
          <div className=" rounded-xl p-4 shadow-border-light">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Tỷ lệ doanh thu</h1>
              <IonIcon name="arrow-up" className="text-2xl text-cs_semi_green " />
            </div>
            <div className="mt-4 flex items-center justify-start gap-4">
              <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="stroke-current text-gray-200"
                    stroke-width="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="progress-ring__circle  stroke-current text-cs_semi_green"
                    stroke-width="10"
                    stroke-linecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke-dashoffset="calc(400 - (400 * 45) / 100)"
                  ></circle>
                  <text
                    x="50"
                    y="50"
                    font-size="12"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    className="text-xl font-black"
                  >
                    70%
                  </text>
                </svg>
              </div>
              <div className="relative">
                <h1 className="text-sm font-semibold text-gray-700">Biến động hơn so với tháng trước</h1>
                <div className="mt-4 rounded-full bg-[#13c6b434] px-4 py-1">
                  <span className="text-xs font-semibold text-cs_semi_green">+ 20% so với tháng trước</span>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-xl p-4 shadow-border-light">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-lg font-semibold">Doanh thu sự kiện</h1>
              <i className="text-xs text-gray-600 underline">So với ngày đăng</i>
            </div>
            <div className="mt-4">
              <div className="flex max-h-[40vh] flex-col gap-4 overflow-y-scroll">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="flex items-center gap-2 rounded-lg  p-2 shadow-border-light">
                    <div className="h-[3rem] w-[6rem] overflow-hidden rounded-lg ">
                      <img
                        src="https://i.pinimg.com/564x/d7/7a/6f/d77a6f8c541152801451703f60b1a3c2.jpg"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h1 className="text-base font-semibold">RAIN SHIT CHUBIN</h1>
                      <span className="text-sm font-semibold text-gray-600">Tăng 12%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
