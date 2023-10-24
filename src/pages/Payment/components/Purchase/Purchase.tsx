import { useState } from 'react';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import Icon from '~/components/customs/Icon';
import { Icon as Iconify } from '@iconify/react';
import Button from '~/components/customs/Button';
interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Purchase = ({ setActiveStep }: Prop) => {
  const [method, setMethod] = useState(0);
  const bankList = [
    {
      id: 1,
      name: 'Ngân hàng TMCP An Bình',
      code: 'ABB',
      bin: '970425',
      shortName: 'ABBANK',
      logo: 'https://api.vietqr.io/img/ABB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 2,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 3,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 4,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 5,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 6,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 7,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
    {
      id: 8,
      name: 'Ngân hàng TMCP Á Châu',
      code: 'ACB',
      bin: '970416',
      shortName: 'ACB',
      logo: 'https://api.vietqr.io/img/ACB.png',
      transferSupported: 1,
      lookupSupported: 1,
    },
  ];
  return (
    <div>
      <div className="relative flex h-[60px] items-center border-b-[0.5px] px-5">
        <button onClick={() => setActiveStep(2)} className="z-10 flex cursor-pointer items-center md:hidden">
          <Icon name="arrow-back-outline" className="mr-2 text-xl" />
        </button>
        <h1 className="absolute w-[calc(100%-40px)] text-center font-bold uppercase">Thanh toán</h1>
      </div>
      <div className="m-4">
        <Tabs>
          <TabsHeader className="!rounded-[10px]">
            <Tab className="flex items-center" index={0}>
              <div
                className="flex w-full items-center justify-center gap-[10px] md:justify-normal"
                onClick={() => setMethod(0)}
              >
                <input
                  onChange={() => {}}
                  checked={method === 0 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="solar:card-broken" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden md:block">Thẻ tín dụng</span>
              </div>
            </Tab>
            <Tab className="flex items-center" index={1}>
              <div
                className="flex w-full items-center justify-center gap-[10px] md:justify-normal"
                onClick={() => setMethod(1)}
              >
                <input
                  onChange={() => {}}
                  checked={method === 1 ? true : false}
                  className="hidden h-[20px] w-[20px] md:block"
                  type="radio"
                  name="payment"
                />
                <Iconify icon="clarity:bank-line" className="text-3xl dark:text-cs_light md:text-base" />
                <span className="hidden md:block">Internet Banking</span>
              </div>
            </Tab>
            <Tab className="flex items-center" index={2}>
              <div
                className="flex w-full items-center justify-center gap-[10px] md:justify-normal"
                onClick={() => setMethod(2)}
              >
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
            <Tab className="flex items-center" index={3}>
              <div
                className="flex w-full items-center justify-center gap-[10px] md:justify-normal"
                onClick={() => setMethod(3)}
              >
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
            </Tab>
          </TabsHeader>
          <TabsBody className="">
            <TabsContent index={0} className="p-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, reiciendis. Exercitationem quasi quod et?
              Expedita molestias, dolore, velit dolores ab amet quia debitis soluta consequatur rem qui voluptatem nobis
              delectus!
            </TabsContent>
            <TabsContent index={1}>
              <div className="flex flex-wrap gap-[15px] p-1 md:p-5">
                {bankList?.map((bank) => (
                  <div
                    key={bank.id}
                    className="flex h-[100px] w-[calc(100%/2-7.5px)] cursor-pointer items-center justify-between rounded-md border-[1px] md:w-[calc(100%/6-12.5px)] md:p-4"
                  >
                    <img src={bank.logo} alt="" />
                  </div>
                ))}
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
      <div className="w-full text-right">
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
