import { TabsContent } from '~/Types/components/tab';

const TabsContent = ({ className, index, children, activeTab }: TabsContent) => {
  return <div className={`${className} ${activeTab === index ? 'block' : 'hidden'}`}>{children}</div>;
};

export default TabsContent;
