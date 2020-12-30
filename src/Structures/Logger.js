const getTime = () => {
  var currentdate = new Date();
  var time =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return time;
};
module.exports = class Logger {
  error(err) {
    console.log(`\u001b[31m[${getTime()} - Error] ||\u001b[39m ${err}\u001b[0m`);
  }

  info(str) {
    console.log(`\u001b[36m[${getTime()} - Info]  ||\u001b[39m ${str}\u001b[0m`);
  }

  debug(str) {
    console.log(`\u001b[33m[${getTime()} - Debug] ||\u001b[39m ${str}\u001b[0m`);
  }
};
