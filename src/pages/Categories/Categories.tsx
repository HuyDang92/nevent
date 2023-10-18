import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductList from '~/components/EventCard';
import thumb from '~/assets/images/pro.webp';
import { Link } from 'react-router-dom';
import Icon from '~/components/customs/Icon';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';

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

function Categories() {
  const categories = useGetAllCategoryQuery();

  const [isActive, setIsActive] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12; // Số sản phẩm trên mỗi trang

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tempProductData.slice(startIndex, endIndex);

  // Tính tổng số trang
  const totalPages = Math.ceil(tempProductData.length / itemsPerPage);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const pageClassNames = {
    page: 'mx-2 px-4 py-2 text-cs_semi_green border rounded-lg shadow-lg font-bold',
    active: 'bg-cs_semi_green text-white',
  };

  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold dark:text-white">Danh mục</h1>
        <div className="mt-5 flex items-center justify-between">
          {/* Cate tabs */}
          <div className="flex gap-2">
            {categories?.data?.data.map((item: ICategory, index: number) => (
              <button
                key={index}
                onClick={() => setIsActive(item._id)}
                className={`z-10 rounded-full border border-cs_semi_green bg-white px-3 py-1 text-[13px] font-medium text-cs_semi_green transition-all ${
                  isActive === item._id ? '!bg-cs_semi_green text-white' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {/* Filter */}
          <div className="hidden gap-4 transition-all sm:flex">
            <Icon
              className="rounded-lg border p-2.5 text-xl text-cs_semi_green shadow-border-full transition-all hover:bg-cs_semi_green hover:text-white dark:border-cs_light"
              name="calendar"
            />
            <Icon
              className="rounded-lg border p-2.5 text-xl text-cs_semi_green shadow-border-full transition-all hover:bg-cs_semi_green hover:text-white dark:border-cs_light"
              name="cash"
            />
            <Icon
              className="rounded-lg border p-2.5 text-xl text-cs_semi_green shadow-border-full transition-all hover:bg-cs_semi_green hover:text-white dark:border-cs_light"
              name="filter"
            />
          </div>
        </div>
        {/* Product */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 3xl:grid-cols-5">
          {currentData.map((item, index) => (
            <Link to={'/'} key={index}>
              <ProductList data={item} index={index} />
            </Link>
          ))}
        </div>

        {/* Phân trang */}
        <div className="my-4 flex justify-center">
          <ReactPaginate
            className="flex"
            breakLabel="..."
            pageCount={totalPages}
            onPageChange={handlePageChange}
            previousLabel={''}
            nextLabel={''}
            activeClassName={pageClassNames.active}
            pageClassName={pageClassNames.page}
          />
        </div>
      </div>
    </>
  );
}

export default Categories;
