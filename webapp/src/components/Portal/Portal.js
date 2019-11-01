/* -- libs -- */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.querySelector('#portal');

const Portal = ({ children }) => {
  const el = document.createElement('div');
  el.classList.add('portal-content');

  useEffect(() => {
    portalRoot.appendChild(el);
    return () => {
      portalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
};

export default Portal;
