import React, { useEffect, useRef, useState } from 'react';
import { TabProp } from '~/Types/components/tab';
import { TabsHeaderProp } from '~/Types/components/tab';
interface Padding {
  x: number;
  y: number;
}
const TabsHeader = ({ className, children, orientation, activeTab, setActiveTab }: TabsHeaderProp) => {
  const elementRef = useRef(null);
  
  const [headersTabpadding, setHeadersTabPadding] = useState<Padding>({ x: 0, y: 0 });
  const tabsWidth = orientation == 'horizontal' ? 100 : 100 / React.Children.count(children);
  useEffect(() => {
    // Get the DOM element
    const element = elementRef.current;

    if (element) {
      // Get the computed style of the element
      const computedStyle = window.getComputedStyle(element);

      // Access the padding values
      const paddingTop = computedStyle.getPropertyValue('padding-top');
      const paddingRight = computedStyle.getPropertyValue('padding-right');
      const paddingBottom = computedStyle.getPropertyValue('padding-bottom');
      const paddingLeft = computedStyle.getPropertyValue('padding-left');
      setHeadersTabPadding({
        x: Number(paddingRight.split('px')[0]) + Number(paddingLeft.split('px')[0]),
        y: Number(paddingTop.split('px')[0]) + Number(paddingBottom.split('px')[0]),
      });
    }
  }, []);
  return (
    <ul
      ref={elementRef}
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
          width:
            orientation == 'horizontal'
              ? `calc(100% - ${headersTabpadding.x}px)`
              : `calc(${tabsWidth}% - ${headersTabpadding.x / React.Children.count(children)}px)`,
          transform:
            orientation == 'horizontal'
              ? `translateY(${activeTab && activeTab * 100}%)`
              : `translateX(calc(${activeTab && activeTab * 100}%)`,
        }}
        className={`absolute flex h-10 w-fit items-center justify-center rounded-[12px] bg-cs_light shadow-border-light transition-all dark:bg-cs_lightDark md:h-12`}
      ></li>
    </ul>
  );
};

export default TabsHeader;
