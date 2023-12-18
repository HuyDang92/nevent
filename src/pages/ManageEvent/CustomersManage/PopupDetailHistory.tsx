import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import moment from 'moment';
import nothing from '~/assets/images/nothing.svg';

interface IPopUpDetailProps {
  data: any;
  children: React.ReactNode;
}
export function PopupDetailHistory({ data, children }: IPopUpDetailProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (id: string) => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Dialog open={open} handler={setOpen} size="xxl" className='dark:bg-cs_lightDark'>
        <h2 className="py-5 text-center text-xl font-bold">Chi tiết mua vé</h2>
        <DialogBody>
          {data?.length === 0 && (
            <div className="flex justify-center py-5 text-center">
              <div>
                <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
                <h3 className="font-medium text-[#ccc]">Không có thanh toán nào</h3>
              </div>
            </div>
          )}
          {data?.length > 0 &&
            data?.map((item: IPurchase) => (
              <div
                key={item?._id}
                className="flex justify-between gap-5 rounded-xl p-4 shadow-border-light dark:bg-cs_lightDark"
              >
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc]">Mã giao dịch</h3>
                  <p className="line-clamp-2 font-semibold">{item?.code}</p>
                </div>
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc]">Trạng thái</h3>
                  <p className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${item?.status === 'success' && 'bg-cs_semi_green'}  ${
                        item?.status === 'pending' && 'bg-yellow-600'
                      }  ${item?.status === 'failure' && 'bg-red-500'} ${item?.status === 'canceled' && 'bg-gray-600'}`}
                    ></span>
                    <span
                      className={`font-medium  ${item?.status === 'canceled' && 'text-gray-600'} ${
                        item?.status === 'failure' && 'text-red-500'
                      } ${item?.status === 'pending' && 'text-yellow-600'} ${
                        item?.status === 'success' && 'text-cs_semi_green'
                      } `}
                    >
                      {item?.status === 'success' && 'Thành công'}
                      {item?.status === 'pending' && 'Chờ thanh toán'}
                      {item?.status === 'failure' && 'Thất bại'}
                      {item?.status === 'canceled' && 'Đã hủy'}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc]">Thời gian</h3>
                  <p className="text-sm font-medium"> {moment(item?.date).format('hh:mm - DD/MM/YYYY')}</p>
                </div>
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc] ">Tổng số vé</h3>
                  <p className="font-medium">
                    {item?.tickets?.reduce((accumulator, ticket) => accumulator + ticket.totalPurchase, 0)}
                  </p>
                </div>
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc] ">Danh sách vé</h3>
                  <p className="font-medium">
                    {item?.tickets?.map((item: Ticket, index: number) => (
                      <span key={index} className="font-medium">
                        {item.title} ({item?.totalPurchase}),{' '}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc] ">Tổng giá</h3>
                  <p className="font-medium">{item?.amount.toLocaleString('vi')}đ</p>
                </div>
                <div className="flex justify-between xl:block">
                  <h3 className="pb-2 text-[#ccc] ">Phương thức thanh toán</h3>
                  <p className="font-medium">{item?.method}</p>
                </div>
              </div>
            ))}
        </DialogBody>
        <DialogFooter>
          {data?.status === 'pending' ? (
            <Button onClick={() => handleClick(data?._id)}>
              <span>Thanh toán ngay</span>
            </Button>
          ) : (
            <Button onClick={() => setOpen(false)}>
              <span>Ok</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
