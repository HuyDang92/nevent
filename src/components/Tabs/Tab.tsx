import { TabProp } from '~/Types/components/tab';
const Tab = ({ className, index, children, activeTab, setActiveTab, width }: TabProp) => {
  return (
    <li
      onClick={() => setActiveTab && setActiveTab(index)}
      style={{ width: `${width}%` }}
      className={`h-10 rounded-[15px] px-8 text-[12px] md:h-12 md:text-[18px] ${
        activeTab === index ? 'text-white' : ''
      } z-10 ${className}`}
    >
      {children}
    </li>
  );
};

export default Tab;
