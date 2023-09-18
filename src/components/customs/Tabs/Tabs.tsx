import { useState } from 'react';
type TabsProp = {
  tabHeader: string[];
  tabConent: string[];
  className?: string;
};
const Tabs = ({ tabHeader, tabConent, className }: TabsProp) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className={`${className}`}>
      <div>
        <ul className="relative flex h-12 rounded-[10px] shadow-border-full">
          {tabHeader.map((header: string, index: number) => (
            <li
              key={index}
              onClick={() => setTabIndex(index)}
              className={`w-[${100 / tabHeader.length}%] flex items-center justify-center rounded-[10px] ${
                tabIndex === index ? 'text-white' : ''
              } z-10`}
            >
              {header}
            </li>
          ))}
          <li
            style={{ transform: `translateX(${tabIndex * 100}%)` }}
            className={`absolute h-full bg-cs_purple transition-all w-[${
              100 / tabHeader.length
            }%] flex items-center justify-center rounded-[10px]`}
          ></li>
        </ul>
      </div>
      <div className="p-3">{tabConent.find((content, index) => index === tabIndex)}</div>
    </div>
  );
};

export default Tabs;
