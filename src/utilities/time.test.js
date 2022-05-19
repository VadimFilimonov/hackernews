import { convertTimestampToRelativeTime } from './time';

test('convertTimestamp to relativeTime 1', async () => {
  const now = new Date().getTime() / 1000;
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const timestamp1 = now - secondsInMinute;
  const timestamp2 = now - secondsInHour;
  const timestamp3 = now - secondsInDay;
  expect(convertTimestampToRelativeTime(timestamp1)).toEqual('1 min. ago');
  expect(convertTimestampToRelativeTime(timestamp2)).toEqual('1 hr. ago');
  expect(convertTimestampToRelativeTime(timestamp3)).toEqual('1 day ago');
});
