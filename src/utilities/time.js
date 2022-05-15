// eslint-disable-next-line import/prefer-default-export
export const convertTimestampToDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};
