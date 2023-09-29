import { useEffect, useState } from 'react';
type TabsProp = {
  tabHeader: string[];
  tabConent: string[];
  className?: string;
};
const Tabs = ({ tabHeader, tabConent, className }: TabsProp) => {
  const [tabIndex, setTabIndex] = useState(0); // Set index của nội dung cần show
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState(false); // Trạng thái của nút Xem thêm
  const [showHideBtn, setShowHideBtn] = useState(false); // Trạng thái của nút ẩn bớt
  useEffect(() => {
    const contentElement = document.getElementById('content') as HTMLDivElement;
    if (contentElement.scrollHeight > 500) {
      setShowSeeMoreBtn(true);
    } else {
      setShowSeeMoreBtn(false);
    }
    return () => {};
  }, [tabIndex]);
  const handleSeeMoreClick = () => {
    const contentElement = document.getElementById('content') as HTMLDivElement;
    contentElement.style.maxHeight = 'none';
    setShowSeeMoreBtn(false);
    setShowHideBtn(true);
  };
  const handleHideBtn = () => {
    const contentElement = document.getElementById('content') as HTMLDivElement;
    contentElement.style.maxHeight = '500px';
    setShowSeeMoreBtn(true);
    setShowHideBtn(false);
  };
  return (
    <div className={`${className}`}>
      <div>
        <ul className="relative flex h-10 md:h-12 rounded-[10px] shadow-border-full">
          {tabHeader.map((header: string, index: number) => (
            <li
              key={index}
              onClick={() => setTabIndex(index)}
              style={{width: `${100 / tabHeader.length}%`}}
              className={`text-[12px] md:text-[18px] flex items-center justify-center rounded-[10px] ${
                tabIndex === index ? 'text-white' : ''
              } z-10`}  
            >
              {header}
            </li>
          ))}
          <li
            style={{width: `${100 / tabHeader.length}%`, transform: `translateX(${tabIndex * 100}%)` }}
            className={`absolute h-full bg-cs_purple transition-all flex items-center justify-center rounded-[10px]`}
          ></li>
        </ul>
      </div>
      <div className="relative md:p-3">
        <div id="content" className="max-h-[500px] overflow-hidden">
          {tabConent.find((content, index) => index === tabIndex)}
        </div>
        {showSeeMoreBtn && (
          <div className="bg absolute bottom-[-30px] flex h-[90px] w-full items-end justify-center bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(182,182,182,0.5)] to-[rgba(182,182,182,0.5)] p-[10px] font-bold text-cs_purple">
            <button onClick={handleSeeMoreClick}>Xem thêm</button>
          </div>
        )}
        {showHideBtn && (
          <div className="bg absolute bottom-[-30px] flex h-[90px] w-full items-end justify-center bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(182,182,182,0.5)] to-[rgba(182,182,182,0.5)] p-[10px] font-bold text-cs_purple">
            <button onClick={handleHideBtn}>Ẩn bớt</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
