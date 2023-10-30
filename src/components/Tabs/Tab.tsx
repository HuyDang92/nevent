import { TabProp } from '~/Types/components/tab';
const Tab = ({ className, onClick, index, children, activeTab, setActiveTab, width }: TabProp) => {
  return (
    <li
      onClick={() => {
        onClick && onClick();
        setActiveTab && setActiveTab(index);
      }}
      style={{ width: `${width}%` }}
      className={`h-10 cursor-pointer rounded-[15px] text-[12px] md:h-12 md:px-4 md:text-[16px] ${
        activeTab === index ? 'text-cs_semi_green font-semibold' : ''
      } z-10 ${className}`}
    >
      {children}
    </li>
  );
};

export default Tab;
