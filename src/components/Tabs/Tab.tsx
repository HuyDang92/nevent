import { TabProp } from '~/Types/components/tab';
const Tab = ({ className, onClick, index, children, activeTab, setActiveTab, width }: TabProp) => {
  return (
    <li
      onClick={() => {
        onClick && onClick();
        setActiveTab && setActiveTab(index);
      }}
      style={{ width: `${width}%` }}
      className={`h-10 cursor-pointer rounded-[15px] text-[12px] md:h-12 md:border md:px-6 md:text-[18px] ${
        activeTab === index ? 'text-white' : ''
      } z-10 ${className}`}
    >
      {children}
    </li>
  );
};

export default Tab;
