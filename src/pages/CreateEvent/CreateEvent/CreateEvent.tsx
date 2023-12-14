import Dropdown from '~/components/Dropdown';
import { useState } from 'react';
import { Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import Button from '~/components/customs/Button';
import CreateEventStepper from './components/CreateEventStepper';
import EventInfo from './components/EventInfo';
import EventTime from './components/EventTime';
import EventSettings from './components/EventSettings';
import PaymentInfo from './components/PaymentInfo';
import TicketList from './components/TicketList';
import { useParams } from 'react-router';
import Overview from './components/Overview';
import { useAppSelector } from '~/hooks/useActionRedux';

const CreateEvent = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);
  const { step } = useParams();
  const activeStep = Number(step);
  const auth = useAppSelector((state) => state.auth);
  const renderContent = (activeStep: number) => {
    //Switch case
    switch (activeStep) {
      case 0: {
        return <EventInfo />;
      }
      case 1: {
        return <EventTime />;
      }
      case 2: {
        return <TicketList />;
      }
      case 3: {
        return <EventSettings />;
      }
      case 4: {
        return <PaymentInfo />;
      }
      case 5: {
        return <Overview />;
      }
      default: {
        return <h1>Not found</h1>;
      }
    }
  };
  return (
    <>
      <div className="">
        <Dialog
          open={open}
          handler={handleOpen}
          className="dark:bg-cs_lightDark"
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
              Website/ Facebook/ Instagram…)
              <span className="font-semibold"> trên banner và trong nội dung bài đăng</span>. Chỉ sử dụng duy nhất
              Hotline Nevent - 1900.6408.
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
      </div>
      <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold dark:text-cs_light"> Tạo sự kiện</h1>
          <Dropdown />
        </div>
        <div className="flex gap-10">
          <div className="w-4/5">
            <div className="hidden h-[135px] items-center justify-center rounded-[15px] md:flex">
              <CreateEventStepper />
            </div>
            <div className="w-full dark:bg-cs_lightDark">{renderContent(activeStep)}</div>
          </div>
          <div className="w-[calc(20%-40px)]">
            <h1 className="flex text-xl font-semibold text-cs_red">Lưu ý: </h1>
            <ul className='list-decimal dark:text-cs_light'>
              <li>
                Vui lòng không hiển thị thông tin liên hệ của Ban tổ chức (ví dụ: Số điện thoại/ Email/ Website/
                Facebook/ Instagram…) trên banner và trong nội dung. Chỉ sử dụngHotline Ticketbox - 1900.6408.
              </li>
              <li>
                Trong trường hợp Ban tổ chức tạo hoặc cập nhật sự kiện không đúng quy định trên, Ticketbox có quyền từ
                chối phê duyệt sự kiện.
              </li>
              <li>
                Ticketbox sẽ liên tục kiểm tra thông tin các sự kiện đang hiển thị trên nền tảng, nếu phát hiện có sai
                sót liên quan đến nội dung hình ảnh/bài đăng, Ticketbox có quyền gỡ bỏ hoặc từ chối cung cấp dịch vụ,
                tuân theo khoản 2.9 của Thỏa thuận dịch vụ.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateEvent;
