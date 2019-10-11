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
