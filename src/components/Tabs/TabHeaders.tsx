import React from 'react';
import { TabProp } from '~/Types/components/tab';
import { TabsHeaderProp } from '~/Types/components/tab';
import { useCurrentViewportView } from '~/hooks/useViewPort';

const TabsHeader = ({ className, children, orientation, activeTab, setActiveTab }: TabsHeaderProp) => {
  const tabsWidth = orientation == 'horizontal' ? 100 : 100 / React.Children.count(children);
  const currentWidth = useCurrentViewportView();
  console.log(currentWidth);
  const calculateWidth = currentWidth.width < 560 ? 92 : 100;
  return (
    <ul
      className={`relative flex h-fit justify-between rounded-[18px] dark:bg-cs_dark ${
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
          width: orientation == 'horizontal' ? 'calc(100% - 30px)' : `calc((100%) / ${React.Children.count(children)})`,
          transform:
            orientation == 'horizontal'
              ? `translateY(${activeTab && activeTab * 100}%)`
              : `translateX(calc(${activeTab && activeTab * calculateWidth}%))`,
        }}
        className={`absolute flex h-10 w-fit items-center justify-center rounded-[12px] shadow-border-light transition-all dark:bg-cs_lightDark md:h-12`}
      ></li>
    </ul>
  );
};

export default TabsHeader;
