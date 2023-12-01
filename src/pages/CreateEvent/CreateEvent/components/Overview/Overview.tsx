import moment from 'moment';
import { useEffect, useMemo } from 'react';
import Button from '~/components/customs/Button';
import Icon from '~/components/customs/Icon';
import Loading from '~/components/customs/Loading';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import { useCreateEventMutation, useGetLocationsQuery } from '~/features/Event/eventApi.service';
import { useAppSelector } from '~/hooks/useActionRedux';
import TicketCard from '~/pages/Payment/components/TicketCard';
import { useUploadFile } from '~/hooks/useUpLoadFile';
import { useUploadDesc } from '~/hooks/useUploadDesc';
import { isFetchBaseQueryError } from '~/utils/helper';
import { useNavigate } from 'react-router-dom';
import MyCarousel from '~/components/customs/MyCarousel';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { resetForm } from '~/features/Business/businessSlice';

const OverView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { eventInfo, eventTime, ticketList } = useAppSelector((state) => state.business);
  const { data: locations } = useGetLocationsQuery();
  const { data: categories } = useGetAllCategoryQuery();
  const [createEvent, { data, isError, isSuccess, isLoading, error }] = useCreateEventMutation();
  const { upLoad, loading } = useUploadFile();
  const { upLoadDesc, loadingDesc } = useUploadDesc();
  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(resetForm());
      setTimeout(() => {
        successNotify('Thêm sự kiện thành công');
      }, 1000);
      navigate('/organization/event-list');
    }
    if (isError) {
      errorNotify('Thêm sự kiện thất bại');
    }
  }, [isError, isSuccess]);
  const mergeDate = (date: string, time: string) => {
    const newDate = new Date(date);
    const [hour, minutes] = time.split(':');
    newDate.setHours(Number(hour) + 7);
    newDate.setMinutes(Number(minutes));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    const isoDateTime = newDate.toISOString();
    return isoDateTime;
  };

  const upLoadImg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const signature = `${date.getTime()}-${Math.random()}`;
      fetch(url)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], `${eventInfo?.name ? eventInfo?.name + '-' + signature : 'eventImage' + signature}`, {
              type: 'image/png',
            }),
        )
        .then(async (file) => {
          const idImg = await upLoad(file);
          resolve(idImg);
        })
        .catch((err) => reject(err));
    });
  };

  const uploadDescImg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const signature = `${date.getTime()}-${Math.random()}`;
      fetch(url)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File([blobFile], `${eventInfo?.name ? eventInfo?.name + '-' + signature : 'eventImage' + signature}`, {
              type: 'image/png',
            }),
        )
        .then(async (file) => {
          const urlImg = await upLoadDesc(file);
          resolve(urlImg);
        })
        .catch((err) => reject(err));
    });
    // return new Promise((resolve, reject) => {
    //   const date = new Date();
    //   const signature = `${date.getTime()}-${Math.random()}`;

    //   // Nếu URL là base64, không cần tải lại
    //   if (url.startsWith('data:image')) {
    //     const blob = dataURLtoBlob(url);
    //     fetch(blob)
    //     .then((r) => r.blob())
    //     .then(
    //       (blobFile) =>
    //         new File([blobFile], `${eventInfo?.name ? eventInfo?.name + '-' + signature : 'eventImage' + signature}`, {
    //           type: 'image/png',
    //         }),
    //     )
    //     .then(async (file) => {
    //       const idImg = await upLoad(file);
    //       resolve(idImg);
    //     })
    //     .catch((err) => reject(err));
    //   } else {
    //     // Nếu URL không phải là base64, tải ảnh từ URL và chuyển thành File
    //     fetch(url)
    //       .then((r) => r.blob())
    //       .then(
    //         (blobFile) =>
    //           new File(
    //             [blobFile],
    //             `${eventInfo?.name ? 'desc_' + eventInfo?.name + '-' + signature : 'desc_' + 'eventImage' + signature}`,
    //             {
    //               type: 'image/png',
    //             },
    //           ),
    //       )
    //       .then(async (file) => {
    //         await upLoad(file);
    //         resolve(urlImg);
    //       })
    //       .catch((err) => reject(err));
    //   }
    // });
  };
  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const handleAddEvent = async () => {
    try {
      let bannerId: any[] = [];
      let new_desc = eventInfo?.description;
      if (eventInfo?.banner) {
        bannerId = await Promise.all(eventInfo?.banner.map((url) => upLoadImg(url)))
          .then((images) => {
            // 'images' is an array containing the results of all the promises
            console.log('All banner fetched successfully:', images);
            return images;
            // Further processing or rendering of images can be done here
          })
          .catch((error) => {
            // Handle any errors that occurred during the fetching process
            console.error('Error fetching images:', error);
            return [];
          });
        console.log(bannerId);
        console.log(eventInfo?.description_img);
        
        if (new_desc !== undefined) {
          // Sử dụng Promise.all để đợi tất cả các promises hoàn thành
          const newImageURLs = await Promise.all((eventInfo?.description_img || []).map((url) => uploadDescImg(url)))
            .then((images) => {
              console.log('All desc images fetched successfully:', images);
              return images;
            })
            .catch((error) => {
              console.error('Error fetching images:', error);
              return [];
            });

          // Thay thế URL cũ bằng URL mới trong new_desc
          newImageURLs.forEach((newImageURL, index) => {
            if (eventInfo?.description_img) {
              const oldImageData = eventInfo?.description_img[index];
              if (typeof newImageURL === 'string') {
                new_desc = new_desc?.replace(oldImageData, newImageURL);
              }
            }
          });
        }
        console.log(new_desc);
        console.log({
          title: eventInfo?.name,
          categories: eventInfo?.categories,
          location: eventInfo?.location,
          address: eventInfo?.address,
          start_date: eventTime ? mergeDate(eventTime?.happendDate, eventTime?.happendTime) : '',
          desc: new_desc,
          totalTicketIssue: ticketList.reduce(
            (accumulator: number, ticket: TicketListInfo) => accumulator + ticket.quantity,
            0,
          ),
          tickets: ticketList,
          banner: bannerId,
          salesStartDate: eventTime ? mergeDate(eventTime?.beginDate, eventTime?.beginTime) : '',
          salesEndDate: eventTime ? mergeDate(eventTime?.endDate, eventTime?.endTime) : '',
        });

        await createEvent({
          title: eventInfo?.name,
          categories: eventInfo?.categories,
          location: eventInfo?.location,
          address: eventInfo?.address,
          start_date: eventTime ? mergeDate(eventTime?.happendDate, eventTime?.happendTime) : '',
          desc: new_desc,
          totalTicketIssue: ticketList.reduce(
            (accumulator: number, ticket: TicketListInfo) => accumulator + ticket.quantity,
            0,
          ),
          tickets: ticketList,
          banner: bannerId,
          salesStartDate: eventTime ? mergeDate(eventTime?.beginDate, eventTime?.beginTime) : '',
          salesEndDate: eventTime ? mergeDate(eventTime?.endDate, eventTime?.endTime) : '',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {(loading || isLoading || loadingDesc) && <Loading />}
      <div>
        <div>
          <h1 className="text-center text-3xl font-bold dark:text-cs_light">Thông tin sự kiện</h1>
          {errorForm && (
            <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
          )}
          <div className="my-5 h-[350px] w-full">
            <MyCarousel data={eventInfo?.banner} />
          </div>
          <div>
            <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">
              {eventInfo?.name}
            </h1>
            <h1 className="text-[18px] font-semibold text-cs_dark dark:text-cs_light md:text-lg">
              Danh mục:{' '}
              {categories?.data
                .filter((cate: ICategory) => eventInfo?.categories.includes(cate._id))
                .map((cate: ICategory, index: number, array: ICategory[]) => (
                  <span key={cate._id} className="text-cs_semi_green">
                    {cate.name}
                    {index !== array.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </h1>
            <div className="mt-[10px] flex  gap-[10px] md:gap-[20px] ">
              <div className="h-[70px] w-[120px] overflow-hidden rounded-[5px] shadow-border-full dark:border md:h-[120px] md:w-[115px]">
                <div className="grid h-[10px] place-content-center bg-cs_semi_green py-2 text-[8px] text-cs_light md:h-[35px] md:text-[15px]">
                  Tháng {moment(eventTime?.beginDate).format('MM')}
                </div>
                <div className="flex h-[60px] flex-col items-center justify-center md:h-[85px]">
                  <span className="text-xl font-bold dark:text-cs_light md:mb-2 md:text-[40px]">
                    {moment(eventTime?.beginDate).format('DD')}
                  </span>
                  <span className="text-[8px] dark:text-cs_light md:text-[14px]">
                    {moment(eventTime?.beginDate).format('dddd')}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[15px]">
                  <Icon name="timer-outline" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
                  <span className="w-[90%] dark:text-cs_light">
                    {eventTime?.beginTime}
                    {/* {moment(eventTime?.beginDate).format('HH:mm - DD/MM/YYYY')}&nbsp; */}
                    {/* <span className="text-[#ff0000] "> (07:00 PM - 11:00 PM)</span> */}
                  </span>
                </div>
                <div className="flex items-center gap-[15px]">
                  <Icon name="location-outline" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
                  <span className="w-[90%] dark:text-cs_light">
                    <span>{locations?.data.find((item: ILocation) => item._id === eventInfo?.location)?.name}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4 px-2 text-[14px] dark:text-cs_light sm:px-0  sm:text-[16px]">
              <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">Mô tả</h1>
              <div className=" leading-8">
                <h3>
                  I. THÔNG TIN CHI TIẾT VỀ SỰ KIỆN "<span className="font-semibold">{eventInfo?.name}</span>"
                </h3>
                {eventInfo?.description && <div dangerouslySetInnerHTML={{ __html: eventInfo?.description }} />}
                {/* {eventInfo?.description} */}
              </div>
            </div>
            <div className="my-5">
              <span className="dark:text-cs_light">Danh sách vé: </span>
              <div className="flex flex-wrap gap-4">
                {ticketList.map((ticket, index) => (
                  <TicketCard
                    price={ticket.price}
                    color={ticket.color}
                    key={index}
                    title={ticket.title}
                    tooltip={ticket.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Button mode="dark" className="w-full" onClick={handleAddEvent} value="Tạo sự kiện" />
      </div>
    </>
  );
};

export default OverView;
