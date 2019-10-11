import jwtDecode from 'jwt-decode';

/**
 * Checks user auth status
 */
export const checkTokenStatus = token => {
  const status = {};
  if (token) {
    const decodedToken = jwtDecode(token);
    status.expired = isExpired(decodedToken.exp);
    return status;
  }
  status.expired = null;
  return status;
};

const isExpired = exp => {
  const expTime = exp * 1000;
  return expTime < Date.now();
};
