import { Typography } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';
import { useState } from 'react';
import Button from '~/components/customs/Button';
import ProductCard from '~/components/customs/ProductCard';
import SectionTitle from '~/components/customs/SectionTitle';
import Tabs from '~/components/customs/Tabs';

function DetailEvent() {

  
  const [visibleProducts, setVisibleProducts] = useState(8); // Số lượng sản phẩm hiển thị ban đầu
  const tabHeader = ['Giới thiệu', 'Thông tin về', 'Ngày tổ chức', 'Lưu ý'];
  const tabContent = [
    'content 1',
    'content 2',
    'content 3',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
  ];
  const tempProductData = [
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00:00 - 21/12/2023',
      category: 'Cuộc thi',
    },
  ]; //Thay đổi tempProductData bằng dữ liệu fetch ra từ database
  const showMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8); // Tăng số sản phẩm hiển thị thêm khi nhấp vào "Xem thêm"
  };
  return (
    <div className="px-[30px] py-[54px]">
      <div className="flex items-start justify-between gap-[40px]">
        <div className="w-[calc(100%-355px)]">
          <div className="flex flex-col justify-between text-[18px]">
            <Typography className="text-[2rem] font-bold text-cs_dark">
              PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT
            </Typography>
            <div className="mt-[10px] flex items-center gap-[20px]">
              <div className="h-[120px] w-[115px] overflow-hidden rounded-[5px] shadow-border-full">
                <div className="grid h-[35px] place-content-center bg-cs_purple py-2 text-[15px] text-cs_light">
                  Tháng 10
                </div>
                <div className="flex h-[85px] flex-col items-center justify-center">
                  <b className="text-[40px]">20</b>
                  <span className="text-[14px]">Thứ 6</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[15px]">
                  <IonIcon name="timer-outline" className="w-[10%] text-xl" />
                  <span className="w-[90%]">
                    Friday, 10 November 2023&nbsp;<span className="text-[#ff0000]"> (07:00 PM - 11:00 PM)</span>
                  </span>
                </div>
                <div className="flex items-center gap-[15px]">
                  <IonIcon name="navigate-outline" className="w-[10%] text-xl" />
                  <span className="w-[90%]">
                    <b>Cung thể thao Điền Kinh - Mỹ Đình,</b> <br />
                    <span>Phố Trần Hữu Dực, Phường Cầu Diễn, District Nam Tu Liem, Ha Noi City</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Tabs className="my-[35px] w-[680px]" tabConent={tabContent} tabHeader={tabHeader} />
        </div>
        <div className="sticky top-[88px] w-[355px]">
          <Button
            className="grid h-10 w-full place-content-center bg-cs_purple text-lg font-bold text-white"
            value="Đặt vé"
          />
          <div className="mt-3 p-5 text-[14px] shadow-border-blur">
            <Typography className="text-[20px] font-bold text-cs_dark">
              PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT
            </Typography>
            <div className="flex items-center gap-[15px] py-[10px]">
              <IonIcon name="timer-outline" className="w-[10%] text-xl" />
              <span className="w-[90%]">Friday, 10 November 2023 (07:00 PM - 11:00 PM)</span>
            </div>
            <div className="flex items-center gap-[15px] py-[10px]">
              <IonIcon name="navigate-outline" className="w-[10%] text-xl" />
              <span className="w-[90%]">
                <b>Cung thể thao Điền Kinh - Mỹ Đình,</b> <br />
                <span>Phố Trần Hữu Dực, Phường Cầu Diễn, District Nam Tu Liem, Ha Noi City</span>
              </span>
            </div>
            <div className="flex items-center gap-[15px] py-[10px]">
              <IonIcon name="ticket-outline" className="w-[10%] text-xl" />
              <span className="w-[90%]">
                Giá vé từ: &nbsp;<b className="text-cs_purple">1,000,000 VND</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SectionTitle value="Đề xuất cho bạn" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempProductData.slice(0, visibleProducts).map((data, index) => (
            <ProductCard
              key={index}
              id={index}
              image={data.image}
              name={data.title}
              date={data.date}
              category={data.category}
              link=""
            />
          ))}
        </div>
        {visibleProducts < tempProductData.length && (
          <div className="mt-5 flex justify-center">
            <Button className="" onClick={showMoreProducts} value="Xem thêm" />
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailEvent;