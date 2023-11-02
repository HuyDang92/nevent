import React, { useRef, useState } from 'react';
import moment from 'moment';
import Icon from '../customs/Icon';
import Button from '../customs/Button';
import { Carousel, Dialog, DialogBody, DialogFooter, IconButton } from '@material-tailwind/react';
import QR from '~/assets/images/qr.jpg';
import useClickOutside from '~/hooks/useClickOutside';
import QRCode from 'react-qr-code';
// import QRCode from 'qrcode.react';

interface IProps {
  data: any;
}

const TicketProfile: React.FC<IProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openTool, setOpenTool] = useState<boolean>(false);
  const [dataUrl, setDataUrl] = useState('');
  const toolRef = useRef(null);
  const qrCodeRef: any = useRef(null);
  useClickOutside(toolRef, () => {
    setOpenTool(false);
  });
  const convertSvgToImage = () => {
    const svgData = new XMLSerializer().serializeToString(qrCodeRef.current);
    const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)));
    const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`;
    const image = new Image();
    image.onload = () => {
      const width = qrCodeRef.current.getAttribute('width');
      const height = qrCodeRef.current.getAttribute('height');
      const canvas = document.createElement('canvas');

      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      const context: any = canvas.getContext('2d');
      context.drawImage(image, 0, 0, width, height);

      const imageDataUrl = canvas.toDataURL('image/png');
      setDataUrl(imageDataUrl);
    };

    image.src = svgDataUrl;
  };
  const handleDownload = () => {
    convertSvgToImage();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'QRCode.png';
    link.click();
    setOpen(!open);
  };

  return (
    <div className="relative overflow-hidden">
      <Dialog
        open={open}
        handler={setOpen}
        className="dark:bg-cs_lightDark"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
      >
        <DialogBody className="relative font-normal">
          <p className="text-center text-lg font-bold uppercase text-cs_semi_green">Scan QR để check-in</p>
          <span onClick={() => setOpen(false)}>
            <Icon name="close" className="absolute right-4 top-4 text-2xl transition-all hover:scale-110" />
          </span>
          {data?.tickets?.length > 1 ? (
            <Carousel
              className=""
              prevArrow={({ handlePrev }) => (
                <span onClick={handlePrev} className="!absolute !left-0 top-2/4 -translate-y-2/4 text-cs_dark">
                  <Icon
                    name="chevron-back-outline"
                    className="rounded-full bg-[#eee] p-1 text-xl text-cs_dark transition-all hover:scale-105"
                  />
                </span>
              )}
              nextArrow={({ handleNext }) => (
                <span onClick={handleNext} className="!absolute !right-0 top-2/4 -translate-y-2/4 text-cs_dark">
                  <Icon
                    name="chevron-forward-outline"
                    className="rounded-full bg-[#eee] p-1 text-xl text-cs_dark transition-all hover:scale-105"
                  />
                </span>
              )}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-0 left-2/4 z-30 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill('').map(
                    (_, i) =>
                      activeIndex === i && (
                        <span className="cursor-pointer font-semibold" key={i} onClick={() => setActiveIndex(i)}>
                          {activeIndex === i && `${activeIndex + 1}/${length}`}
                        </span>
                      ),
                  )}
                </div>
              )}
            >
              {data?.tickets?.map((item: any, index: number) => (
                <div key={index} className="flex justify-center py-5">
                  <div key={index}>
                    {/* <img src={item} alt="QRCode" className="pointer-events-none w-full object-cover" /> */}
                    <QRCode value={item?._id} />
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex justify-center py-5">
              <QRCode ref={qrCodeRef} id="qrcode" value={data?.tickets[0]?._id} />
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex justify-center pt-0">
          <Button
            value="Tải về máy"
            icon="download-outline"
            className="!bg-cs_semi_green !text-white"
            onClick={handleDownload}
          />
          {/* <a href={QR} download="QR_vé">
          </a> */}
        </DialogFooter>
      </Dialog>
      <div className="absolute z-10 h-full w-full rounded-xl bg-cs_dark opacity-60 transition-all group-hover:scale-110"></div>
      <img src={data?.bannerEvent} alt="" className="h-[220px] w-full rounded-xl object-cover xl:h-[220px]" />
      <div className="absolute left-0 top-0 z-10 flex w-full justify-between p-4 text-cs_light">
        <div className="xl:w-2/3">
          <p className=" line-clamp-2 text-xl font-bold">{data?.titleEvent}</p>
          <span className="flex items-center gap-2 text-sm font-semibold">
            {/* <Icon name="time-outline" /> */}
            <span>Thời gian: </span>
            {moment(data?.date).format('hh:mm - DD/MM/YYYY')}
            <span className="text-sm "> - {data?.category}</span>
          </span>
          <p className="text-sm font-semibold">Số vé: {data?.tickets?.length}</p>
          <p className="text-sm font-semibold">
            Trạng thái:{' '}
            <span className="text-sm text-cs_semi_green">
              {data?.tickets[0]?.status === false ? 'Chưa sử dụng' : 'Đã sử dụng'}
            </span>
          </p>
          <p className="text-sm font-semibold">
            Loại vé: <span className="text-sm text-cs_semi_green">{data?.tickets[0]?.title}</span>
          </p>
          <Button onClick={() => setOpen(true)} value="Check-in" type="button" className="mt-2" mode="dark" />
        </div>
        <div ref={toolRef} onClick={() => setOpenTool(!openTool)} className="">
          <Icon
            name="ellipsis-vertical-outline"
            className="rounded-full p-1 text-xl transition-all hover:scale-110 hover:bg-[#eee] hover:text-cs_dark"
          />
        </div>
        <ul
          className={`${
            openTool ? 'h-fit w-fit p-2' : 'h-0 w-0'
          } absolute right-6 top-12 overflow-hidden rounded-lg bg-cs_light text-sm  text-cs_grayText transition-all`}
        >
          <li
            onClick={() => setOpenTool(!openTool)}
            className="flex cursor-pointer items-center gap-2  rounded-md p-2 transition-all hover:bg-[#eee]"
          >
            <Icon name="download-outline" />
            <span>Tải danh sách vé</span>
          </li>
          <li
            onClick={() => setOpenTool(!openTool)}
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:bg-[#eee]"
          >
            <Icon name="send-outline" />
            <span>Chuyển giao vé</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TicketProfile;
