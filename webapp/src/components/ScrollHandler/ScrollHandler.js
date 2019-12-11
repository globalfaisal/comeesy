/* -- libs -- */
import { useEffect } from 'react';

/* -- utils -- */
import history from '../../utils/history';

const ScrollHandler = () => {
  const { location } = history;
  useEffect(() => {
    const element = document.getElementById(location.hash);

    setTimeout(() => {
      window.scrollTo({
        behavior: element ? 'smooth' : 'auto',
        top: element ? element.offsetTop : 0,
      });
    }, 100);
  }, [location]);

  return null;
};

export default ScrollHandler;
