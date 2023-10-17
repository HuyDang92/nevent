import React, { useState } from 'react';
import { TabsProp, TabsHeaderProp, TabsBodyProp } from '~/Types/components/tab';

const Tabs = ({ children, className, orientation = 'vertical' }: TabsProp) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className={`flex gap-5 ${orientation == 'horizontal' ? 'flex-row' : 'flex-col'} ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            orientation,
            activeTab,
            setActiveTab,
          } as TabsHeaderProp | TabsBodyProp);
        }
        return null;
      })}
    </div>
  );
};

export default Tabs;
