import { useState } from 'react';
import ProductCard from '~/components/customs/ProductCard';
import Button from '~/components/customs/Button';
import SectionTitle from '~/components/customs/SectionTitle';
import CategoryCard from '~/components/customs/CategoryCard/CategoryCard';

function Home() {
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
  const tempCateData = [
    {
      img: './src/assets/images/pro.png',
      name: 'Thể thao',
    },
    {
      img: './src/assets/images/pro.png',
      name: 'Âm nhạc',
    },
    {
      img: './src/assets/images/pro.png',
      name: 'Âm nhạc',
    },
    {
      img: './src/assets/images/pro.png',
      name: 'Âm nhạc',
    },
    {
      img: './src/assets/images/pro.png',
      name: 'Âm nhạc',
    },
  ]; //Thay đổi tempCateData bằng dữ liệu fetch ra từ database

  //Nút xem thêm cho sản phẩm nổi bật
  const [visibleCates, setVisibleCates] = useState(3); // Số lượng danh mục hiển thị ban đầu
  const [visibleProducts, setVisibleProducts] = useState(12); // Số lượng sản phẩm hiển thị ban đầu

  const showMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8); // Tăng số sản phẩm hiển thị thêm khi nhấp vào "Xem thêm"
  };

  return (
    <>
      <div className="w-full p-5">
        <SectionTitle value="Danh mục yêu thích" className="hidden lg:flex" />
        <div className="hidden w-full lg:grid lg:grid-cols-3 lg:gap-6">
          {tempCateData.slice(0, visibleCates).map((data, index) => (
            <CategoryCard id={index} image={data.img} name={data.name} link="/about" />
          ))}
        </div>
        <SectionTitle value="Sự kiện nổi bật" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tempProductData.slice(0, visibleProducts).map((data, index) => (
            <ProductCard
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
    </>
  );
}

export default Home;
