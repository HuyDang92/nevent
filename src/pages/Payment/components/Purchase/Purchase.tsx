import { useState } from 'react';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import Icon from '~/components/customs/Icon';
import { Icon as Iconify } from '@iconify/react';
import Button from '~/components/customs/Button';
import { useGetBankListQuery } from '~/features/Payment/bankApi.service';
import Skeleton from 'react-loading-skeleton';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Purchase = ({ setActiveStep }: Prop) => {
  const [method, setMethod] = useState(0);
  const { isFetching, data, isError } = useGetBankListQuery();
  const bankList = data?.data;
  return (
    <div>
      <div className="relative flex h-[60px] items-center border-b-[0.5px] px-5">
        <button onClick={() => setActiveStep(1)} className="z-10 flex cursor-pointer items-center">
          <Icon name="arrow-back-outline" className="mr-2 text-xl" />
        </button>
        <h1 className="absolute w-[calc(100%-40px)] text-center font-bold uppercase md:static md:text-left">
          Thanh toán
        </h1>
      </div>
      <div className="m-3">
        <Tabs>
          <TabsHeader className="!rounded-[10px]">
            <Tab onClick={() => setMethod(0)} className="flex items-center" index={0}>
              <div className="flex w-full items-center justify-center gap-[10px] md:justify-normal">
                <input
                  onChange={() => {}}
                  checked={method === 0 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="solar:card-broken" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden md:block text-sm">Thẻ tín dụng</span>
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
                <Iconify icon="clarity:bank-line" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden md:block text-sm">Internet Banking</span>
              </div>
            </Tab>
            <Tab onClick={() => setMethod(2)} className="flex items-center" index={2}>
              <div className="flex h-full w-full items-center justify-center gap-[10px] md:justify-normal">
                <input
                  onChange={() => {}}
                  checked={method === 2 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="arcticons:momo" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden md:block">MoMo</span>
              </div>
            </Tab>
            {/* <Tab onClick={() => setMethod(3)} className="flex items-center" index={3}>
              <div className="flex w-full items-center justify-center gap-[10px] md:justify-normal">
                <input
                  onChange={() => {}}
                  checked={method === 3 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="arcticons:zalopay" className="text-3xl dark:text-cs_light" />
                <span className="hidden md:block">ZaloPay</span>
              </div>
            </Tab> */}
          </TabsHeader>
          <TabsBody className="">
            <TabsContent index={0} className="p-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, reiciendis. Exercitationem quasi quod et?
              Expedita molestias, dolore, velit dolores ab amet quia debitis soluta consequatur rem qui voluptatem nobis
              delectus!
            </TabsContent>
            <TabsContent index={1}>
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
            </TabsContent>
            <TabsContent index={2} className="p-5">
              <p>
                <b>Lưu ý:</b> Khi khách hàng thanh toán bằng thẻ Momo, xin vui lòng không tắt cửa sổ trình duyệt khi
                đang thanh toán. Vui lòng chờ đến khi có thông báo thành công.
              </p>
            </TabsContent>
            <TabsContent index={3} className="p-5">
              <p>
                <b>Lưu ý:</b> Khi khách hàng thanh toán bằng thẻ Momo, xin vui lòng không tắt cửa sổ trình duyệt khi
                đang thanh toán. Vui lòng chờ đến khi có thông báo thành công.
              </p>
            </TabsContent>
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-full text-right px-3 pb-3">
        <Button
          onClick={() => setActiveStep(4)}
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
