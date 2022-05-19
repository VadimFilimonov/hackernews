// eslint-disable-next-line import/prefer-default-export
const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;

export const convertTimestampToRelativeTime = (timestamp) => {
  const now = new Date().getTime();
  const diff = timestamp * 1000 - now;
  const seconds = Math.trunc(diff / 1000);
  let value;
  let unit;
  if (Math.abs(seconds) < SECONDS_PER_MINUTE) {
    value = seconds;
    unit = 'seconds';
  } else if (Math.abs(seconds) < SECONDS_PER_HOUR) {
    value = Math.floor(seconds / SECONDS_PER_MINUTE);
    unit = 'minute';
  } else if (Math.abs(seconds) < SECONDS_PER_DAY) {
    value = Math.floor(seconds / SECONDS_PER_HOUR);
    unit = 'hour';
  } else {
    value = Math.floor(seconds / SECONDS_PER_DAY);
    unit = 'day';
  }

  return rtf.format(value, unit);
};

export const convertTimestampToDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};
