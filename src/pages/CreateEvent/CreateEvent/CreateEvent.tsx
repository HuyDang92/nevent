import Dropdown from '~/components/Dropdown';
import { useState } from 'react';
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import Button from '~/components/customs/Button';

const CreateEvent = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <h2 className="pt-3 text-center text-xl font-bold uppercase text-cs_semi_green">Lưu ý khi đăng ký sự kiện</h2>
        <DialogBody className="flex flex-col gap-2 text-sm font-normal">
          <p className="">
            <span className="font-semibold">1.</span> Vui lòng không hiển thị{' '}
            <span className="font-semibold">thông tin liên lạc của Ban Tổ Chức</span> (ví dụ: Số điện thoại/ Email/
            Website/ Facebook/ Instagram…)<span className="font-semibold"> trên banner và trong nội dung bài đăng</span>
            . Chỉ sử dụng duy nhất Hotline Nevent - 1900.6408.
          </p>
          <p className="">
            <span className="font-semibold">2.</span> Trong trường hợp Ban tổ chức{' '}
            <span className="font-semibold">
              tạo mới hoặc cập nhật sự kiện không đúng theo quy định nêu trên, Nevent có quyền từ chối phê duyệt sự
              kiện.
            </span>
          </p>
          <p className="">
            <span className="font-semibold">3.</span> Nevent sẽ liên tục kiểm tra thông tin các sự kiện đang được hiển
            thị trên nền tảng,{' '}
            <span className="font-semibold">
              nếu phát hiện có sai phạm liên quan đến hình ảnh/ nội dung bài đăng, Nevent có quyền gỡ bỏ hoặc từ chối
              cung cấp dịch vụ đối với các sự kiện này
            </span>
            , dựa theo điều khoản 2.9 trong Hợp đồng dịch vụ.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button value="Đã hiểu" className="!bg-cs_semi_green !text-white" onClick={handleOpen} />
        </DialogFooter>
      </Dialog>
      <div className="h-full w-full rounded-2xl bg-cs_light p-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Tạo sự kiện</h1>
          <Dropdown />
        </div>
      </div>
    </>
  );
};
export default CreateEvent;
