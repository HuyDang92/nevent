import { useState } from 'react';
import SectionTitle from '~/components/customs/SectionTitle';
import CategoryCard from '~/components/customs/CategoryCard';
import Banner from './components/Banner';
import { Link } from 'react-router-dom';
import thumb from '~/assets/images/pro.webp';
import poster from '~/assets/images/poster.jpg';
import Button from '~/components/customs/Button';
import Slide from './components/Slide';
import ProductCard from '~/components/customs/ProductCard';
function Home() {
  const dataPro = [
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: poster,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
  ];
  const tempProductData = [
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      category: 'Cuộc thi',
      place: 'Hồ Chí Minh',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      category: 'Cuộc thi',
      place: 'Hồ Chí Minh',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      category: 'Cuộc thi',
      place: 'Hồ Chí Minh',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
  ];

  const tempCateData = [
    {
      img: thumb,
      name: 'Thể thao',
    },
    {
      img: thumb,
      name: 'Âm nhạc',
    },
    {
      img: thumb,
      name: 'Âm nhạc',
    },
    {
      img: thumb,
      name: 'Âm nhạc',
    },
    {
      img: thumb,
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
        <Slide data={dataPro} />
        <SectionTitle value="Sự kiện sắp diễn ra" />
        <div className="grid gap-3 grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {tempProductData.map((item, index) => (
            <Link to={'/'} key={index}>
              <ProductCard data={item} index={index} />
            </Link>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Button className="" value="Xem thêm" />
        </div>
      </div>
    </>
  );
}

export default Home;
