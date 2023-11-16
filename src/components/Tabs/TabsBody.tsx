import React from 'react';
import { TabsBodyProp, TabsContent } from '~/Types/components/tab';

const TabsBody = ({ className, children, orientation, activeTab }: TabsBodyProp) => {
  return (
    <div className={`${className} relative rounded-[10px] overflow-hidden shadow-border-inset dark:bg-cs_dark`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            orientation,
            activeTab,
          } as TabsContent);
        }
        return null;
      })}
    </div>
  );
};

export default TabsBody;
