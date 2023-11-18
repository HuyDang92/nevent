import Button from '~/components/customs/Button';
import { Link, useParams } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/customs/Icon';
import { useGetEventByIdQuery } from '~/features/Event/eventApi.service';
import { useRef, useState } from 'react';
import { useDebounce } from '~/hooks/useDebounce';
import Input from '~/components/customs/Input';
import { FacebookShareButton, FacebookIcon } from 'react-share';
const Pr = () => {
  const { idEvent } = useParams();
  const event = useGetEventByIdQuery(idEvent || '');
  const [widthIpt, setWidthIpt] = useState<string>('0px');
  const [heightIpt, setHeightIpt] = useState<string>('0px');

  const width = useDebounce(widthIpt, 500).searchValue;
  const height = useDebounce(heightIpt, 500).searchValue;

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
              <div className="mt-5 flex flex-col gap-5">
                <div className="flex items-center gap-5">
                  <Input classNameInput="w-[100px]" value={widthIpt} onChange={(e) => setWidthIpt(e.target.value)} />
                  <b>X</b>
                  <Input classNameInput="w-[100px]" value={heightIpt} onChange={(e) => setHeightIpt(e.target.value)} />
                </div>
                <div className="w-[90%] rounded-lg bg-[#eee] p-2.5">
                  {`<iframe width="${width}" height="${height}" style="border-radius:8px" src="nevent.io.vn/pr/${idEvent}"></iframe>`}
                </div>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center rounded-lg border-[1px] border-cs_semi_green py-6">
              <iframe className="rounded-lg" src={`/pr/${idEvent}`} height={height} width={width}></iframe>
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
