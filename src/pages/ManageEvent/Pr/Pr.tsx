import Button from '~/components/customs/Button';
import { Link, useParams } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/customs/Icon';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';
import { useRef, useState } from 'react';
import { useDebounce } from '~/hooks/useDebounce';
import Input from '~/components/customs/Input';
import { successNotify } from '~/components/customs/Toast';
import is from 'date-fns/locale/is/index';
const Pr = () => {
  const { idEvent } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');
  const [widthIpt, setWidthIpt] = useState('650px');
  const [heightIpt, setHeightIpt] = useState('350px');
  const width = useDebounce(widthIpt, 500).searchValue;
  const height = useDebounce(heightIpt, 500).searchValue;
  const [isLayout, setIsLayout] = useState(0);

  const handleCopy = () => {
    const el = document.createElement('textarea');
    el.value = `<iframe width="${width}" height="${height}" style="border-radius:8px" src="https://nevent.io.vn/pr/${idEvent}></iframe>`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    successNotify('Copy thành công');
  }

  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý RSVPS</h1>
        <Dropdown />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border-[1px] border-cs_semi_green">
        <div className="bg-cs_semi_green p-5">
          <h1 className="text-xl font-bold text-cs_light">{event?.data?.data?.title}</h1>
        </div>
        <div className="p-5">
          <div className="border-b-[1px]">
            <b className="text-xl dark:text-cs_light">Link quảng bá : </b>
            <Link className="text-xl text-cs_semi_green" to={`/event-detail/${idEvent}`}>
              https://www.nevent.io.vn/event-detail/{idEvent}
            </Link>
            <br />
            <Button className="my-5 !bg-[#3547E4] px-32 text-lg text-white" value="Chia sẻ lên Facebook" />
          </div>
          <div className="flex gap-5 border-b-[1px] py-5">
            <div className="w-1/2">
              <b className="text-lg dark:text-cs_light">Chia sẻ lên Blog website</b>
              <br />
              <span className="text-cs_grayText">
                Copy đoạn mã bên dưới để tạo widget bán vé trên blog hoặc website của bạn
              </span>
              <div className="flex justify-start items-start flex-col  gap-4 mt-4">
                <div className="flex items-center gap-5">
                  <Input classNameInput="w-[100px]" value={widthIpt} onChange={(e) => setWidthIpt(e.target.value)} disabled={isLayout !== 0} />
                  <b>X</b>
                  <Input classNameInput="w-[100px]" value={heightIpt} onChange={(e) => setHeightIpt(e.target.value)} disabled={isLayout !== 0} />
                </div>
                <div className=" w-auto rounded-lg flex flex-col gap-4 items-start bg-[#ececec] px-4 py-4">
                  <Button className=" text-sm py-2 px-8 font-semibold" mode="dark" value="Copy" onClick={handleCopy} />
                  <div className='flex justify-center text-center items-center py-3 rounded-lg bg-white'>
                    <p>{`<iframe width="${width}" height="${height}" style="border-radius:8px" src="https://nevent.io.vn/pr/${idEvent}/${isLayout}></iframe>`}</p>
                  </div>
                </div>
              </div>
              <div className=' mt-4'>
                <h1 className='font-semibold'>Mẫu sẵn</h1>
                <div className='mt-4 flex gap-4'>
                  <Button className={`text-sm py-2 px-8 bg-pink-200 font-semibold border-2 ${isLayout === 1 ? 'border-[#616161]' : 'border-transparent'}`} mode="dark" value="Mẫu 01" onClick={() => {
                    setIsLayout(1)
                    setWidthIpt('550px')
                    setHeightIpt('850px')
                  }} />
                  <Button className={`text-sm py-2 px-8 bg-yellow-300 font-semibold border-2 ${isLayout === 2 ? 'border-[#616161]' : 'border-transparent'}`} mode="dark" value="Mẫu 02" onClick={() => {
                    setIsLayout(2)
                    setWidthIpt('550px')
                    setHeightIpt('550px')
                  }} />
                  <Button className={`text-sm py-2 px-8 bg-teal-200 font-semibold border-2 ${isLayout === 3 ? 'border-[#616161]' : 'border-transparent'}`} mode="dark" value="Mẫu 03" onClick={() => {
                    setIsLayout(3)
                    setWidthIpt('100%')
                    setHeightIpt('350px')
                  }} />
                </div>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center rounded-lg border-[1px] border-cs_semi_green px-7 py-9">
              <iframe className="rounded-lg" src={`/pr/${idEvent}/${isLayout}`} height={height} width={width}></iframe>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 pt-5">
            <b className="text-xl dark:text-cs_light">Quảng bá sự kiện của bạn với Nevent</b>
            <div className="flex items-center gap-5">
              <Icon className="text-2xl text-cs_grayText" name="arrow-forward-outline" />
              <span className="text-xl text-cs_grayText">Xuất hiện trên trang nhất dưới dạng sự kiện nóng. </span>
            </div>
            <div className="flex items-center gap-5">
              <Icon className="text-2xl text-cs_grayText" name="arrow-forward-outline" />
              <span className="text-xl text-cs_grayText">
                Gửi vụ nổ email tùy chỉnh cho những người tham dự tiềm năng.
              </span>
            </div>
            <b className="text-xl dark:text-cs_light">Tải xuống danh sách dịch vụ khuyến mãi của chúng tôi</b>
            <Button className="w-60 text-xl" mode="dark" value="Download" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pr;
