/* -- libs -- */
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import numeral from 'numeral';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/* ------------------------------------------------------ */
/* TOKEN VALIDATOR */
/* ------------------------------------------------------ */

/**
 * Checks user auth status
 * @param  {string} token - jwt id token
 * @returns true if valid else false
 */
export const validateToken = token => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now().valueOf() / 1000;
    return decodedToken.exp > currentTime; // valid
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saves token to localstorage
 * @param {string} token - jwt id token
 */
export const storeToken = token => {
  window.localStorage.setItem('token', token);
};

/**
 * Clear token from localstorage
 */
export const clearToken = () => {
  window.localStorage.removeItem('token');
};

/**
 * Get token from localstorage
 */
export const getStoredToken = () => window.localStorage.token;

/* ------------------------------------------------------ */
/* DATE FORMAT HELPERS */
/* ------------------------------------------------------ */

/**
 * Formats date to relative time strings (e.g. 3 hours ago).
 * @param {string} dateString
 * @returns The string of relative time from now.
 */
export const formatDateToRelTime = dateString => {
  if (!dateString) return null;

  dayjs.extend(relativeTime);
  return dayjs(dateString).fromNow();
};

/**
 * Formats date to [MMMM YYYY]
 * @param {string} dateString
 * @returns Formated date.
 */
export const formatToMonthYear = dateString => {
  if (!dateString) return null;
  return dayjs(dateString).format('MMMM YYYY');
};

/**
 * Formats date to [MMMM DD, YYYY]
 * @param {string} dateString
 * @returns Formated date.
 */
export const formatToMonthDayYear = dateString => {
  if (!dateString) return null;
  return dayjs(dateString).format('MMMM DD, YYYY');
};

/**
 * Formats date to [YYYY-MM-DD]
 * @param {string} dateString
 * @returns Formated date.
 */
export const formatToYearMonthDay = dateString => {
  if (!dateString) return null;
  return dayjs(dateString).format('YYYY-MM-DD');
};

/**
 * Subtracts Day or Days(number) from Today's date
 * @param {string} dateString
 * @returns Formated date.
 */
export const subtractDateFromToday = num => {
  if (!num) return null;
  return dayjs().subtract(num, 'year');
};

/* ------------------------------------------------------ */
/* OTHER HELPERS */
/* ------------------------------------------------------ */

/**
 * Checks if every value of the given object
 * is falsy value
 * @param obj - data object
 * @returns {boolean}
 */
export const hasEmptyValues = obj => _.values(obj).every(_.isEmpty);

/**
 * Shorten number to thousands, millions, billions, etc.
 * @param {number} num
 * @returns {string|number}
 */
export const shortenNumbers = num => {
  if (!num) return num;
  return numeral(num).format('1a');
};
