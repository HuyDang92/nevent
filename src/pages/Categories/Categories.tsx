import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductList from '~/components/ProductCard';
import thumb from '~/assets/images/pro.webp';
import { Link } from 'react-router-dom';
import Icon from '~/components/customs/Icon';
const cate = [
  {
    id: 1,
    name: 'Live Show',
  },
  {
    id: 2,
    name: 'Live Show',
  },
  {
    id: 3,
    name: 'Live Show',
  },
  {
    id: 4,
    name: 'Live Show',
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

function Categories() {
  const [isActive, setIsActive] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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
            {cate.map((item, index) => (
              <button
                key={index}
                onClick={() => setIsActive(item.id)}
                className={`z-10 rounded-full border border-cs_semi_green bg-white px-4 py-1 text-xs text-cs_semi_green transition-all ${
                  isActive === item.id ? '!bg-cs_semi_green text-white' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {/* Filter */}
          <div className="hidden gap-3 sm:flex">
            <div className=" flex cursor-pointer items-center justify-center rounded-lg px-2 py-2 text-xl shadow-border-btn transition hover:bg-cs_icon_black hover:text-white">
              <Icon className="text-cs_semi_green" name="calendar" />
            </div>
            <div className=" flex cursor-pointer items-center justify-center rounded-lg px-2 py-1 text-xl shadow-border-btn transition hover:bg-cs_icon_black hover:text-white">
              <Icon className="text-cs_semi_green" name="cash" />
            </div>
            <div className=" flex cursor-pointer items-center justify-center rounded-lg px-2 py-1 text-xl shadow-border-btn transition hover:bg-cs_icon_black hover:text-white">
              <Icon className="text-cs_semi_green" name="filter" />
            </div>
          </div>
        </div>
        {/* Product */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {currentData.map((item, index) => (
            <Link to={'/'} key={index}>
              {' '}
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
