import { useGetHistoryQuery, useLazyPayBackTicketQuery } from '~/features/Payment/paymentApi.service';
import Button from '~/components/customs/Button';
import moment from 'moment';
import { PopUpDetail } from './PopUpDetail';
import LoadingLocal from '~/components/customs/Loading/LoadingLocal';
import nothing from '~/assets/images/nothing.svg';
import { useEffect } from 'react';

interface UserInfoProp {
  className?: string;
}

const History = ({ className }: UserInfoProp) => {
  const getHistory = useGetHistoryQuery();
  const [getPayment, result] = useLazyPayBackTicketQuery();
  // useEffect(() => {
  //   console.log(result.data);
  //   if (result.isSuccess) {
  //     window.location.href = result.data?.data;
  //   }
  // }, [result.isFetching]);
  const handleGetPayment = async (id: string) => {
    const data = await getPayment(id).unwrap();
    window.location.href = data?.data;
  };
  return (
    <div className={`${className}`}>
      <h1 className="pb-5 text-xl font-bold">Lịch sử giao dịch</h1>
      {getHistory.isFetching && <LoadingLocal />}

      <div className="space-y-3">
        {getHistory.data?.data?.length === 0 && (
          <div className="flex justify-center py-5 text-center">
            <div>
              <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
              <h3 className="font-medium text-[#ccc]">Không có thanh toán nào</h3>
            </div>
          </div>
        )}
        {!getHistory.isFetching &&
          getHistory.data?.data?.length > 0 &&
          getHistory.data?.data?.map((item: IPurchase) => (
            <div
              key={item?._id}
              className="grid gap-5 rounded-xl p-4 shadow-border-light dark:bg-cs_lightDark xl:grid-cols-6"
            >
              <div className="flex justify-between xl:block">
                <h3 className="pb-2 text-[#ccc]">Mô tả</h3>
                <p className="line-clamp-2 font-semibold">Thanh toán vé</p>
              </div>
              <div className="flex justify-between xl:block">
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
                    {item?.status === 'success' && 'Thành công'}
                    {item?.status === 'pending' && 'Chờ thanh toán'}
                    {item?.status === 'failure' && 'Thất bại'}
                  </span>
                </p>
              </div>
              <div className="flex justify-between xl:block">
                <h3 className="pb-2 text-[#ccc]">Thời gian</h3>
                <p className="text-sm font-medium"> {moment(item?.date).format('hh:mm - DD/MM/YYYY')}</p>
              </div>
              <div className="flex justify-between xl:block">
                <h3 className="pb-2 text-[#ccc] ">Tổng số lượng vé</h3>
                <p className="font-medium">
                  {item?.tickets?.reduce((accumulator, ticket) => accumulator + ticket.totalPurchase, 0)}
                </p>
              </div>
              <div className="flex justify-between xl:block">
                <h3 className="pb-2 text-[#ccc] ">Tổng giá</h3>
                <p className="font-medium">{item?.amount.toLocaleString('vi')}đ</p>
              </div>
              <div className="flex items-center justify-end xl:justify-center">
                <h3 className="text-[#ccc]">
                  <PopUpDetail data={item} onClick={handleGetPayment}>
                    <Button value="Chi tiết" mode="dark" className="" />
                  </PopUpDetail>
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
