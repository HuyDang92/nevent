import { useState } from 'react';
import ProductCard from '~/components/customs/ProductCard';
import Button from '~/components/customs/Button';
import SectionTitle from '~/components/customs/SectionTitle';

function Home() {
  const tempData = [
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
  ]; //Thay đổi tempData bằng dữ liệu fetch ra từ database

  //Nút xem thêm
  const [visibleProducts, setVisibleProducts] = useState(12); // Số lượng sản phẩm hiển thị ban đầu

  const showMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8); // Tăng số sản phẩm hiển thị thêm khi nhấp vào "Xem thêm"
  };

  return (
    <>
      <SectionTitle value="Sự kiện nổi bật" />
      <div className="p-5">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempData.slice(0, visibleProducts).map((data, index) => (
            <ProductCard key={index} image={data.image} title={data.title} date={data.date} category={data.category} />
          ))}
        </div>
        {visibleProducts < tempData.length && (
          <Button className="mx-auto mt-5" onClick={showMoreProducts} value="Xem thêm" />
        )}
      </div>
    </>
  );
}

export default Home;
