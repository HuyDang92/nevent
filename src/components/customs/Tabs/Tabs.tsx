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
    // Tạo một observer để theo dõi thay đổi trong nội dung content
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // Khi nội dung thay đổi, kiểm tra chiều cao và hiển thị nút "Xem thêm" nếu cần
          if (contentElement.scrollHeight > 1024) {
            setShowSeeMoreBtn(true);
          } else {
            setShowSeeMoreBtn(false);
          }
        }
      }
    });

    observer.observe(contentElement, { childList: true });

    return () => {
      // Ngừng theo dõi khi unmount component
      observer.disconnect();
    };
  }, []);
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
      <div className="relative p-3">
        <div id="content" className="max-h-[500px] overflow-hidden">
          {tabConent.find((content, index) => index === tabIndex)}
        </div>
        {showSeeMoreBtn && (
          <div className="bg absolute bottom-[-30px] flex h-[90px] w-full items-end justify-center bg-gradient-to-b from-[rgba(255,255,255,0.8)] via-[rgba(182,182,182,0.8)] to-[rgba(182,182,182,0.8)] p-[10px] font-bold text-cs_purple">
            <button onClick={handleSeeMoreClick}>Xem thêm</button>
          </div>
        )}
        {showHideBtn && (
          <div className="bg absolute bottom-[-30px] flex h-[90px] w-full items-end justify-center bg-gradient-to-b from-[rgba(255,255,255,0.8)] via-[rgba(182,182,182,0.8)] to-[rgba(182,182,182,0.8)] p-[10px] font-bold text-cs_purple">
            <button onClick={handleHideBtn}>Ẩn bớt</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
