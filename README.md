![Logo](img/icon_small.png)
ioBroker.vis.cordova
============

WEB visualisation for ioBroker platform as android App.

This app is designed to run on mobile phones and tables. it stores the vis project and all images on the mobile phone to save the mobile traffic.

## Usage
This app required the installed and running web adapter or socket-io adapter and installed vis adapter. If web server is activated, so internal socket-io interface must be activated.
In vis some project should exists, e.g. "main".

The ports and the ioBroker server must be reachable from mobile phone.

Install app via [App Store](https://play.google.com/store/apps/details?id=net.iobroker.vis&hl=en). After starting the app for the first time the settings dialog should be opened automatically. To start work with an app see settings.

To show settings press semi-transparent button with "..." in the top left corner.
![Settings](img/menu.png)

## Settings
Almost all settings are optional except "WIFI Socket" and "Project".

### Buttons
- *Reload* - Just restart the web engine, like you press the "Refresh" button in your browser.
- *Re-sync* - If some changes were made on the vis project, it will be **not** automatically loaded into app. To do that the "Re-sync" button must be pressed. All project files and images will be loaded anew on the phone. It is done to save the mobile traffic and to speed up the start of application. Because read from internal SD-Card is much faster than from ioBroker server.
- *Ok* - save all changes and restart the engine. No synchronisation will be done if the project was yet defined. To load changes from ioBroker vis project use "Re-sync" button.
- *Cancel* - discard all changes and close dialog.

### Connectivity
App can detect via SSID name if the mobile phone in the home (trusted) network or outside of home network and use for home and outside connection the different socket URLs and login data.

Normally in the home network there is no authentication and connection is via HTTP (unsecure) but from outside network the connection goes via https (secure) and with login/password.

- *Connected* - shows if the app is connected with ioBroker server.
- *WIFI SSID* - name or names (divided by comma) of home SSID to use home credentials for authentication and home URL for connection.
- *WIFI Socket* - URL like ```http://192.168.0.5:8082```. It is important to have http or https at the start, so app can distinguish between secure and insecure connections. Port is important too. Normally 8082 for *web* or *8084* for separated socketio.
- *WIFI User* - if for the socket communication the authentication is enabled, write here user name from iobroker. User must be first created via "admin" interface. The user "admin" exists always and cannot be deleted.
- *WIFI Password* - user password as set in the ioBroker
- *WIFI Password repeat* - repeat user password here

Following settings are active only if some SSID specified and the device is currently outside of this SSID WiFi network.
- *Cell Socket* - same as *WIFI Socket*, but will be used outside of home network.
- *Cell User* - same as *WIFI User*, but will be used outside of home network.
- *Cell Password* - same as *WIFI Password*, but will be used outside of home network.
- *Cell Password repeat* - same as *WIFI Password repeat*, but will be used outside of home network.

### Project name and settings language
- *Language* - language of the settings dialog. English, german and russian languages are supported. To activate changes press *OK* button.
- *Project* - project name from ioBroker. If no project name shown, so there is no connection with iobroker or no one project is exist.

### Visualisation and behaviour
- *Orientation* - Orientation of view: **auto**, **landscape** or **portrait**. if **auto* selected the orientation will be detected automatically.
- *Prevent from sleep* - if activated, the device will never go into sleep mode and display will be always on. (Does not work an all devices)
- *Allow window move* - if pan and zoom via touch is allowed on the views.
- *Full screen* - use full screen mode on devices with software buttons (home, settings, back).
- *Zoom Level Portrait* - Zoom level in percent of views in portrait mode. Do not set too small level, because you will not be able call the settings dialog. Default settings is 100% and you cannot set values below 20%.
- *Zoom Level Landscape* - same as *Zoom Level Portrait*, but for landscape view.

### Other settings
- *Substitution URL* - if your vis project uses the links for images from some local network URL, that differs from ioBroker URL, you can specify here this URL and all images from this server, that used in the vis project, will be loaded on the mobile phone too.
- *Instance* - Unique instance ID of this VIS. It is required to send targeted commands to only this vis instance. (See [Control interface](#control-interface) for details)
- *Sleep in background* - If vis app is not shown (but runs in background) you can stop any communication from the vis app to the ioBroker server. In this case the state updates and commands from ioBroker will not be delivered to app if the app runs in background.

### Speech recognition
You can activate speech recognition from the application. If this option is activated, the app will constantly tries to recognise some commands. To determine if you are speaking with app or with someone else the key word or key phrase can be specified.
Please select some word that can be good recognised and not used in everyday use.

To detect commands in recognised text the text2command adapter will be used. Please read description of this adapter on [github](https://github.com/ioBroker/ioBroker.text2command) or on (iobroker.net)[http://iobroker.net].
Of course one instance of text2command adapter must be installed.

*Note*: in this case all voices will be sent to Google servers if no offline recognition activated. Activation instruction can be found [here](http://stackandroid.com/tutorial/how-to-enable-offline-speech-to-text-in-android/).

*Note*: in recognition mode the andorid engine makes "BEEP" every 10-15 seconds. To suppress this the volume will be set to 0. You still can use "text2speech" engine and "playSound" command to play some audio or say tome phrases.

- *Speech recognition active* - if speech recognition is active or not.
- *Keyword* - If in the recognised sentence this word (or phrase) will be found, this text will be sent to "text2command" instance for analyse. It is not required to have keyword on the start of the sentance. You can omit key word in this case all phrases will be sent to text2command for analyse.
- *Text2command instance* - number of text2command instance. Normally 0.
- *Volume* - volume for answers and for text-to-speech commands. All other time the volume will be set 0.
- *Default room* - if your mobile device is fixed in some specific room, e.g. in sleeping room. There is no need to sy every time "Switch the light on in sleeping room", it is should be enough to say ""Switch the light on". To enable that the default room name can be specified. If text2command does not find any room name in the phrase it will take default room name for command execution.
- *Response over TTS* - if activated the answers from text2command will be synthesised via text-to-speech engine. Of course some TTS Engine must be installed and activated on android device.

## How to build

```
npm install 
grunt release
or 
grunt build
```

Output is in ```ioBroker.vis.cordova\platforms\android\build\outputs\apk```

To test it on android Handy:
```
cordova run android
```

## Control interface
Vis creates 3 variables:

- control.instance - Here the browser instance should be written or FFFFFFFF if every browser must be controlled.
- control.data     - Parameter for command. See specific command description.
- control.command  - Command name. Write this variable triggers the command. That means before command will be written the "instance" and "data" must be prepared with data.

Commands:

* alert - show alert window in vis. "control.data" has following format "message;title;jquery-icon". Title and jquery-icon are optional. Icon names can be found [here](http://jqueryui.com/themeroller/). To show icon "ui-icon-info" write ```Message;;info```.
* changeView - switch to desired view. "control.data" must have name of view. You can specify project name too as "project/view". Default project is "main".
* refresh - reload vis, for instance after project is changed to reload on all browsers.
* reload - same as refresh.
* dialog - Show dialog window. Dialog must exist on view. One of:

    - "static    - HTML    - Dialog",
    - "static    - Icon    - Dialog",
    - "container - HTML    - view in jqui Dialog",
    - "container - ext cmd - view in jqui Dialog",
    - "container - Icon    - view in jqui Dialog",
    - "container - Button  - view in jqui Dialog".

    "control.data" must have id of dialog widget, e.g. "w00056".
* popup - opens a new browser window. Link must be specified in "control.data", e.g. http://google.com
* playSound - play sound file. The link to file is specified in "control.data", e.g. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.
  You can upload your own file in vis and let it play as for instance "/vis.0/main/img/myFile.mp3".
* tts - text 2 speech. *data* - consist phrase, that must be spoken.

If user changes the view or at start the variables will be filled by vis with

- "control.instance": browser instance and ack=true
- "control.data": project and view name in form "project/view", e.g. "main/view" (and ack=true)
- "control.command": "changedView" and ack=true

You can write the JSON-string or Object into control.command as ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```. In this case the instance and data will be taken from JSON object.

With command in javascript adapter you can activate text to speech engine of Android:

```setState('vis.0.control.command', '{"instance": "*", "data":"say something", "command": "tts"}');```

## TODO
- enable automatically load of project files from ioBroker server (e.g. for home use)
- include flot and rickshaw engines into app

## Changelog

### 0.4.5 (2016-07-21)
- (bluefox) support of multiple SSIDs divided by comma

### 0.4.4 (2016-07-18)
- (bluefox) fix string escaped

### 0.4.3 (2016-07-17)
- (nobody) fix progressbar, regEx, img path sub in oid

### 0.4.2 (2016-07-16)
- (bluefox) add text input to zoom values in settings

### 0.4.1 (2016-07-12)
- (nobody) add crosswalk browser

### 0.3.2 (2016-06-21)
- (bluefox) replace src="/vis/..." too

### 0.3.1 (2016-06-21)
- (bluefox) fix common.css
- (bluefox) try up to 10 times to store the file if got error

### 0.3.0 (2016-06-13)
- (bluefox) update cordova lib
- (bluefox) add vis-history
- (bluefox) use latest vis

### 0.2.1 (2016-05-17)
- (bluefox) add justgauge

### 0.2.0 (2016-05-10)
- (bluefox) make it run on 4.0.x and 4.1.x

### 0.1.2 (2016-05-03)
- (bluefox) fix error with SVG files
- (bluefox) try to fix error with start

### 0.1.1 (2015-04-24)
- (bluefox) try to fix file saving

### 0.1.0 (2015-04-20)
- (bluefox) fix TTS
- (bluefox) allow pictures from other projects
- (blufeox) change storage to external
- (bluefox) change settings dialog
- (bluefox) allow set system volume for speach

### 0.0.8 (2015-02-23)
- (bluefox) fix "hide on condition"
- (bluefox) implement sleep in background (if app is not active, do not communicate and do not recognize speech)

### 0.0.7 (2015-01-18)
- (bluefox) text2speech


## License
 Copyright (c) 2016 bluefox https://github.com/GermanBluefox
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

It is **prohibited** to publish this app or modifications of this app in any kind of mobile application stores (Google App Store, Amazon App Store, ...). 
Even if the name of the app is modified and it is free of charge you **may not** publish it.

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).
