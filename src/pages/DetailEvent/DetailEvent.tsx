import { Typography } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
import Button from '~/components/customs/Button';
import Tabs from '~/components/customs/Tabs';

function DetailEvent() {
  const tabHeader = ['Giới thiệu', 'Thông tin về', 'Ngày tổ chức', 'Lưu ý'];
  const tabContent = [
    'content 1',
    'content 2',
    'content 3',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
  ];
  const tickets = [
    {color: 'ff0000',price: 800000, type: 'vip'},
    {color: '00ff00',price: 500000, type: 's'},
    {color: '00ff00',price: 800000, type: 'a'},
    {color: '00ff00',price: 0, type: 'd'}
  ]
  return (
    <div className='px-[30px] py-[54px]'>
      <div className='flex justify-between'>
        <div>
          <div className='text-[18px] h-[150px] flex flex-col justify-between'>
            <Typography className="text-[2rem] font-bold">PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT</Typography>
            <div className="flex items-center">
              <IonIcon name="timer-outline" className="mr-5 text-xl" />
              Friday, 10 November 2023&nbsp;<span className="text-[#ff0000]"> (07:00 PM - 11:00 PM)</span>
            </div>
            <div className="flex items-center">
              <IonIcon name="navigate-outline" className="mr-5 text-xl" />
              <div>
                <b>Cung thể thao Điền Kinh - Mỹ Đình,</b> <br />
                <span>Phố Trần Hữu Dực, Phường Cầu Diễn, District Nam Tu Liem, Ha Noi City</span>
              </div>
            </div>
          </div>
          <Tabs className="w-[680px] my-[35px]" tabConent={tabContent} tabHeader={tabHeader} />
        </div>
        <div>
          <Button className='text-lg text-white font-bold w-full h-10 bg-cs_purple grid place-content-center' value="Đặt vé"/>
          <div>
            <ul className='border border-cs_dark/50 mt-[20px] p-2'>
              {tickets.map((ticket, index: number) => (
                <li key={index} className='flex items-center my-[5px] font-bold'>
                  <div className={`w-[60px] h-[30px] mr-[10px] grid place-content-center bg-[#00ff00]`}>
                    {ticket.type}
                  </div>
                  {ticket.price > 0 ? ticket.price.toLocaleString() + ' VNĐ' : 'Free'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEvent;
