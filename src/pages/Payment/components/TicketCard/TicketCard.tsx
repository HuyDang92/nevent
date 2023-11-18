import { Tooltip } from '@material-tailwind/react';
import Icon from '~/components/customs/Icon';
interface TicketCardProps {
  title: string;
  tooltip: string;
  className?: string;
  color?: string;
  price?: number;
  remove?: (ticket: TicketListInfo) => void;
}
const TicketCard = ({ title, tooltip, className, color = '#13C6B3', price, remove }: TicketCardProps) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`relative flex w-fit items-center justify-between gap-1 rounded-xl px-4 py-2 text-center font-semibold text-white ${className}`}
    >
      {title}{' '}
      <Tooltip
        className="bg-white shadow-lg"
        content={
          <div className="w-fit text-black">
            <div>{tooltip}</div>
            {price && <div>Giá vé: {price.toLocaleString('vi')} VNĐ</div>}
          </div>
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 cursor-pointer text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </Tooltip>
      {remove && (
        <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-[1px] bg-cs_semi_green ">
          <Icon onClick={remove} name="close-outline" className="text-white" />
        </div>
      )}
    </div>
  );
};

export default TicketCard;
