## Build Debug
Make sure:
 - run `npm i && npm update`
 - the android studio is installed
 - enable debug on android device
 - mobile phone ADB driver is installed (restart PC after installation)
 - `abd devices` should show your device
 - call `adb install platforms/android/build/outputs/apk/android-debug.apk`
 
## Build release 
- copy `/platforms/android/ioBroker.vis.keystore` from secure store
- create file `/platforms/android/release-signing.properties` with following content:
```
storeFile=ioBroker.vis.keystore
keyAlias=ioBroker.vis
keyPassword=xxx
storePassword=xx
```

- place according password into `platforms/android/release-signing.properties` 

