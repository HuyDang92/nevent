import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import Icon from '~/components/customs/Icon';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import { useGetAllEventQuery } from '~/features/Event/eventApi.service';
import ProductCard from '~/components/EventCard/EventCard';
import SkeletonEventList from '~/components/customs/Skeleton/SkeletonEventList';

function Categories() {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = useGetAllCategoryQuery();
  const event = useGetAllEventQuery({ page: currentPage, limit: 16, search: keyword });
  const [filterNameCate, setFilterNameCate] = useState<string[]>([]); // Mảng lưu các mục đã chọn

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const handleCategoryClick = (categoryId: string) => {
    // Kiểm tra xem categoryId đã tồn tại trong mảng filterNameCate chưa
    if (filterNameCate.includes(categoryId)) {
      // Nếu có, loại bỏ nó khỏi mảng
      setFilterNameCate(filterNameCate.filter((id) => id !== categoryId));
    } else {
      // Nếu chưa có, thêm nó vào mảng
      setFilterNameCate([...filterNameCate, categoryId]);
    }
  };
  const pageClassNames = {
    page: 'mx-2 px-4 py-1.5 text-cs_semi_green border text-xl hover:scale-105 transition-all rounded-xl shadow-border-full font-bold',
    active: 'bg-cs_semi_green text-white',
    previous: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-xl shadow-border-full', // Thêm lớp CSS cho nút "Previous"
    next: 'mx-2 hover:scale-105 transition-all text-cs_semi_green border rounded-xl shadow-border-full', // Thêm lớp CSS cho nút "Next"
  };

  return (
    <>
      <div className="">
        <h1 className="text-xl font-bold dark:text-white sm:text-3xl">
          {keyword ? `Tìm kiếm "${keyword}"` : 'Danh mục'}
        </h1>
        <div className="mt-5 items-center justify-between xl:flex">
          {/* Cate tabs */}
          <div className="flex gap-2">
            {categories?.data?.data.map((item: ICategory, index: number) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(item._id)}
                className={`z-10 rounded-full border border-cs_semi_green bg-white px-3 py-1 text-[13px] font-medium text-cs_semi_green transition-all dark:bg-cs_lightDark ${
                  filterNameCate.includes(item._id) ? '!bg-cs_semi_green text-white' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {/* Filter */}
          <div className="gap-4 space-y-2 pt-4 transition-all sm:flex sm:space-y-0 xl:pt-0">
            <div className="flex w-fit items-center gap-1 overflow-hidden rounded-xl bg-cs_light px-3 shadow-border-full dark:border dark:bg-cs_lightDark">
              <Icon className=" text-xl text-cs_semi_green transition-all dark:border-cs_light" name="calendar" />
              <select className="px-1 py-2.5 text-cs_semi_green outline-none dark:bg-cs_lightDark">
                <option value="p-2">Tất cả địa điểm</option>
                <option value="p-2">Hồ chí minh</option>
                <option value="p-2">Hà nội</option>
              </select>
            </div>
            <div className="flex w-fit items-center gap-1 overflow-hidden rounded-xl bg-cs_light px-3 shadow-border-full dark:border dark:bg-cs_lightDark">
              <Icon className=" text-xl text-cs_semi_green transition-all dark:border-cs_light" name="cash" />
              <select className="px-1 py-2.5 text-cs_semi_green outline-none dark:bg-cs_lightDark">
                <option value="p-2">Tất cả giá vé</option>
                <option value="p-2">Miễn phí</option>
                <option value="p-2">Có phí</option>
              </select>
            </div>
            <div className="flex w-fit items-center gap-1 overflow-hidden rounded-xl bg-cs_light px-3 shadow-border-full dark:border dark:bg-cs_lightDark">
              <Icon className=" text-xl text-cs_semi_green transition-all dark:border-cs_light" name="calendar" />
              <select className="px-1 py-2.5 text-cs_semi_green outline-none dark:bg-cs_lightDark">
                <option value="p-2">Tất cả ngày sắp tới</option>
                <option value="p-2">Hôm nay</option>
                <option value="p-2">Ngày mai</option>
                <option value="p-2">Tuần này</option>
                <option value="p-2">Tháng này</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-1 pt-2 text-[#ccc]">
          Đang hiển thị: <span className="font-semibold text-cs_semi_green">{event.data?.data?.docs?.length}</span>
        </div>
        {/* Product */}
        {event.isFetching && <SkeletonEventList />}

        <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 3xl:grid-cols-5">
          {!event.isFetching &&
            event.data?.data?.docs.map((item: IEvent, index: number) => (
              <Link to={'/'} key={index}>
                <ProductCard data={item} index={index} />
              </Link>
            ))}
        </div>

        {/* Phân trang */}
        <div className="my-4 flex justify-center">
          <ReactPaginate
            className="flex items-center"
            breakLabel="..."
            pageCount={event.data?.data?.totalPages}
            onPageChange={handlePageChange}
            previousLabel={<Icon className="px-2.5 pb-1 pt-2.5  text-xl" name="chevron-back-outline" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Previous"
            nextLabel={<Icon className="px-2.5 pb-1 pt-2.5 text-xl" name="chevron-forward-outline" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Next"
            previousClassName={pageClassNames.previous}
            nextClassName={pageClassNames.next}
            activeClassName={pageClassNames.active}
            pageClassName={pageClassNames.page}
          />
        </div>
      </div>
    </>
  );
}

export default Categories;
