import React from 'react';
import { TabProp } from '~/Types/components/tab';
import { TabsHeaderProp } from '~/Types/components/tab';
// import { useCurrentViewportView } from '~/hooks/useViewPort';

const TabsHeader = ({ className, children, orientation, activeTab, setActiveTab }: TabsHeaderProp) => {
  const tabsWidth = orientation == 'horizontal' ? 100 : 100 / React.Children.count(children);
  // const { width } = useCurrentViewportView();

  return (
    <ul
      className={`relative flex h-fit gap-1 rounded-[18px] p-4 shadow-border-full dark:border-2 ${
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
          // width:
          //   orientation == 'horizontal'
          //     ? 'calc(100% - 32px)'
          //     : `${width < 550 ? 93 / React.Children.count(children) : 95 / React.Children.count(children)}%`,
          width:
            orientation == 'horizontal'
              ? 'calc(100% - 32px)'
              : `calc((100% - 32px) / ${React.Children.count(children)} - 4px)`,
          transform:
            orientation == 'horizontal'
              ? `translateY(${activeTab && activeTab * 108}%)`
              : `translateX(calc(${activeTab && activeTab * 100}% + ${activeTab && activeTab * 5}px))`,
        }}
        className={`absolute flex h-10 w-fit items-center justify-center rounded-[15px] border bg-cs_semi_green transition-all md:h-12`}
      ></li>
    </ul>
  );
};

export default TabsHeader;
