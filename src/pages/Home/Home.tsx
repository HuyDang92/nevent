import { useState } from 'react';
import SectionTitle from '~/components/customs/SectionTitle';
import CategoryCard from '~/components/customs/CategoryCard';
import ProductList from '~/components/customs/ProductCard';
import Banner from './components/Banner';
import { Box } from '@mui/joy';
import { Link } from 'react-router-dom';

function Home() {
  const tempProductData = [
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      category: 'Cuộc thi',
      place: 'Hồ Chí Minh',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      category: 'Cuộc thi',
      place: 'Hồ Chí Minh',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      category: 'Cuộc thi',
      place: 'Hồ Chí Minh',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: './src/assets/images/pro.png',
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleCates, setVisibleCates] = useState(3); // Số lượng danh mục hiển thị ban đầu

  return (
    <>
      <div className="mb-6 w-full">
        <Banner />
        <SectionTitle value="Danh mục yêu thích" className="hidden lg:flex" />
        <div className="hidden w-full lg:grid lg:grid-cols-3 lg:gap-6">
          {tempCateData.slice(0, visibleCates).map((data, index) => (
            <CategoryCard id={index} image={data.img} name={data.name} link="/about" key={index} />
          ))}
        </div>
        <SectionTitle value="Sự kiện nổi bật" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
          {tempProductData.map((item, index) => (
               <Link to={'/'} key={index}> <ProductList  data={item} index={index}/></Link>
            ))}
          {/* <div className="hidden sm:block">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{productUI}</div>
        {visibleProducts < data.length && (
          <div className="mt-5 flex justify-center">
            <Button className="" onClick={showMoreProducts} value="Xem thêm" />
          </div>
        )}
      </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
