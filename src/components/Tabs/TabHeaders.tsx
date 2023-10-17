import React from 'react';
import { TabProp } from '~/Types/components/tab';
import { TabsHeaderProp } from '~/Types/components/tab';

const TabsHeader = ({ className, children, orientation, activeTab, setActiveTab }: TabsHeaderProp) => {
  const tabsWidth = orientation == 'horizontal' ? 100 : 100 / React.Children.count(children);
  return (
    <ul
      className={`relative flex h-fit dark:border-2 gap-1 rounded-[25px] p-4 shadow-border-full ${
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
          width: orientation == 'horizontal' ? 'calc(100% - 32px)' : `${100 / React.Children.count(children)}%`,
          transform:
            orientation == 'horizontal'
              ? `translateY(${activeTab && activeTab * 108}%)`
              : `translateX(${activeTab && activeTab * 100}%)`,
        }}
        className={`absolute flex h-10 w-fit items-center justify-center rounded-[15px] bg-cs_semi_green transition-all md:h-12`}
      ></li>
    </ul>
  );
};

export default TabsHeader;
