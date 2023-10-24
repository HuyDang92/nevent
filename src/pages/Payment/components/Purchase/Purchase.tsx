import { useState } from 'react';
import { Tab, Tabs, TabsContent, TabsHeader, TabsBody } from '~/components/Tabs';
import momo from '~/assets/images/momo.svg';
import zalopay from '~/assets/images/zalopay.svg';
import Icon from '~/components/customs/Icon';

const Purchase = () => {
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
      id: 2,
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
      <div className="flex h-[60px] items-center border-b-[0.5px] px-5">
        <h1 className="font-bold uppercase">Thanh toán</h1>
      </div>
      <div className="m-4">
        <Tabs>
          <TabsHeader className="!rounded-[10px]">
            <Tab className="flex items-center" index={0}>
              <div className="flex w-full items-center gap-[10px]" onClick={() => setMethod(0)}>
                <input
                  checked={method === 0 ? true : false}
                  className="h-[20px] w-[20px]"
                  type="radio"
                  name="payment"
                />
                <Icon name="card-outline" />
                <span>Thẻ tín dụng</span>
              </div>
            </Tab>
            <Tab className="flex items-center" index={1}>
              <div className="flex w-full items-center gap-[10px]" onClick={() => setMethod(1)}>
                <input
                  checked={method === 1 ? true : false}
                  className="h-[20px] w-[20px]"
                  type="radio"
                  name="payment"
                />
                <Icon name="card-outline" />
                <span>Internet Banking</span>
              </div>
            </Tab>
            <Tab className="flex items-center" index={2}>
              <div className="flex w-full items-center gap-[10px]" onClick={() => setMethod(2)}>
                <input
                  checked={method === 2 ? true : false}
                  className="h-[20px] w-[20px]"
                  type="radio"
                  name="payment"
                />
                <img src={momo} alt="momo" className="w-[25px]" />
                <span>MoMo</span>
              </div>
            </Tab>
            <Tab className="flex items-center" index={3}>
              <div className="flex w-full items-center gap-[10px]" onClick={() => setMethod(3)}>
                <input
                  checked={method === 3 ? true : false}
                  className="h-[20px] w-[20px]"
                  type="radio"
                  name="payment"
                />
                <img src={zalopay} alt="zlpay" className="w-[25px]" />
                <span>ZaloPay</span>
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabsContent index={0}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, reiciendis. Exercitationem quasi quod et?
              Expedita molestias, dolore, velit dolores ab amet quia debitis soluta consequatur rem qui voluptatem nobis
              delectus!
            </TabsContent>
            <TabsContent index={1}>
              <div className="flex flex-wrap gap-[15px] p-5">
                {bankList?.map((bank) => (
                  <div
                    key={bank.id}
                    className="flex h-[100px] w-[calc(100%/6-12.5px)] cursor-pointer items-center justify-between rounded-md border-[1px] p-4"
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
    </div>
  );
};

export default Purchase;
