import { useState, useEffect } from 'react';
const ToggleDarkMode = ({ children }: any) => {
  const [checked, setChecked] = useState(false);

  console.log(checked);
  
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setChecked(true);
      document.documentElement.classList.add('dark');
    } else {
      setChecked(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggle = () => {
    if (checked) {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
    setChecked(!checked);
  };

  return (
    <div className="px-2">
      <div className="check">
        <input type="checkbox" id="check" name="check" value="check" hidden checked={checked} onChange={handleToggle} />
        <label htmlFor="check">{children}</label>
      </div>
      {/* <label className="label">
            <div className="toggle">
               <input
                  className="toggle-state"
                  type="checkbox"
                  name="check"
                  value="check"
                  checked={checked}
                  onChange={handleToggle}
               />
               <div className="indicator"></div>
            </div>
         </label> */}
    </div>
  );
};

export default ToggleDarkMode;
