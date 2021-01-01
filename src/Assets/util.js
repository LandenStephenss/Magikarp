module.exports = {
  parseTime: require("./ParseTime.js"),
  formatNumber: require("./FormatNumber.js"),
  databaseUtil: require("./DatabaseUtil.js"),
  numberBetween: (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
};
