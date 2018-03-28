module.exports.formatDate = () => {
  const date = new Date();
  date.setTime(date.getTime() + 32400000);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
