import { Link } from 'react-router-dom';
import Button from '../Button';
import Chamaleon1 from '~/assets/images/chamaleon-1.svg';
import Chamaleon2 from '~/assets/images/chamaleon-2.svg';
type RecommendCardProps = {
  className?: string;
  theme_color: 'green' | 'yellow';
  title: string;
  sale: string;
  price: number;
};
const RecommendCard = ({ className, theme_color = 'green', title, sale, price }: RecommendCardProps) => {
  return (
    <>
      <div
        className={`relative w-full rounded-xl p-4 ${className} ${
          theme_color === 'green' ? 'bg-cs_leaf-400' : 'bg-cs_yellow-300'
        }`}
      >
        <div className="flex w-full justify-between">
          <h3 className="mt-1 font-bold text-white">{title}</h3>
          <span className="text-5xl font-bold text-white">{sale}%</span>
        </div>
        <p className="mb-6 mt-2 text-xl text-white">{price.toLocaleString()}đ</p>
        <Link to="/">
          <Button
            value="Mua ngay"
            className={`w-[70%] ${
              theme_color === 'green' ? '!bg-cs_leaf-500' : '!bg-cs_yellow-500'
            } text-white shadow-none`}
            rounded_full={false}
          />
        </Link>
        <img
          src={theme_color === 'green' ? Chamaleon1 : Chamaleon2}
          alt="tacke"
          className="absolute -bottom-5 -right-5"
        />
      </div>
    </>
  );
};
export default RecommendCard;
