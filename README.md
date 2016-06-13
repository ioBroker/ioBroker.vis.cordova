![Logo](admin/vis.png)
ioBroker.vis.cordova
============

WEB visualisation for ioBroker platform as android App.

You still need ioBroker and installed vis to create views.

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

If user changes the view or at start the variables will be filled by vis with

- "control.instance": browser instance and ack=true
- "control.data": project and view name in form "project/view", e.g. "main/view" (and ack=true)
- "control.command": "changedView" and ack=true

You can write the JSON-string or Object into control.command as ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```. In this case the instance and data will be taken from JSON object.

With command in javascript adapter you can activate text to speech engine of Android:

```setState('vis.0.control.command', '{"instance": "*", "data":"say something", "command": "tts"}');```

## Changelog

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

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).
