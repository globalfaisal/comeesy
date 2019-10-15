import jwtDecode from 'jwt-decode';

/**
 * Checks user auth status
 * @param token - jwt id token
 * @returns true if valid else false
 */
export default token => {
  if (!token) return;
  try {
    const decodedToken = jwtDecode(token);
    return isValid(decodedToken.exp);
  } catch (error) {
    console.error(error);
  }
};

const isValid = exp => {
  const expTime = exp * 1000;
  return !(expTime < Date.now());
};
