import { useState, useEffect } from 'react';

const useDarkModeToggle = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || getDefaultTheme();
    setTheme(currentTheme);
  }, []);

  const getDefaultTheme = () => {
    return 'light'; // Giá trị mặc định là 'light'
  };

  const setTheme = (theme: any) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setChecked(theme === 'dark');
    localStorage.setItem('theme', theme);
  };

  const handleToggle = () => {
    const newTheme = checked ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    checked,
    handleToggle,
  };
};

export default useDarkModeToggle;
