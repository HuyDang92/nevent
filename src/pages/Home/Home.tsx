import SectionTitle from '~/components/SectionTitle';
import CategoryCard from '~/components/CategoryCard';
import Banner from './components/Banner';
import { Link } from 'react-router-dom';
import Button from '~/components/customs/Button';
import Slide from './components/Slide';
import ProductCard from '~/components/EventCard';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import SkeletonCategories from '~/components/customs/Skeleton/SkeletonCategories';
import { useGetAllEventQuery, useGetEventBannerQuery } from '~/features/Event/eventApi.service';
import SkeletonEventHot from '~/components/customs/Skeleton/SkeletonEventHot';
import SkeletonEventList from '~/components/customs/Skeleton/SkeletonEventList';
import nothing from '~/assets/images/nothing.svg';

function Home() {
  const event = useGetAllEventQuery({ page: 1, limit: 12, status: 'UPCOMING' });
  const categories = useGetAllCategoryQuery();
  const eventBanner = useGetEventBannerQuery();

  return (
    <>
      <div className="mb-6 w-full">
        {!eventBanner.isFetching && eventBanner.data?.data?.length > 0 && <Banner data={eventBanner.data?.data} />}
        {eventBanner.isFetching && <SkeletonEventHot />}
        <SectionTitle value="Danh mục được yêu thích" to="/event-categories" className='pt-10'/>
        {categories.isFetching && <SkeletonCategories />}
        <div className="w-full grid-cols-1 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {!categories.isFetching &&
            categories?.data?.data
              ?.slice(0, 6)
              .map((item: ICategory, index: number) => <CategoryCard key={index} data={item} />)}
        </div>
        <SectionTitle value="Sự kiện nổi bật" to="/event-categories" className='pt-5'/>
        {event.data?.data?.docs?.length === 0 && (
          <div className="my-24 flex justify-center text-center">
            <div>
              <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
              <h3 className="font-medium text-[#ccc]">Không có sự kiện</h3>
            </div>
          </div>
        )}
        {event.isFetching && <SkeletonCategories />}
        {event.data?.data?.docs?.length !== 0 && <Slide data={event.data?.data?.docs} />}
        <SectionTitle value="Sự kiện sắp diễn ra" to="/event-categories" className='pt-5'/>
        {event.isFetching && <SkeletonEventList />}
        {event.data?.data?.docs?.length === 0 && (
          <div className="my-24 flex justify-center text-center">
            <div>
              <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
              <h3 className="font-medium text-[#ccc]">Không có sự kiện</h3>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 3xl:grid-cols-5">
          {!event.isFetching &&
            event.data?.data?.docs.map((item: IEvent, index: number) => (
              <ProductCard key={index} data={item} index={index} />
            ))}
        </div>
        {event.data?.data?.docs?.length !== 0 && (
          <Link to="/event-categories">
            <div className="mt-5 flex justify-center">
              <Button className="" value="Xem thêm" mode="dark" />
            </div>
          </Link>
        )}
      </div>
    </>
  );
}

export default Home;
