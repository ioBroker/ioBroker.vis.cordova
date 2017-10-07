cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.jiliac.systemvolume.SystemVolume",
        "file": "plugins/com.jiliac.systemvolume/www/systemvolume.js",
        "pluginId": "com.jiliac.systemvolume",
        "clobbers": [
            "window.system"
        ]
    },
    {
        "id": "com.phonegap.plugins.OrientationLock.OrientationLock",
        "file": "plugins/com.phonegap.plugins.OrientationLock/www/orientationLock.js",
        "pluginId": "com.phonegap.plugins.OrientationLock",
        "clobbers": [
            "OrientationLock"
        ]
    },
    {
        "id": "cordova-plugin-tts.tts",
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    },
    {
        "id": "cordova.custom.plugins.exitapp.exitApp",
        "file": "plugins/cordova.custom.plugins.exitapp/www/ExitApp.js",
        "pluginId": "cordova.custom.plugins.exitapp",
        "merges": [
            "navigator.app"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    },
    {
        "id": "cordova-plugin-battery-status.battery",
        "file": "plugins/cordova-plugin-battery-status/www/battery.js",
        "pluginId": "cordova-plugin-battery-status",
        "clobbers": [
            "navigator.battery"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.Toast",
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.tests",
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "pluginId": "cordova-plugin-x-toast"
    },
    {
        "id": "cordova-plugin-app-version.AppVersionPlugin",
        "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
        "pluginId": "cordova-plugin-app-version",
        "clobbers": [
            "cordova.getAppVersion"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechRecognition",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechRecognition.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechRecognition"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechRecognitionError",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechRecognitionError.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechRecognitionError"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechRecognitionAlternative",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechRecognitionAlternative.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechRecognitionAlternative"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechRecognitionResult",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechRecognitionResult.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechRecognitionResult"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechRecognitionResultList",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechRecognitionResultList.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechRecognitionResultList"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechRecognitionEvent",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechRecognitionEvent.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechRecognitionEvent"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechGrammar",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechGrammar.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechGrammar"
        ]
    },
    {
        "id": "phonegap-plugin-speech-recognition.SpeechGrammarList",
        "file": "plugins/phonegap-plugin-speech-recognition/www/SpeechGrammarList.js",
        "pluginId": "phonegap-plugin-speech-recognition",
        "clobbers": [
            "SpeechGrammarList"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-insomnia.Insomnia",
        "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
        "pluginId": "cordova-plugin-insomnia",
        "clobbers": [
            "window.plugins.insomnia"
        ]
    },
    {
        "id": "cordova-plugin-fullscreen.AndroidFullScreen",
        "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
        "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
            "AndroidFullScreen"
        ]
    },
    {
        "id": "cordova-plugin-file.DirectoryEntry",
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "id": "cordova-plugin-file.DirectoryReader",
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "id": "cordova-plugin-file.Entry",
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "id": "cordova-plugin-file.File",
        "file": "plugins/cordova-plugin-file/www/File.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "id": "cordova-plugin-file.FileEntry",
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "id": "cordova-plugin-file.FileError",
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "id": "cordova-plugin-file.FileReader",
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "id": "cordova-plugin-file.FileSystem",
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.FileUploadOptions",
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "id": "cordova-plugin-file.FileUploadResult",
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "id": "cordova-plugin-file.FileWriter",
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "id": "cordova-plugin-file.Flags",
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "id": "cordova-plugin-file.LocalFileSystem",
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "id": "cordova-plugin-file.Metadata",
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "id": "cordova-plugin-file.ProgressEvent",
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "id": "cordova-plugin-file.fileSystems",
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "pluginId": "cordova-plugin-file"
    },
    {
        "id": "cordova-plugin-file.requestFileSystem",
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window"
        ]
    },
    {
        "id": "cordova-plugin-file.isChrome",
        "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "id": "cordova-plugin-file.androidFileSystem",
        "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "FileSystem"
        ]
    },
    {
        "id": "cordova-plugin-file.fileSystems-roots",
        "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "id": "cordova-plugin-file.fileSystemPaths",
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "id": "com.pylonproducts.wifiwizard.WifiWizard",
        "file": "plugins/com.pylonproducts.wifiwizard/www/WifiWizard.js",
        "pluginId": "com.pylonproducts.wifiwizard",
        "clobbers": [
            "window.WifiWizard"
        ]
    },
    {
        "id": "cordova-plugin-certificates.Certificates",
        "file": "plugins/cordova-plugin-certificates/www/certificate.js",
        "pluginId": "cordova-plugin-certificates",
        "clobbers": [
            "cordova.plugins.certificates"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.jiliac.systemvolume": "0.1.0",
    "com.phonegap.plugins.OrientationLock": "0.1",
    "cordova-plugin-tts": "0.2.3",
    "cordova.custom.plugins.exitapp": "1.0.0",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.4.3",
    "cordova-plugin-battery-status": "1.2.4",
    "cordova-plugin-x-toast": "2.6.0",
    "cordova-plugin-app-version": "0.1.9",
    "phonegap-plugin-speech-recognition": "0.2.0",
    "cordova-plugin-network-information": "1.3.3",
    "cordova-plugin-insomnia": "4.3.0",
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-fullscreen": "1.1.0",
    "cordova-plugin-file": "4.3.3",
    "com.pylonproducts.wifiwizard": "0.2.11",
    "cordova-plugin-certificates": "0.6.4"
};
// BOTTOM OF METADATA
});