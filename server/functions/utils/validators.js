const validator = require('validator');

exports.validateLoginData = data => {
  const errors = {};

  if (validator.isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!validator.isEmail(data.email))
    errors.email = 'Must be a valid email address';
  if (validator.isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignupData = data => {
  const errors = {};
  if (validator.isEmpty(data.name)) errors.name = 'Must not be empty';

  if (validator.isEmpty(data.username)) errors.username = 'Must not be empty';

  if (validator.isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!validator.isEmail(data.email))
    errors.email = 'Must be a valid email address';

  if (validator.isEmpty(data.password)) errors.password = 'Must not be empty';
  if (validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = 'Must not be empty';
  if (!validator.equals(data.password, data.confirmPassword))
    errors.confirmPassword = 'Password must match';

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateUserDetails = data => {
  const errors = {};
  // required fields
  if (!data.name || validator.isEmpty(data.name))
    errors.name = 'Must not be empty';

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
    isEmptyData: Object.keys(data).length === 0 ? true : false,
  };
};

exports.validateCredentialsData = data => {
  const errors = {};
  // required fields
  if (validator.isEmpty(data.oldPassword))
    errors.oldPassword = 'Must not be empty';
  if (validator.isEmpty(data.newPassword))
    errors.newPassword = 'Must not be empty';
  if (validator.isEmpty(data.confirmNewPassword))
    errors.confirmNewPassword = 'Must not be empty';

  if (!validator.equals(data.newPassword, data.confirmNewPassword))
    errors.confirmPassword = 'Password must match';

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateBodyContent = content => {
  let error = '';
  if (typeof content === 'string' && validator.isEmpty(content))
    error = 'Must not be empty';
  else if (Array.isArray(content) && content.length === 0)
    error = 'Must not be empty';
  return {
    error,
    isValid: error === '' ? true : false,
  };
};

exports.validateImageFile = (file, size, mimetype) => {
  const maxFileSizeAllowed = 2097152; // 2Mb
  const acceptedFileTypes = ['image/jpeg', 'image/png'];
  let error = '';

  if (!file) error = 'Upload failed. Invalid file submitted';
  else if (file && !acceptedFileTypes.includes(mimetype))
    error = 'Upload failed. Please submit either a .png or .jpeg image';
  if (file && size - 100 >= maxFileSizeAllowed)
    error = 'Upload failed. Please submit a file less than 2MB';

  return {
    error,
    isValid: error === '' ? true : false,
  };
};
