const blacklist = require('react-native/packager/blacklist');

var blacklistFiles = [
  /shareit\/node_modules\/.+\/node_modules\/fbjs\/.*/
];

module.exports = {
  getBlacklistRE() {
    return blacklist('', blacklistFiles);
  }
};
