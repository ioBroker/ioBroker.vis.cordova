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
![Настройки](img/menu.png)

## Настройки
Почти все настройки необязательны за исключением "WiFi соединения" and "Проекта".

### Кнопки
- *Обновить* - Просто загружает страницу заново, как будто в браузере нажали на кнопку "обновить".
- *Синхр.* - если vis проект изменился, то обновления **не** будут загружены с сервера автоматически. Для синхронизации данных проекта с сервером необходимо нажать кнопку *Синхр.*. Все данные и картинки (а также шрифты и аудио-файлы) будут загружены с сервера заново. Это делается для последующей экономии траффика и ускорения загрузки проекта, т.к. загрузить файл с внутренней памяти гораздо быстрее, чем с удаленного сервера.
- *Ok* - сохранить все изменения и обновить страницу. Синхронизации с сервером не происходит, ести только не поменялось имя проекта. Что бы загрузить изменения с сервера используйте кнопку *Синхр.*.
- *Отмена* - отменить все изменения и закрыть диалоговое окно настроек.

### Соединение
Приложение может с помошью имени WiFi сети распознать в какой сети находится телефон, в домашней (обычно без пароля) или нет (с паролем) и использовать разные настройки для подключения.
Обычно в домашней сети не используется защищённое соединение и пароль и наоборот за пределами домашней сети не желательно использовать соединени без пароля и без SSL.

- *Соединение* - показывает состояние соединения: есть ли связь с ioBroker сервером.
- *WIFI Имя сети (SSID)* - имя или имена (через запятую) беспроводных сетей, которые будут идентифицироватся, как домашняя сеть, что бы использовать соответствующие настройки для соединения.
- *WIFI Socket URL* - URL вида ```http://192.168.0.5:8082```. Важно иметь в начале строки http или https, таким образом приложение решает какое соединение использовть: защищенное или нет. Порт также важен. Обычно значение порта 8082 для драйвера *web* или *8084* для отдельного драйвера socketio.
- *WIFI Пользователь* - если включена аутенфикация пользователя, необходимо ввести имя пользователя с сервера iobroker. Имя пользователя должно быть предварительно создано через интерфейс администратора. Пользователь "admin" существует всегда и не может быть удалён.
- *WIFI Пароль* - пароль пользователя заданный в ioBroker
- *WIFI Повтор пароля* - повтор пароля

Следующие настройки активны только если задано имя домашней беспроводной сети и устройство находится вне домашней сети.
- *Мобильный Socket URL* - тоже самое, что *WIFI Socket URL*, только для внешней сети.
- *Мобильный Пользователь* - тоже самое, что *WIFI Пользователь*, только для внешней сети.
- *Мобильный Пароль* - тоже самое, что *WIFI Пароль*, только для внешней сети.
- *Мобильный Повтор пароля* - тоже самое, что *WIFI Повтор пароля*, только для внешней сети.

*Заметка*: Файл глобальных стилей CSS не обрабатывается. По этому, если есть настройки в CSS для конкретного проекта, необходимо скопировать эти стили в проектный CSS файл.

### Имя проекта и язык
- *Язык* - язык настроек. Поддерживаются английский, немецкий и русский языки. Для перенятия настроек нужно нажать *OK*.
- *Проект* - имя проекта с ioBroker сервера. Если имена не показываются, это охначает, что соединение с сервером отсутствует или нет ни одного проекта.

### Отображение и поведение
- *Ориенитация* - Ориентация страницы: **авто**, **горизонтальная** or **портретная**. Если выбрано **авто*, то ориентация выбирается в зависимости от положения устройства.
- *Не засыпать* - устройство не переходит в спящий режим и дисплей не гаснет если активирована эта функция. (Работает не на всех телефонах.)
- *Разрешить сдвиг окна* - позволяет изменять масштаб и передвигать страницу.
- *Полноэкранный режим* - включает полноэкранный режим на устройствах без настоящих кнопок "домой", "назад", "настройки".
- *Зум при верт. положении* - масштаб в процентах для портретной ориентации. Не устанавливайте масштаб слишком маленьким, иначе будет невозможно нажать на кнопку настроек. Значение по умолчанию 100% и нельзя выставить значение меньше 20%.
- *Зум при гор. положении* - тоже самое, что *Зум при верт. положении* только для горизонтального положения.

### Другие настройки
- *Замена URL* - если ваш vis проект содержит ссылки на изображения с локального сетевого URL, но отличного от iobroker URL, то вы можете прописать здесь этот URL и все изображения с этого сервера, которые используются в vis проекте, будут тоже загружены на мобильный телефон.
- *Идентификатор* - Уникальный ID этого VIS проекта на конкретном мобильном устройстве, если необходимо посылать команды только на этот vis проект. (Описание команд можно найти здесь [Команды интерфейса](#контрольный интерфейс))
- *Спать, если не активно* - Если vis приложение не показано (но бежит в фоне), то можно прекратить любую коммуникацию vis приложения с iobroker сервером. В этом случае изменения состояний и команды от iobroker не будут доставлены приложению, если приложение бежит в фоновом режиме.

### Распознавание речи
Вы можете активировать распознавание речи из приложения. Если эта функция активирована, то приложение будет постоянно пытается распознавать команды. Чтобы определить, говорите ли вы с приложением или с кем-нибудь еще, необходимо указать ключевое слово или фразу.
Выберите такое слово, которое может быть хорошо распознано и не используется в повседневном быте.

Для распознавания команд из текста используется драйвер text2command. Описание этого адаптера можно найти здесь [github](https://github.com/ioBroker/ioBroker.text2command) или на #01[http://iobroker.net].
Конечно один экземпляр драйвера text2command должен быть установлен и сконфигурирован.

*Заметка*: при распознавании обычно вся записанная речь отсылается на сервера google если не включена оффлайн распознавание. В настройках андроид можно включить оффлайн распознавание так: Настройки->Язык и клавиатура->Голосовой ввод Google->Распознавание речи офлайн, там выбрать языки и загрузить.

*Заметка*: в режиме распознавания система android воспроизводит громкий звуковой сигнал каждые 10-15 секунд. Что бы сигнала не было слышно, громкость звука выставляется на 0. При ответе голосом от или при использовании команд "tts"/"playSound" громкость будет выставлятся на предустановленную в натройках и убиратся по окончании проигрывания.

- *Распознавание речи активно* - активировать распознавание речи средством операционной системы телефона.
- *Ключевое слово* - Если в распознанном предложении будет найдено это слово (или фраза), то текст будет отправлен "text2command" для анализа. Не обязательно иметь ключевое слово в начале предложения. Вы можете пренебречь ключевым словом, но в этом случае все фразы будут отправлятся text2command для анализа.
- *Экземпляр Text2command* - номер экземпляра драйвера text2command. Обычно 0.
- *Громкость речи* - громкость для ответов голосом. Всё остальное время громкость будет установлена на 0.
- *Комната по умолчанию* - если телефон или планшет постоянно находится в одной комнате, то нет необходимости говорить "Включи свет в кабинете", если планшет находится в кабинете. Можно просто сказать "Включи свет". Что бы это было возможно, нужно задать комнату по умолчанию. Имя комнаты по умолчанию будет использоватся каждый раз, если в сообщении не найдено имя комнаты.
- *Отвечать голосом* - активирует ответы от text2command голосом. Для этого должна быть настроена TTS система на телефоне.

### Access to images and other resources
The App copies the view file of the selected project and all referenced images during the synchronization to the phone (internal memory). There is no automatic update so you have to restart the re-synchronization manually.
The following content will be copied to the phone:
- The view files and all other files in the directory of the chosen vis project with one of the following file extensions: ```.png .jpg .jpeg .gif```
- All image files with file extension ```.png .jpg .jpeg .gif``` and files with file extension ```.wav .mp3 .bmp .svg```, which are in a adapter directory below [iobroker data directory]/files/ and which are referenced inside the view definition file of the chosen vis project. The fist sub directory below [iobroker data directory]/files/ must contain the char "." in his name otherwise the files inside will not be copied.

To allow the app to replace the paths correctly, the files must be specified with an absolute local path (for example, /vis.0/main/img/test.png). Relative paths are not supported. If paths to resources are embedded in HTML inside widgets, the syntax must be exactly match the following pattern  ```... src='/vis.0/main...'``` or ```... src ="/vis.0/main..."```. Other notations are not recognized.
Additionally you can configure an *Substitution URL* in the settings dialog. This URL points to the external URL of the Web server of VIS or another local web server. All found references to URL found in the view definition which starts with the configured Test are downloaded to the device and the URL will be changed to the local path during the synchronization. Please note that this substitution is not implemented for embedded links in html code(e.g. ```https://[your domain]/visweb```).

The replacement of paths at runtime is currently limited to the following widgets:
- basic string (unescaped)
- basic string src
- basic json table

Since the values are transmitted at runtime, the files are only transferred to the device if they are located in the project directory or have been referenced by another statically configured widget. There is no load mechanism of missing pictures.
The icon collections offered as separate ioBroker adapter are not part of the app, but will also be copied during the synchronization phase if the images are referenced in the views.

Your can access other resources within the app if you use full paths starting with http:// or https://. These files are not loaded locally during the synchronization but loaded directly from the respective server via http:// or https:// if the view is shown in the app.
If you use a reverse proxy with http authentication, the credentials can be embedded in the URLin the following form:
```https://[username]:[password]@[my domain]/vis.0/main/...```


### Using Web modules of other adapters as VIS
Other adapters as VIS can also deliver web content. This content can be displayed within the vis views in iframes. This is particularly true for the adapters Flot and Rickshaw charts.

Currently, only the client components of the following adapters are integrated in the app:
- Flot
- Rickshaw

To use the local version of Flot, the source of the iframe must start with ```/flot/index.html?```.

Other content and also the content of other servers such as Webcams can also be shown inside the app, if this is a full URL is used to the server.

### Exit of the App
The app can be closed with the home button. However, in this case, the app runs in the background and continues to consume data volume and battery. The option *Sleep in background* can reduce the consumption. In this case, the socket.io connection is interrupted when the app is inactive.
If you close the app by pressing the back button trice within one second, the app will be stopped completely.
In addition, the app provides a way to terminate completely. For this purpose, you can insert a basic static link widget in your views containing the following link: ```javascript:logout ()```
You find here such a Widget to import in VIS:

```
[{"tpl":"tplIconLink","data":{"visibility-cond":"==","visibility-val":1,"href":"javascript:logout ();","target":"_self","text":"","views":null,"gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"src":"/icons-material-png/action/ic_exit_to_app_black_48dp.png","name":"","class":""},"style":{"left":"1232px","top":"755px","z-index":"106","background":"none","border-style":"none","color":"#000000","font-family":"Arial, Helvetica, sans-serif","font-size":"large","letter-spacing":"","font-weight":"bold","width":"34px","height":"32px"},"widgetSet":"jqui"}]
```
