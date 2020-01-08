/* -- libs -- */
import { useEffect } from 'react';

/* -- utils -- */
import history from '../../utils/history';

const ScrollHandler = () => {
  const { location } = history;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }, 300);
    return () => {
      window.clearTimeout(timeout);
    };
  });

  return null;
};

export default ScrollHandler;
