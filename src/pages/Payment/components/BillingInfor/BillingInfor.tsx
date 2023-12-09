import { useState, useEffect } from 'react';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import Icon from '~/components/customs/Icon';
import { Icon as Iconify } from '@iconify/react';
import Button from '~/components/customs/Button';
import { useGetBankListQuery } from '~/features/Payment/bankApi.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import { useAppDispatch } from '~/hooks/useActionRedux';
import { addMethod } from '~/features/Payment/paymentSlice';

const Purchase = () => {
  const { idEvent } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [method, setMethod] = useState(0);
  // const { isFetching, data, isError } = useGetBankListQuery();
  // const bankList = data?.data;
  const currentViewPort = useCurrentViewportView();
  useEffect(() => {
    if (method === 0) {
      dispatch(addMethod('VNPAY'));
    } else {
      dispatch(addMethod('VIETQR'));
    }
  }, [method]);
  return (
    <div>
      <div className="relative flex h-[60px] items-center border-b-[0.5px] px-5">
        <button
          onClick={() => {
            navigate(`/user/payment/${idEvent}/1`);
          }}
          className="z-10 flex cursor-pointer items-center"
        >
          <Icon name="arrow-back-outline" className="mr-2 text-xl" />
        </button>
        <h1 className="absolute w-[calc(100%-40px)] text-center font-bold uppercase md:static md:text-left">
          Thanh toán
        </h1>
      </div>
      <div className="m-3">
        <Tabs>
          <TabsHeader className="w-[50%] !rounded-[10px]">
            <Tab onClick={() => setMethod(0)} className="flex items-center" index={0}>
              <div className="flex h-full w-full items-center justify-center gap-[10px] md:justify-normal">
                <input
                  onChange={() => {}}
                  checked={method === 0 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="arcticons:v-vnpay" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden md:block">VNPAY</span>
              </div>
            </Tab>
            <Tab onClick={() => setMethod(1)} className="flex items-center" index={1}>
              <div className="flex h-full w-full items-center justify-center gap-[10px] md:justify-normal">
                <input
                  onChange={() => {}}
                  checked={method === 1 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="icon-park-twotone:pay-code-one" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden text-sm md:block">VIETQR</span>
              </div>
            </Tab>
            {/* <Tab onClick={() => setMethod(2)} className="flex items-center" index={2}>
              <div className="flex h-full w-full items-center justify-center gap-[10px] md:justify-normal">
                <input
                  onChange={() => {}}
                  checked={method === 2 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="clarity:bank-line" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden text-sm md:block">Internet Banking</span>
              </div>
            </Tab> */}
          </TabsHeader>
          <TabsBody className="">
            <TabsContent index={0} className="p-5">
              <p>
                <b>Lưu ý:</b> Khi khách hàng thanh toán bằng VNPAY, xin vui lòng không tắt cửa sổ trình duyệt khi đang
                thanh toán. Vui lòng chờ đến khi có thông báo thành công.
              </p>
            </TabsContent>
            <TabsContent index={1} className="p-5">
              <p>
                <b>Lưu ý:</b> Khi khách hàng thanh toán bằng VIETQR, xin vui lòng không tắt cửa sổ trình duyệt khi đang
                thanh toán. Vui lòng chờ đến khi có thông báo thành công.
              </p>
            </TabsContent>
            {/* <TabsContent index={2}>
              <div className="flex flex-wrap gap-[15px] p-1 md:p-5">
                {isFetching && (
                  <>
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                    <Skeleton className="h-[100px] w-[calc(100%/2-7.5px)] rounded-md md:w-[calc(100%/6-12.5px)] md:p-4" />
                  </>
                )}
                {!isFetching && (
                  <>
                    {bankList?.map((bank) => (
                      <div
                        key={bank.id}
                        className="grid h-[100px] w-[calc(100%/2-7.5px)] cursor-pointer place-items-center rounded-md border-[1px] md:w-[calc(100%/6-12.5px)] md:p-4"
                      >
                        <img src={bank.logo} alt="" />
                      </div>
                    ))}
                  </>
                )}
                {isError && <div>Something went wrong</div>}
              </div>
            </TabsContent> */}
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-full px-3 pb-3 text-right xl:hidden">
        <Button
          onClick={() => {
            if (currentViewPort.width <= 1024) {
              navigate(`/user/payment/${idEvent}/4`);
            }
          }}
          className="md:w mt-5 w-full"
          type="submit"
          mode="dark"
          value="Xác nhận"
        />
      </div>
    </div>
  );
};

export default Purchase;
