import { useEffect } from 'react';

const useKeyboardAvoider = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleFocus = (event) => {
        const target = event.target;
        if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest',
            });
          }, 300); // Delay to allow the keyboard to appear
        }
      };

      window.addEventListener('focusin', handleFocus);

      return () => {
        window.removeEventListener('focusin', handleFocus);
      };
    }
  }, []);
};

export default useKeyboardAvoider;
