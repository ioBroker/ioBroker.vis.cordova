![Logo](admin/vis.png)
ioBroker.vis.cordova
============

WEB визуализация для платформы ioBroker как приложение для мобильных устройств.

Это приложение разработано для мобильных телефонов и планшетов и оно сохраняет все данные проекта и все картинки из проекта локально на устройстве и экономит таким образом мобильный трафик.

## Использование
Это приложение не может работать самостоятельно и требует предустановленный ioBroker с настроенными и активированными драйверами vis и web (или socket-io).
При использовании только web драйвера в связке с vis требуется активированная настройка внутреннего socket-io.
Также проект vis тоже должен существовать, например "main".

Порты и сервер ioBroker должны быть доступны с телефона и не заперты за файерволом.

Приложение можно установить с [App Store](https://play.google.com/store/apps/details?id=net.iobroker.vis&hl=ru)
После установки и первого запуска приложения должно автоматически открыться меню настроек. Что бы начать работать с приложением необходимо произвести минимальные настройки.

Что бы позднее вызвать меню настроек нужно нажать на полупрозрачную кнопку в верхнем левом углу.
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
