/* -- libs -- */
import { useState } from 'react';

const useAuthForm = callback => {
  const [inputs, setInputs] = useState({});

  const handleChange = event => {
    event.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback(inputs);
  };
  return {
    inputs,
    handleChange,
    handleSubmit,
  };
};

export default useAuthForm;
