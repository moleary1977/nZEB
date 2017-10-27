cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-force-lock/www/forceLock.js",
        "id": "cordova-plugin-force-lock.forceLock",
        "pluginId": "cordova-plugin-force-lock",
        "clobbers": [
            "window.forceLock"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/src/browser/network.js",
        "id": "cordova-plugin-network-information.NetworkInfoProxy",
        "pluginId": "cordova-plugin-network-information",
        "runs": true
    },
    {
        "file": "plugins/com-sarriaroman-photoviewer/www/PhotoViewer.js",
        "id": "com-sarriaroman-photoviewer.PhotoViewer",
        "pluginId": "com-sarriaroman-photoviewer",
        "clobbers": [
            "PhotoViewer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-force-lock": "0.0.1",
    "cordova-plugin-network-information": "1.3.3",
    "cordova-plugin-whitelist": "1.3.2",
    "com-sarriaroman-photoviewer": "1.1.10"
}
// BOTTOM OF METADATA
});