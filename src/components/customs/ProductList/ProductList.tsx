import { useState, useEffect } from 'react';
import ProductCard from '~/components/customs/ProductCard';
import Button from '~/components/customs/Button';
import Box from '@mui/joy/Box';
import { motion } from 'framer-motion';

type ProductData = {
  image: string;
  title: string;
  date: string;
  category: string;
  link?: string;
  place: string;
};

type ProductListProps = {
  visibleProduct?: number; // số lượng sản phẩm hiện trên trang
  showMore?: number; // số lượng sp hiện thêm khi bấm vào nút 'xem thêm'
  data: ProductData[]; //dữ liệu
  className?: string;
};

const ProductList = ({ visibleProduct = 12, showMore = 8, data, className }: ProductListProps) => {
  const [visibleProducts, setVisibleProducts] = useState(visibleProduct); // Số lượng sản phẩm hiển thị ban đầu

  const showMoreProducts = () => {
    setVisibleProducts(visibleProducts + showMore); // Tăng số sản phẩm hiển thị thêm khi nhấp vào "Xem thêm"
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 520) {
        setVisibleProducts(6);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const productUI = data.slice(0, visibleProducts).map((item, index) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3 * (index / 5),
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <ProductCard
        key={index}
        id={index}
        place={item.place}
        image={item.image}
        name={item.title}
        date={item.date}
        category={item.category}
        link="/event-detail/1"
        className="!min-w-[70%] sm:w-full"
      />
    </motion.div>
  ));

  return (
    <div className={`${className}`}>
      <div className="hidden sm:block">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{productUI}</div>
        {visibleProducts < data.length && (
          <div className="mt-5 flex justify-center">
            <Button className="" onClick={showMoreProducts} value="Xem thêm" />
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflow: 'auto',
            width: '100%',
            scrollSnapType: 'x mandatory',
            '& > *': {
              scrollSnapAlign: 'center',
            },
            '::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {productUI}
        </Box>
      </div>
    </div>
  );
};
export default ProductList;
