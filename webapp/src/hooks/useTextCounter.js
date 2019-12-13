/* -- libs -- */
import { useState } from 'react';
import PropTypes from 'prop-types';

const useTextCounter = (limit = 100) => {
  const [hasExceededLimit, setHasExceededLimit] = useState(false);
  const [textLength, setTextLength] = useState(0);

  const countTextLength = value => {
    setTextLength(value.length);
    setHasExceededLimit(value.length > limit);
  };

  return { hasExceededLimit, textLength, countTextLength };
};

useTextCounter.propTypes = {
  maxChar: PropTypes.number.isRequired,
};
export default useTextCounter;
