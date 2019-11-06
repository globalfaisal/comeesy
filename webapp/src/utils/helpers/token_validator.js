import jwtDecode from 'jwt-decode';

/**
 * Checks user auth status
 * @param token - jwt id token
 * @returns true if valid else false
 */
export default token => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now().valueOf() / 1000;
    return decodedToken.exp < currentTime; // expired
  } catch (error) {
    console.error(error);
  }
};
