import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Icon from '../customs/Icon';
import Button from '../customs/Button';
import { Carousel, Dialog, DialogBody, DialogFooter, IconButton } from '@material-tailwind/react';
import useClickOutside from '~/hooks/useClickOutside';
import QRCode from 'react-qr-code';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { addTicketByEvent } from '~/features/Auth/ticketSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

interface IProps {
  data: ITicket;
  passTicket?: boolean;
}

const TicketProfile: React.FC<IProps> = ({ data, passTicket }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [openTool, setOpenTool] = useState<[number, boolean]>([-1, false]);
  const [listQR, setListQR] = useState<any>([]);
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  console.log(openTool);

  const toolRef = useRef(null);
  const qrCodeRef: any = useRef(null);

  useClickOutside(toolRef, () => {
    setOpenTool([-1, false]);
  });

  const exportDSSV = () => {
    const ws = XLSX.utils.json_to_sheet(listQR);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'Danh sách vé sự kiện' + fileExtension);
    setOpenTool([-1, false]);
  };
  useEffect(() => {
    const formattedData = data?.myTickets?.map((item: Ticket, index: number) => {
      return {
        STT: index + 1,
        'Loại vé': item?.type,
        'Trạng thái': item?.status,
        'Ảnh vé': 'QRCode',
      };
    });
    setListQR(formattedData);
  }, [data]);

  const handleDownload = useCallback(
    (typeTicket: string, padding: number = 10) => {
      const svgData = new XMLSerializer().serializeToString(qrCodeRef.current);
      const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)));
      const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`;
      const image = new Image();

      image.onload = () => {
        const width = qrCodeRef.current.getAttribute('width');
        const height = qrCodeRef.current.getAttribute('height');

        // Add padding to the canvas dimensions
        const paddedWidth = parseInt(width) + 2 * padding;
        const paddedHeight = parseInt(height) + 2 * padding;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', paddedWidth.toString());
        canvas.setAttribute('height', paddedHeight.toString());

        const context: any = canvas.getContext('2d');

        // Draw the image with padding
        context.fillStyle = 'white'; // Set the padding color
        context.fillRect(0, 0, paddedWidth, paddedHeight); // Fill the entire canvas with padding color
        context.drawImage(image, padding, padding, width, height); // Draw the image with padding

        const imageDataUrl = canvas.toDataURL('image/png');
        console.log(imageDataUrl);

        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = `${typeTicket}.png`;
        link.click();
      };

      image.src = svgDataUrl;

      setOpen(!open);
    },
    [qrCodeRef, open],
  );
  const handlePass = (item: ITicket) => {
    dispatch(addTicketByEvent(item));
    setOpenTool([-1, false]);
  };
  return (
    <div className="relative mx-5 my-2 sm:mx-16">
      <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper" navigation>
        {data?.myTickets?.map((item: Ticket, index: number) => {
          // const code = JSON.stringify({ id: item?._id, qr: item?.qr });
          // const qrCodeRef = useRef(null);
          // qrCodeRefs.push(qrCodeRef);
          return (
            <SwiperSlide key={index}>
              <div className="absolute z-10 h-full w-full rounded-xl bg-cs_dark opacity-60 transition-all group-hover:scale-110"></div>
              <img
                src={data?.event?.banner[0]?.url}
                alt=""
                className="h-[450px] w-full rounded-xl object-cover xl:h-[310px]"
              />
              <div className="absolute left-0 top-0 z-10 flex w-full justify-between p-4 text-cs_light">
                <div className="xl:w-2/3">
                  <Link to={`/event-detail/${data?.event?._id}`}>
                    <p className=" line-clamp-2 text-xl font-bold">{data?.event?.title}</p>
                  </Link>
                  <span className=" gap-2 text-sm font-semibold">
                    <span>Thời gian: </span>
                    {moment(data?.event?.start_date).format('hh:mm - DD/MM/YYYY')}
                    <span className="text-sm "> - {data?.event?.categories[0]?.name}</span>
                  </span>
                  {/* <p className="text-sm font-semibold">Số vé: {data?.totalTickets}</p> */}

                  <p className="hidden text-sm font-semibold xl:block">
                    Trạng thái: <span className="text-sm text-cs_semi_green">Chưa sử dụng</span>
                  </p>
                  <p className="hidden text-sm font-semibold xl:block">
                    Loại vé: <span className="text-sm text-cs_semi_green">{item?.title}</span>
                  </p>
                  <p className="text-sm font-semibold xl:block">
                    Vé:{' '}
                    <span className="text-sm text-cs_semi_green">
                      {index + 1}/{data?.myTickets?.length}
                    </span>
                  </p>
                  {/* {!passTicket && (
                    <Button onClick={() => setOpen(true)} value="Check-in" type="button" className="mt-2" mode="dark" />
                  )} */}
                  <Button
                    value="Tải vé"
                    icon="download-outline"
                    className="mt-5 hidden !bg-cs_semi_green !text-white xl:block"
                    onClick={() => handleDownload(data?.myTickets[0]?.title)}
                  />
                </div>
                {!passTicket && (
                  <div ref={toolRef} onClick={() => setOpenTool([index, !openTool[0]])} className="">
                    <Icon
                      name="ellipsis-vertical-outline"
                      className="rounded-full p-1 text-xl transition-all hover:scale-110 hover:bg-[#eee] hover:text-cs_dark"
                    />
                  </div>
                )}
                <ul
                  className={`${
                    openTool[0] === index ? 'h-fit w-fit p-2' : 'h-0 w-0'
                  } absolute right-6 top-12 z-20 overflow-hidden rounded-lg bg-cs_light text-sm  text-cs_grayText transition-all`}
                >
                  {data?.myTickets?.length > 1 && (
                    <li
                      onClick={exportDSSV}
                      className="flex cursor-pointer items-center gap-2  rounded-md p-2 transition-all hover:bg-[#eee]"
                    >
                      <Icon name="download-outline" />
                      <span>Tải danh sách vé</span>
                    </li>
                  )}
                  <li onClick={() => handlePass(data)}>
                    <Link
                      to="/user/pass-event"
                      className="flex cursor-pointer items-center gap-2 rounded-md p-2 transition-all hover:bg-[#eee]"
                    >
                      <Icon name="send-outline" />
                      <span>Chuyển giao vé</span>
                    </Link>
                  </li>
                </ul>
                <div className="absolute right-1/2 mt-32 w-56 translate-x-1/2 xl:right-5 xl:mt-12 xl:translate-x-0">
                  <div className="flex justify-center rounded-xl border bg-cs_light py-2 text-cs_dark shadow-border-light">
                    <div>
                      <div className="flex justify-between text-xs font-bold">
                        <span>Vé: {item?.type}</span>
                        <span>{item?.status === 'unworn' ? 'Chưa sử dụng' : 'Đã sử dụng'}</span>
                      </div>
                      <QRCode
                        className="h-52 w-52 bg-cs_light p-2 xl:h-48 xl:w-48"
                        ref={qrCodeRef}
                        id="qrcode"
                        value={item?.qr}
                      />
                    </div>
                  </div>
                  <Button
                    value="Tải vé"
                    icon="download-outline"
                    className="mt-3 translate-x-1/2 !bg-cs_semi_green !text-white xl:hidden"
                    onClick={() => handleDownload(data?.myTickets[0]?.title)}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TicketProfile;
