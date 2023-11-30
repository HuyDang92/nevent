import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import moment from 'moment';

interface IPopUpDetailProps {
  data: IPurchase;
  children: React.ReactNode;
  onClick: any;
}
export function PopUpDetail({ data, children, onClick }: IPopUpDetailProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (id: string) => {
    setOpen(false);
    onClick(id);
  };
  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Dialog open={open} handler={setOpen} size="sm">
        <h2 className="py-5 text-center text-xl font-bold">Chi tiết hóa đơn</h2>
        <DialogBody>
          <div className="space-y-3">
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc]">Mã giao dịch</h3>
              <p className="line-clamp-2 font-semibold">{data?.code}</p>
            </div>
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc]">Khách hàng</h3>
              <p className="line-clamp-2 font-semibold">{data?.user?.fullName}</p>
            </div>
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc]">Mô tả</h3>
              <p className="line-clamp-2 font-semibold">Thanh toán vé</p>
            </div>
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc]">Trạng thái</h3>
              <p className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${data?.status === 'success' && 'bg-cs_semi_green'}  ${
                    data?.status === 'pending' && 'bg-yellow-600'
                  }  ${data?.status === 'failure' && 'bg-red-500'}`}
                ></span>
                <span
                  className={`font-medium ${data?.status === 'failure' && 'text-red-500'} ${
                    data?.status === 'pending' && 'text-yellow-600'
                  } ${data?.status === 'success' && 'text-cs_semi_green'} `}
                >
                  {data?.status === 'success' && 'Thành công'}
                  {data?.status === 'pending' && 'Chờ thanh toán'}
                  {data?.status === 'failure' && 'Thất bại'}
                </span>
              </p>
            </div>
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc]">Thời gian</h3>
              <p className="text-sm font-medium"> {moment(data?.date).format('hh:mm - DD/MM/YYYY')}</p>
            </div>
            <div>
              <div className="flex justify-between border-b">
                <h3 className="pb-2 text-[#ccc] ">Tổng số lượng vé</h3>
                <p className="font-medium">
                  {data?.tickets?.reduce((accumulator, ticket) => accumulator + ticket.totalPurchase, 0)}
                </p>
              </div>
              <div className="flex justify-between border-b">
                <h3 className="pb-2 text-[#ccc] ">Danh sách vé</h3>
                <div>
                  {data?.tickets?.map((item: Ticket, index: number) => (
                    <span key={index} className="font-medium">
                      {item.title} ({item?.totalPurchase}),{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc] ">Tổng giá</h3>
              <p className="font-medium">{data?.amount}đ</p>
            </div>
            <div className="flex justify-between border-b">
              <h3 className="pb-2 text-[#ccc] ">Phương thức thanh toán</h3>
              <p className="font-medium">VNPAY</p>
            </div>
          </div>
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
