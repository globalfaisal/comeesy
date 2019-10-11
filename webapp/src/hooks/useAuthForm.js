/* -- libs -- */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/* -- actions -- */
import { clearErrors } from '../actions/uiActions';

const useAuthForm = callback => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  // Clear form errors
  useEffect(() => {
    dispatch(clearErrors());
  }, []);

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
