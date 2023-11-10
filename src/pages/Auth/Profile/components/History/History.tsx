import { useEffect, useState } from 'react';
import { useGetHistoryQuery } from '~/features/Payment/paymentApi.service';
import Button from '~/components/customs/Button';
import moment from 'moment';

interface UserInfoProp {
  className?: string;
  data?: IUserField | null;
}

const History = ({ data, className }: UserInfoProp) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const getHistory = useGetHistoryQuery();
  return (
    <div className={`${className}`}>
      <h1 className="pb-5 text-xl font-bold">Lịch sử giao dịch</h1>
      <div className="space-y-3">
        {!getHistory.isFetching &&
          getHistory.data?.data?.length > 0 &&
          getHistory.data?.data?.map((item: IPurchase) => (
            <div className="grid gap-5 rounded-xl p-4 shadow-border-light dark:bg-cs_lightDark xl:grid-cols-6">
              <div className="">
                <h3 className="pb-2 text-[#ccc]">Mô tả</h3>
                <p className="line-clamp-2 font-semibold">Thanh toán vé</p>
              </div>
              <div className="">
                <h3 className="pb-2 text-[#ccc]">Trạng thái</h3>
                <p className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${item?.status === 'success' && 'bg-cs_semi_green'}  ${
                      item?.status === 'pending' && 'bg-yellow-600'
                    }  ${item?.status === 'failure' && 'bg-red-500'}`}
                  ></span>
                  <span
                    className={`font-medium ${item?.status === 'failure' && 'text-red-500'} ${
                      item?.status === 'pending' && 'text-yellow-600'
                    } ${item?.status === 'success' && 'text-cs_semi_green'} `}
                  >
                    {item?.status}
                  </span>
                </p>
              </div>
              <div className="">
                <h3 className="pb-2 text-[#ccc]">Thời gian</h3>
                <p className="text-sm font-medium"> {moment(item?.date).format('hh:mm - DD/MM/YYYY')}</p>
              </div>
              <div className="">
                <h3 className="pb-2 text-[#ccc] ">Số lượng vé</h3>
                <p className="font-medium">{item?.tickets?.length}</p>
              </div>
              <div className="">
                <h3 className="pb-2 text-[#ccc] ">Tổng giá</h3>
                <p className="font-medium">{item?.amount}đ</p>
              </div>
              <div className="flex items-center justify-center">
                <h3 className="text-[#ccc]">
                  <Button value="Chi tiết" mode="dark" className="" />
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
