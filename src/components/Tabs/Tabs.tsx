import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TabsProp, TabsHeaderProp, TabsBodyProp } from '~/Types/components/tab';

const Tabs = ({ children, className, orientation = 'vertical', availableLink = false }: TabsProp) => {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(availableLink ? Number(tab) : 0);
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
