cordova.define("com.jiliac.systemvolume.SystemVolume", function(require, exports, module) {
var exec = require('cordova/exec');

module.exports = {

    setSystemVolume: function(volume) {
        exec(null, null, "SystemVolume", "setSystemVolume", [volume]);
    },
};
});
