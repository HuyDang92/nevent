import React, { createRef, useCallback, useRef } from 'react';
import moment from 'moment';
import QRCode from 'react-qr-code';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import domToImage from 'dom-to-image';
import Action from './components/Action';
import Zoom from '../customs/Zoom';
import { StatusMyTicket } from '~/Types/myTicket';

interface IProps {
  data: any;
  passTicket?: boolean;
  dataSummary: any;
}

const TicketProfile: React.FC<IProps> = ({ data, passTicket, dataSummary }) => {
  // const [listQR, setListQR] = useState<any>([]);
  const qrCodeRefs: any = useRef(
    Array(data?.myTickets?.length)
      .fill(null)
      .map(() => createRef()),
  );
  const handleDownload = useCallback(async (typeTicket: string, index: number) => {
    const qrCodeDom: any = qrCodeRefs.current[index]?.current;

    const delayedExecution = () => {
      domToImage
        .toPng(qrCodeDom)
        .then((dataUrl) => {
          console.log(dataUrl);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${typeTicket}.png`; // Tên file khi tải về
          link.click();
        })
        .catch((error) => {
          console.error('Error generating image:', error);
        });
    };

    // Set timeout for 0.5 seconds (500 milliseconds)
    setTimeout(delayedExecution, 200);
  }, []);

  // const exportDSSV = () => {
  //   const ws = XLSX.utils.json_to_sheet(listQR);
  //   const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   const fileExtension = '.xlsx';
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, 'Danh sách vé sự kiện' + fileExtension);
  // };

  // useEffect(() => {
  //   const formattedData = data?.myTickets?.map((item: Ticket, index: number) => {
  //     return {
  //       STT: index + 1,
  //       'Loại vé': item?.type,
  //       'Trạng thái': item?.status,
  //       'Ảnh vé': `QRCode_${index + 1}.png`, // Thay đổi tên ảnh tương ứng
  //     };
  //   });
  //   setListQR(formattedData);
  // }, [data]);

  return (
    <div className={` relative m-2 sm:m-5`}>
      <Swiper
        // effect={effect}
        // direction={'vertical'}
        slidesPerView={1}
        spaceBetween={10}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {data?.map((item: Ticket, index: number) => {
          return (
            <SwiperSlide key={index} className="relative rounded-2xl xl:h-[250px]">
              <div ref={qrCodeRefs.current[index]}>
                <div className="round-2xl absolute z-10 h-full w-full rounded-2xl bg-cs_dark opacity-70 transition-all group-hover:scale-110"></div>
                <span className="absolute z-10 hidden h-7 w-7 rounded-full bg-cs_light dark:bg-cs_lightDark xl:-top-3.5 xl:right-52 xl:block"></span>
                <span className="absolute z-10 hidden h-7 w-7 rounded-full bg-cs_light dark:bg-cs_lightDark xl:-bottom-3.5 xl:right-52 xl:block"></span>
                <span className="absolute z-10 hidden h-full w-1 rounded-full border-r-2 border-dashed border-cs_light bg-transparent dark:bg-cs_lightDark xl:-bottom-3.5 xl:right-[13.8rem] xl:block"></span>
                {/* Cho mobile */}
                <span className="absolute -left-3 top-48 z-20 h-7 w-7 rounded-full bg-cs_light dark:bg-cs_lightDark xl:hidden"></span>
                <span className="absolute -right-3 top-48 z-20 h-7 w-7 rounded-full bg-cs_light dark:bg-cs_lightDark xl:hidden"></span>
                <span className="absolute top-[12.8rem] z-10 h-1 w-full rounded-full  border-b-2 border-dashed border-cs_light bg-transparent dark:bg-cs_dark xl:hidden"></span>
                <img
                  src={dataSummary?.event?.banner[0]?.secureUrl}
                  alt=""
                  className="h-[520px] w-full rounded-xl object-cover xl:h-[250px]"
                />
                <div className="absolute left-0 top-0 z-10 flex w-full justify-between p-4 text-cs_light">
                  <div className="xl:w-2/3 xl:space-y-3">
                    <Link to={`/event-detail/${dataSummary?.event?._id}`}>
                      <p className=" line-clamp-2 text-xl font-bold hover:text-cs_semi_green">
                        {dataSummary?.event?.title}
                      </p>
                    </Link>
                    <span className=" gap-2 text-sm font-semibold">
                      <span>Thời gian: </span>
                      {moment(dataSummary?.event?.start_date).format('hh:mm - DD/MM/YYYY')}
                      <span className="text-sm ">
                        - {dataSummary?.event?.address} {dataSummary?.event?.location?.name}
                      </span>
                    </span>

                    <p className=" text-sm font-semibold xl:block">
                      Trạng thái:{' '}
                      <span
                        className={`text-sm ${
                          item?.status === StatusMyTicket.UNWORN ? 'text-cs_semi_green' : 'text-cs_red'
                        }`}
                      >
                        {item?.status === StatusMyTicket.UNWORN ? 'Chưa sử dụng' : 'Đã sử dụng'}
                      </span>
                    </p>
                    <p className="text-sm font-semibold xl:block">
                      Mô tả vé: <span className=" text-sm">{item?.desc}</span>
                    </p>
                    <p className="text-sm font-semibold xl:block">
                      Vé:{' '}
                      <span className=" text-sm">
                        {index + 1}/{data?.length}
                      </span>
                    </p>
                    {/* {!passTicket && (
                      <Button onClick={() => setOpen(true)} value="Check-in" type="button" className="mt-2" mode="dark" />
                    )} */}
                    {/* <Button
                      value="Tải vé"
                      icon="download-outline"
                      className="mt-5  hidden !bg-cs_semi_green !text-white xl:block"
                      onClick={() => handleDownload(item?.title, index)}
                    /> */}
                  </div>
                  {!passTicket && item.status === StatusMyTicket.UNWORN && (
                    <Action data={dataSummary} onClick={() => handleDownload(item?.title, index)} />
                  )}
                  <div className="absolute right-1/2 top-52 translate-x-1/2 xl:-bottom-[3rem] xl:right-7 xl:top-8 xl:translate-x-0">
                    <p className="py-2 text-center text-sm font-semibold xl:block">
                      Vé: <span className=" text-sm">{item?.title}</span>
                    </p>
                    <div className="flex justify-center bg-cs_light text-cs_dark shadow-border-light">
                      <div>
                        <Zoom>
                          <QRCode
                            className="h- w- border-2 border-cs_dark bg-cs_light p-2 xl:h-40 xl:w-40"
                            id="qrcode"
                            value={item?.qr}
                          />
                        </Zoom>
                      </div>
                    </div>
                  </div>
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
