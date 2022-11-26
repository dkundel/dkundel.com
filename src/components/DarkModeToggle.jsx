import React, {useState, useEffect} from 'react'; 
import Moon from '@heroicons/react/24/outline/MoonIcon';
import Sun from '@heroicons/react/24/outline/SunIcon';

const iconClasses = 'h-5 w-5 dark:text-gray-400 dark:hover:text-gray-100 hover:text-secondaryGreen-500'

const DarkModeToggle = ({...props}) => {
  const [isDarkMode, setIsDarkMode] = useState(null);
  
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, [])

  function toggleDarkMode() {
    const htmlClasses = document.documentElement.classList;
    if (!htmlClasses.contains('dark')) {
      htmlClasses.add('dark')
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark')
    } else {
      htmlClasses.remove('dark');
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light')
    }
  }

  return <button {...props} onClick={toggleDarkMode} aria-label="Toggle dark mode">
    { isDarkMode === null ? null : isDarkMode ? <Sun className={iconClasses} /> : <Moon className={iconClasses} /> }
  </button>
}

export default DarkModeToggle;