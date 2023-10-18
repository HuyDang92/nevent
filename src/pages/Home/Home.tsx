import SectionTitle from '~/components/SectionTitle';
import CategoryCard from '~/components/CategoryCard';
import Banner from './components/Banner';
import { Link } from 'react-router-dom';
import thumb from '~/assets/images/pro.webp';
import poster from '~/assets/images/poster.jpg';
import Button from '~/components/customs/Button';
import Slide from './components/Slide';
import ProductCard from '~/components/EventCard';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import SkeletonCategories from '~/components/customs/Skeleton/SkeletonCategories';
import { useGetAllEventQuery } from '~/features/Event/eventApi.service';
import SkeletonEventHot from '~/components/customs/Skeleton/SkeletonEventHot';
import SkeletonEventList from '~/components/customs/Skeleton/SkeletonEventList';

function Home() {
  const categories = useGetAllCategoryQuery();
  const event = useGetAllEventQuery({ page: 1, limit: 16 });

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

  return (
    <>
      <div className="mb-6 w-full">
        <Banner />
        <SectionTitle value="Danh mục yêu thích" />
        {categories.isFetching && <SkeletonCategories />}
        <div className="w-full grid-cols-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {!categories.isFetching &&
            categories?.data?.data?.map((item: ICategory, index: number) => <CategoryCard key={index} data={item} />)}
        </div>
        <SectionTitle value="Sự kiện nổi bật" />
        {event.isFetching ? <SkeletonEventHot /> : <Slide data={dataPro} />}
        <SectionTitle value="Sự kiện sắp diễn ra" />
        {event.isFetching && <SkeletonEventList />}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 3xl:grid-cols-5">
          {tempProductData.map((item, index) => (
            <Link to={'/'} key={index}>
              <ProductCard data={item} index={index} />
            </Link>
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Button className="" value="Xem thêm" mode="dark" />
        </div>
      </div>
    </>
  );
}

export default Home;
