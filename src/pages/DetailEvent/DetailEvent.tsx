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
  return (
    <div className="px-[30px] py-[54px] relative">
      <div className="flex justify-between">
        <div className="w-[calc(100%-355px)]">
          <div className="flex h-[150px] flex-col justify-between text-[18px]">
            <Typography className="text-[2rem] font-bold text-cs_dark">
              PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT
            </Typography>
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
          <Tabs className="my-[35px] w-[680px]" tabConent={tabContent} tabHeader={tabHeader} />
        </div>
        <div className="w-[355px]">
          <Button
            className="grid h-10 w-full place-content-center bg-cs_purple text-lg font-bold text-white"
            value="Đặt vé"
          />
          <div className="mt-3 p-5 shadow-border-blur text-[14px]">
            <Typography className="text-[20px] font-bold text-cs_dark">
              PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT
            </Typography>
            <div className="flex items-center gap-[15px] py-[10px]">
              <IonIcon name="timer-outline" className="text-xl" />
              <span>Friday, 10 November 2023 (07:00 PM - 11:00 PM)</span>
            </div>
            <div className="flex items-center gap-[15px] py-[10px]">
              <IonIcon name="navigate-outline" className="text-xl" />
              <span>
                <b>Cung thể thao Điền Kinh - Mỹ Đình,</b> <br />
                <span>Phố Trần Hữu Dực, Phường Cầu Diễn, District Nam Tu Liem, Ha Noi City</span>
              </span>
            </div>
            <div className="flex items-center gap-[15px] py-[10px]">
              <IonIcon name="ticket-outline" className="text-xl" />
              <span>
                Giá vé từ: &nbsp;<b className="text-cs_purple">1,000,000 VND</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEvent;
