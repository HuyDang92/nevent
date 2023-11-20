import React from 'react';

export default function InformationBanking() {
  return (
    <section className="min-h-screen rounded-xl bg-white p-8">
      <h1 className="text-2xl font-semibold">Thông tin ngân hàng</h1>
      <div className="mt-4 rounded-xl p-8 shadow-border-light">
        <div>
          <h1 className="text-xl font-semibold">Thông tin tài khoản ngân hàng của bạn</h1>
          <i className="text-sm text-gray-600">
            Ticketbox sẽ chuyển tiền thu được từ việc bán vé vào tài khoản ngân hàng của bạn
          </i>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8 border-b border-gray-300 pb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Chủ tài khoản
            </label>
            <input type="text" id="name" className="rounded-lg border border-gray-300 px-4 py-3 outline-none" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Số tài khoản
            </label>
            <input type="text" id="name" className="rounded-lg border border-gray-300 px-4 py-3 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Ngân hàng
            </label>
            <input type="text" id="name" className="rounded-lg border border-gray-300 px-4 py-3 outline-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Chi nhánh
            </label>
            <input type="text" id="name" className="rounded-lg border border-gray-300 px-4 py-3 outline-none" />
          </div>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <input type="checkbox" />
          <label htmlFor="" className="text-sm text-gray-600">
            <i>Cần có hóa đơn VAT màu đỏ</i>
          </label>
        </div>
        <button className="mt-8 w-full rounded-lg bg-cs_semi_green py-3 font-semibold text-white">Lưu thông tin</button>
      </div>
    </section>
  );
}
