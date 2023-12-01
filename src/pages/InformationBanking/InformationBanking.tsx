import React from 'react';
import Icon from '~/components/customs/Icon';
import Input from '~/components/customs/Input';

export default function InformationBanking() {
  return (
    <section className="min-h-screen rounded-xl bg-white p-8">
      <h1 className="text-2xl font-semibold">Thông tin ngân hàng</h1>
      <div className="mt-4 rounded-xl p-10 shadow-border-light">
        <div>
          <h1 className="text-xl font-semibold">Thông tin tài khoản ngân hàng của bạn</h1>
          <i className="text-sm text-gray-600">
            Nevent sẽ chuyển tiền thu được từ việc bán vé vào tài khoản ngân hàng của bạn
          </i>
        </div>
        <div className="my-5 rounded-lg border p-2 text-sm text-gray-600">
          <Icon name="information-circle-outline" /> Tiền bán vé (sau khi trừ phí dịch vụ cho Nevent) sẽ vào tài khoản
          của bạn sau khi xác nhận sale report từ 7 - 10 ngày. Nếu bạn muốn nhận được tiền sớm hơn, vui lòng liên hệ
          chúng tôi qua số 099999999 hoặc info@nevent.vn
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 border-b border-gray-300 pb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Chủ tài khoản
            </label>
            <Input type="text" className="" classNameInput=" !w-full dark:text-white" id="name" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Số tài khoản
            </label>
            <Input type="text" className="" classNameInput=" !w-full dark:text-white" id="name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Ngân hàng
            </label>
            <Input type="text" className="" classNameInput=" !w-full dark:text-white" id="name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold text-gray-800">
              Chi nhánh
            </label>
            <Input type="text" className="" classNameInput=" !w-full dark:text-white" id="name" />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <input type="checkbox" />
          <label htmlFor="" className="text-sm text-gray-600">
            <i>Cần có hóa đơn VAT màu đỏ</i>
          </label>
        </div>
        <div className='flex justify-end'><button className="mt-5 px-4 rounded-lg bg-cs_semi_green py-2 font-semibold text-white">Lưu thông tin</button></div>
      </div>
    </section>
  );
}
