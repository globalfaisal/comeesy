/* -- libs -- */
import { useState } from 'react';

const useForceUpdate = () => {
  const [state, setState] = useState(false);
  const forceUpdate = () => {
    setState(prevState => !prevState);
  };
  return {
    forceUpdate,
    state,
  };
};

export default useForceUpdate;
