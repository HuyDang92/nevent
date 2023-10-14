import { useState } from 'react';
interface TabsProp {
  tabHeaders: React.ReactNode[] | string[];
  tabContent: React.ReactNode[];
  className?: string;
  vertical?: boolean;
}
/**
 * Renders a set of tabs with corresponding content.
 *
 * @param {TabsProp} tabHeaders - The array of tab headers.
 * @param {TabsProp} tabContent - The array of tab content.
 * @param {string} className - The CSS class for the tabs container.
 * @param {boolean} vertical - Whether the tabs are displayed vertically (default: false).
 * @returns {JSX.Element} The rendered tabs component.
 */
const Tabs = ({ tabHeaders, tabContent, className, vertical = false }: TabsProp) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabHeaderWidth = vertical ? `${100 / tabHeaders.length}%` : '100%';
  // const tabContentWidth = vertical ? '75%' : '100%';

  return (
    <div className={`flex gap-5 ${vertical ? 'flex-col' : 'flex-row'} ${className}`}>
      <div className={`${vertical ? 'w-full' : 'w-[35%]'}`}>
        <ul className={`relative flex rounded-[10px] shadow-border-full ${vertical ? 'flex-row' : 'flex-col'}`}>
          {tabHeaders.map((header, index: number) => (
            <li
              key={index}
              onClick={() => setTabIndex(index)}
              style={{ width: tabHeaderWidth }}
              className={`flex h-10 items-center justify-between rounded-[10px] px-8 text-[12px] md:h-12 md:text-[18px] ${
                tabIndex === index ? 'text-white' : ''
              } z-10`}
            >
              {header}
            </li>
          ))}
          <li
            style={{
              width: tabHeaderWidth,
              transform: vertical ? `translateX(${tabIndex * 100}%)` : `translateY(${tabIndex * 100}%)`,
            }}
            className={`absolute flex h-10 items-center justify-center rounded-[10px] bg-cs_dark transition-all md:h-12`}
          ></li>
        </ul>
      </div>
      <div className={`relative rounded-[10px] shadow-border-full md:p-3 ${vertical ? 'w-full' : 'w-[75%]'}`}>
        {tabContent[tabIndex]}
      </div>
    </div>
  );
};

export default Tabs;
