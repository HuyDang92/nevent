import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import Icon from '~/components/customs/Icon';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import { useGetAllEventQuery, useGetLocationsQuery } from '~/features/Event/eventApi.service';
import ProductCard from '~/components/EventCard/EventCard';
import SkeletonEventList from '~/components/customs/Skeleton/SkeletonEventList';
import nothing from '~/assets/images/nothing.svg';

function Categories() {
  const { keyword, idCate } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cate, setCate] = useState<string>('');
  const [locationId, setLocationId] = useState<string>('');
  const [filterNameCate, setFilterNameCate] = useState<string[]>([]); // Mảng lưu các mục đã chọn
  // const [selectedDate, setSelectedDate] = useState<string>('');

  const categories = useGetAllCategoryQuery();
  const locations = useGetLocationsQuery();
  const event = useGetAllEventQuery({
    page: currentPage,
    limit: 12,
    search: keyword,
    location: locationId,
    status: 'UPCOMING',
    categories: cate,
    // start_date: selectedDate,
  });

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (idCate) {
      if (filterNameCate.includes(idCate)) {
        // Nếu có, loại bỏ nó khỏi mảng
        setFilterNameCate(filterNameCate.filter((id) => id !== idCate));
      } else {
        // Nếu chưa có, thêm nó vào mảng
        setFilterNameCate([...filterNameCate, idCate]);
      }
    }
  }, [idCate]);
  useEffect(() => {
    if (filterNameCate.length > 0) {
      setCate(filterNameCate.join(''));
    }
  }, [filterNameCate.length]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // const handleFilterDate = (value: any) => {
  //   if (value === 'Hôm nay') {
  //     const today = new Date();
  //     const timestamp = today.toISOString(); // Lấy thời gian hiện tại dưới dạng chuỗi
  //     setSelectedDate(timestamp);
  //   } else if (value === 'Ngày mai') {
  //     const tomorrow = new Date();
  //     tomorrow.setDate(tomorrow.getDate() + 1);
  //     const timestamp = tomorrow.toISOString(); // Lấy thời gian hiện tại dưới dạng chuỗi
  //     setSelectedDate(timestamp);
  //   } else {
  //     setSelectedDate('');
  //   }
  // };
  const handleCategoryClick = (categoryId: string) => {
    // Kiểm tra xem categoryId đã tồn tại trong mảng filterNameCate chưa
    const cates = `&categories=${categoryId}`;
    if (filterNameCate.includes(cates)) {
      // Nếu có, loại bỏ nó khỏi mảng
      setFilterNameCate(filterNameCate.filter((id) => id !== cates));
    } else {
      // Nếu chưa có, thêm nó vào mảng
      setFilterNameCate([...filterNameCate, cates]);
    }
  };
  const pageClassNames = {
    page: 'mx-2 px-3.5 py-1.5 text-cs_semi_green border text-sm hover:scale-105 transition-all rounded-xl shadow-border-full font-bold',
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
          <div className="flex flex-wrap gap-2 xl:w-2/3">
            {categories?.data?.data.map((item: ICategory, index: number) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(item._id)}
                className={`z-10 rounded-full border border-cs_semi_green bg-white px-3 py-1 text-[13px] font-medium text-cs_semi_green transition-all dark:bg-cs_lightDark ${
                  filterNameCate.includes(`&categories=${item._id}`) ? '!bg-cs_semi_green text-white' : ''
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
              <select
                onChange={(e) => setLocationId(e.target.value)}
                className="bg-cs_light px-1 py-2.5 text-cs_semi_green outline-none dark:bg-cs_lightDark"
              >
                <option value="">Tất cả địa điểm</option>
                {locations?.data?.data?.map((item: ILocation, index: number) => (
                  <option key={index} className="p-2" value={item?._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="flex w-fit items-center gap-1 overflow-hidden rounded-xl bg-cs_light px-3 shadow-border-full dark:border dark:bg-cs_lightDark">
              <Icon className=" text-xl text-cs_semi_green transition-all dark:border-cs_light" name="cash" />
              <select className="bg-cs_light px-1 py-2.5  text-cs_semi_green outline-none dark:bg-cs_lightDark">
                <option className="p-2" value="">
                  Tất cả giá vé
                </option>
                <option className="p-2" value="">
                  Miễn phí
                </option>
                <option className="p-2" value="">
                  Có phí
                </option>
              </select>
            </div> */}
            {/* <div className="flex w-fit items-center gap-1 overflow-hidden rounded-xl bg-cs_light px-3 shadow-border-full dark:border dark:bg-cs_lightDark">
              <Icon className=" text-xl text-cs_semi_green transition-all dark:border-cs_light" name="calendar" />
              <select className="bg-cs_light px-1 py-2.5 text-cs_semi_green outline-none dark:bg-cs_lightDark">
                <option className="p-2" value="">
                  Tất cả ngày sắp tới
                </option>
                <option className="p-2" value="Hôm nay">
                  Hôm nay
                </option>
                <option className="p-2" value="Ngày mai">
                  Ngày mai
                </option>
                <option className="p-2" value="Tuần này">
                  Tuần này
                </option>
                <option className="p-2" value="Tháng này">
                  Tháng này
                </option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="px-1 pt-2 text-[#ccc]">
          Đang hiển thị: <span className="font-semibold text-cs_semi_green">{event.data?.data?.docs?.length}</span>
        </div>
        {/* Product */}
        {event.isFetching && <SkeletonEventList />}
        {event.data?.data?.docs?.length === 0 && (
          <div className="mt-32 flex justify-center text-center">
            <div>
              <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
              <h3 className="font-medium text-[#ccc]">Không có sự kiện</h3>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 3xl:grid-cols-5">
          {!event.isFetching &&
            event.data?.data?.docs.map((item: IEvent, index: number) => (
              <ProductCard key={index} data={item} index={index} />
            ))}
        </div>

        {/* Phân trang */}
        {event.data?.data?.docs?.length !== 0 && (
          <div className="my-4 flex justify-center">
            <ReactPaginate
              className="flex items-center"
              breakLabel="..."
              pageCount={event.data?.data?.totalPages}
              onPageChange={handlePageChange}
              previousLabel={<Icon className="px-2.5 pb-1 pt-2.5  text-sm" name="chevron-back-outline" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Previous"
              nextLabel={<Icon className="px-2.5 pb-1 pt-2.5 text-sm" name="chevron-forward-outline" />} // Sử dụng icon và lớp CSS tùy chỉnh cho "Next"
              previousClassName={pageClassNames.previous}
              nextClassName={pageClassNames.next}
              activeClassName={pageClassNames.active}
              pageClassName={pageClassNames.page}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Categories;
