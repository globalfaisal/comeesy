/* -- libs -- */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

export const formatToMonthYear = dateString => {
  if (!dateString) return null;
  return dayjs(dateString).format('MMMM YYYY');
};

export const formatToMonthDayYear = dateString => {
  if (!dateString) return null;
  return dayjs(dateString).format('MMMM DD, YYYY');
};

export const formatToYearMonthDay = dateString => {
  if (!dateString) return null;
  return dayjs(dateString).format('YYYY-MM-DD ');
};

export const subtractFromToday = num => {
  if (!num) return null;
  return dayjs().subtract(num, 'year');
};
