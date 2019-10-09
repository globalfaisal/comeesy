/* -- libs -- */
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useAuthForm = action => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  const handleChange = event => {
    event.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    if (event) event.preventDefault();
    dispatch(action(inputs));
  };
  return {
    inputs,
    handleChange,
    handleSubmit,
  };
};

export default useAuthForm;
