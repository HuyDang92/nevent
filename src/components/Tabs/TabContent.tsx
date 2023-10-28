import { TabsContent } from '~/Types/components/tab';

const TabsContent = ({ className, index, children, activeTab }: TabsContent) => {
  return activeTab === index && <div className={`${className} `}>{children}</div>;
};

export default TabsContent;
