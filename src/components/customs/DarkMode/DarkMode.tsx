import { useState, useEffect } from 'react';
import Icon from '../Icon';
const ToggleDarkMode = ({ hidden }: any) => {
  const [checked, setChecked] = useState(false);

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
        <label htmlFor="check" hidden={hidden}>
          <p className=" hidden text-cs_semi_green dark:block">
            <Icon name="sunny" className="text-2xl hover:scale-110" />
          </p>
          <p className=" text-cs_semi_green dark:hidden">
            <Icon name="moon" className="text-2xl hover:scale-110 dark:hidden" />
          </p>
        </label>
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
