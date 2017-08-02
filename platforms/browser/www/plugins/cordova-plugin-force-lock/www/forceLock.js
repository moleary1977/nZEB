cordova.define("cordova-plugin-force-lock.forceLock", function(require, exports, module) { var exec = require("cordova/exec");

var forceLock = {
  // init: function (success, error) {
  //   exec(success, error, "forceLock", "init", [{}])
  // },
  lock: function (success, error) {
    exec(success, error, "forceLock", "lock", [{}])
  }
}

module.exports = forceLock
});
