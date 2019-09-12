const validator = require('validator');

const validateUser = {
  signIn: user => {
    const singInErrors = {}

    if(validator.isEmpty(user.email)) singInErrors.email = 'Must not be empty';
    if(validator.isEmpty(user.password)) singInErrors.password = 'Must not be empty';
    
    return singInErrors;
  },
  singUp: user => {
    const singUpErrors = {}
    if(validator.isEmpty(user.username)) singUpErrors.username = 'Must not be empty';
  
    if(validator.isEmpty(user.email)) singUpErrors.email = 'Must not be empty';
    else if(!validator.isEmail(user.email)) singUpErrors.email = 'Must be a valid email address';
    
    if(validator.isEmpty(user.password)) singUpErrors.password = 'Must not be empty';
    if(!validator.equals(user.password, user.confirmPassword)) singUpErrors.confirmPassword = 'Password must match';
  
    return singUpErrors;
  },
};

module.exports = validateUser;