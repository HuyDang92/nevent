import { useNavigate } from 'react-router-dom';
import { TabProp } from '~/Types/components/tab';
const Tab = ({ className, onClick, index, children, activeTab, setActiveTab, width, link }: TabProp) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        onClick && onClick();
        setActiveTab && setActiveTab(index);
        link && navigate(link);
      }}
      style={{ width: `${width}%` }}
      className={`h-10 cursor-pointer rounded-[15px] text-[12px] md:h-12 md:px-4 md:text-[16px] ${
        activeTab === index ? 'font-semibold text-cs_semi_green' : ''
      } z-10 ${className}`}
    >
      {children}
    </li>
  );
};

export default Tab;
