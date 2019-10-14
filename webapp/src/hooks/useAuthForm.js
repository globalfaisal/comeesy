/* -- libs -- */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/* -- actions -- */
import { clearError } from '../actions/UIActions';

const useAuthForm = callback => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  // Clear form errors on componentWillUnmount
  useEffect(
    () =>
      function() {
        dispatch(clearError('form'));
      },
    [dispatch]
  );

  const handleChange = event => {
    event.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    if (event) event.preventDefault();
    dispatch(callback(inputs));
  };
  return {
    inputs,
    handleChange,
    handleSubmit,
  };
};

export default useAuthForm;
