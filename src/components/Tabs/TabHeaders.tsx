import React from 'react';
import { TabProp } from '~/Types/components/tab';
import { TabsHeaderProp } from '~/Types/components/tab';

const TabsHeader = ({ className, children, orientation, activeTab, setActiveTab }: TabsHeaderProp) => {
  const tabsWidth = orientation == 'horizontal' ? 100 : 100 / React.Children.count(children);
  return (
    <ul
      className={`relative flex rounded-[25px] shadow-border-full ${
        orientation == 'horizontal' ? 'flex-col' : 'flex-row'
      } ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            width: tabsWidth,
            activeTab,
            setActiveTab,
          } as TabProp);
        }
        return null;
      })}
      <li
        style={{
          width: orientation == 'horizontal' ? '100%' : `${100 / React.Children.count(children)}%`,
          transform:
            orientation == 'horizontal'
              ? `translateY(${activeTab && activeTab * 100}%)`
              : `translateX(${activeTab && activeTab * 100}%)`,
        }}
        className={`absolute flex h-10 items-center justify-center rounded-[15px] bg-cs_semi_green transition-all md:h-12`}
      ></li>
    </ul>
  );
};

export default TabsHeader;
