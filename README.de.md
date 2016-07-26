![Logo](img/icon_small.png)

WEB-Visualisierung für ioBroker Plattform als Android-App.

Diese Die App ist konzipiert für Smartphone und Tablet. Das vis-Projekt und alle Bilder werden auf dem Smartphone gespeichert um den mobilen Datenverkehr zu verringern.

## Verwendung
Diese App benötigt einen installierten, aktivierten Web-Adapter oder socket-io-Adapter und einen installierten vis-Adapter. Bei aktiviertem Web-Server, muss das interne Socket-IO-Interface aktiviert sein.
In Vis sollte ein Projekt vorhanden sein, z.B. "Main".

Die Ports und der ioBroker Server muss vom Mobiltelefon erreichbar sein.

Installiere die App über App Store. Nachdem die Anwendung zum ersten Mal starten sollte der Einstellungsdialog automatisch geöffnet werden. Um die Arbeit mit der App zu starten öffne die Einstellungen.

Um die Einstellungen anzuzeigen, drücke die halbtransparenten Schaltfläche in der linken oberen Ecke.
![Settings](img/menu.png)

## Einstellungen
Fast alle Einstellungen sind optional mit Ausnahme von "WIFI Socket" und "Project".

### Buttons
- *Neuladen* - Läd die Web-Engine neu, als würde man die Schaltfläche "Aktualisieren" im Browser drücken.
- *Re-Sync* - Wenn einige Änderungen an dem vis-Projekt vorgenommen wurden, wird es **nicht** automatisch in die App geladen. Dazu, muss die "Re-Sync" Taste gedrückt werden. Alle Projektdateien und Bilder werden auf dem Smartphone neu geladen. Das wird gemacht, um den mobilen Datenverkehr zu verringern und den Start der Anwendung zu beschleunigen. Das lesen der Dateien von der internen SD-Card ist viel schneller, als vom ioBroker Server.
Wenn die Option *Schlafen, falls inaktiv* aktiviert ist, darf während der Synchronisation das Telefon nicht inaktiv werden, da ansonsten die Socket.io-Verbindung unterbrochen und die Synchronisation abgebrochen wird.
- *OK* - Alle Änderungen speichern und die WEB-Engine neu starten. Es wird keine Synchronisation durchgeführt, wenn das Projekt noch nicht definiert wurde. Um Änderungen vom ioBroker vis-Projekt neu zu laden benutze die "Re-Sync" -Taste.
- *Abbrechen* - Alle Änderungen verwerfen und Dialog schließen.

### Konnektivität
App kann über SSID-Namen erkennen, ob das Smartphone im Heimnetzwerk oder außerhalb des Heimnetzwerkes ist und benutzt für das Heimnetzwerk und für Außerhalb verschiedenen Socket-URLs und Login-Daten.

Normalerweise gibt es im Heimnetzwerk keine Authentifizierung und die Verbindung läuft über HTTP (unsicher). Im externen Netzwerk geht die Verbindung über https (verschlüsselt) und mit Login / Passwort.

- *Verbunden* - zeigt an, ob die App mit ioBroker Server verbunden ist.
WiFi Verbindung
- *SSID Name* - Namen oder die Namen (geteilt durch Komma) der Heimnetzwerk SSID. Es wird für die Verbindung die Anmeldeinformationen und die Home-URL des Heimnetzwerks verwendet.
- *Socket URL* - URL wie ```http://192.168.0.5:8082```. Es ist wichtig, http oder https zu Beginn zu haben, dadurch kann die App zwischen sicheren und unsicheren Verbindungen unterscheiden. Port ist auch wichtig. Normalerweise 8082 für *Web* oder 8084 für *socketio*.
- *Anwender* - wenn für die Socket-Kommunikation die Authentifizierung aktiviert ist, tragen Sie hier den Benutzernamen von iobroker ein. Benutzer müssen zunächst über die "admin" Schnittstelle erstellt werden. Der Benutzer "admin" existiert immer und kann nicht gelöscht werden.
- *Kennwort* - Benutzer-Passwort, wie in ioBroker gesetzt
- *Kennwort-Wiederholung* - Wiederholung des Benutzer-Passworts

Folgende Einstellungen sind nur aktiv, wenn einige SSID angegeben sind und das Gerät sich derzeit außerhalb dieser SSID befindet.
Mobile Verbindung
- *Socket URL* - das gleiche wie *WIFI Socket*, wird aber außerhalb des Heimnetzes verwendet.
- *Anwender* - das gleiche wie *WIFI Anwender*, wird aber außerhalb des Heimnetzes verwendet.
- *Kennwort* - das gleiche wie *WIFI Password*, wird aber außerhalb des Heimnetzes verwendet.
- *Kennwort-Wiederholung* - das gleiche wie *WIFI Password repeat*, wird aber außerhalb des Heimnetzes verwendet.

### Projektname und Spracheinstellungen
- *Language/Sprache* - Sprache der Einstellungs-Dialog. Englisch, Deutsch und Russisch werden unterstützt. Um die Änderungen zu aktivieren, * OK * Taste drücken.
- *Projekt* - Projektname von ioBroker. Wenn kein Projektname angezeigt wird, besteht keine Verbindung mit iobroker oder es existiert kein Projekt.

### Andere Einstellungen
- *Austausch URL* - wenn das vis Projekt Links auf statische Inhalte auf anderen lokalen Servern hat oder vollständige URL verwendet, kann in diesem Feld der Anfang einer lokalen URL angegeben werden. Alle Dateien, die mit dieser URL beginnen, werden während der Synchronisation auf das Telefon geladen und die Pfade angepasst.
- *Instanz* - Eindeutige Kennung (instance ID) der in der App laufenden VIS-Instanz. Diese ID wird benötigt, um beim Versenden von Kommandos vom ioBroker Server die App eindeutig adressieren zu können. (Weitere Informationen finden sie unter [Control interface](#control-interfac))
- *Schlafen, falls inaktiv* - Wenn die vis App nicht angezeigt aber noch immer im Hintergrund ausgeführt wird, kann mit dieser Option die Kommunikationsverbindung zum Server unterbrochen werden. In diesem Fall werden keine Aktualisierungen oder Kommandos an die App gesendet, bis die App wieder aktiviert wird. Nach der Aktivierung der App erfolgt ein erneuter Verbindungsaufbau und Abruf der Werte vom Server.

### Spracherkennung
In der App kann eine Spracherkennung aktiviert werden. Wenn diese Option aktiv ist, versucht die App durchgehend Kommandos zu erkennen. Um falsch erkannte Kommandos aus normalen Unterhaltungen zu vermeiden wird ein Schlüsselwort zur Einleitung von Kommandos verwendet. Die Schlüsselworte können in den Einstellungen eingegeben werden.
Bitte wählen sie ein Wort aus, dass gut erkannt werden kann und im normalen Sprachgebrauch nicht allzu gebräuchlich ist.

ioBroker verwendet den text2command adapter zur Auswertung der empfangenden Kommandos. Eine Instanz dieses Adapters muss hierfür auf dem Server installiert und eingerichtet sein. Bitte lesen sie die Beschreibung für diesen Adapter unter [github](https://github.com/ioBroker/ioBroker.text2command) oder (iobroker.net)[http://iobroker.net].

*Bemerkung*: Wenn keine Offline-Spracherkennung aktiviert ist, wird die gesamte Sprachaufzeichung an die Google Server gesendet. Anleitungen zur Aktivierung der Offline-Spracherkennung finden sie unter [link](http://stackandroid.com/tutorial/how-to-enable-offline-speech-to-text-in-android/).

*Bemerkung*: Bei aktivierter Spracherkennung erzeugt das Mobiltelefon alle 10-15 Sekunden einen Ton. Um dies zu verhindern wird die Benachrichtigungslautstärke auf 0 gesetzt. Sie können weiterhin die Textausgabe mit "text2speech" verwenden und mit dem "playSound" Kommando Audio-Ausgaben erzeugen.

- *Spracherkennung aktiviert* - legt fest, ob die Spracherkennung aktiviert wurde
- *Schlüsselwort* - Wenn im erkannten Satz oder Wort das angegebene Schlüsselwort gefunden wird, erfolgt die Weiterleitung des empfangenden Texts an die "text2command" Instanz zur weiteren Analyse. Es ist nicht erforderlich, dass das Schlüsselwort zu Beginn des Satzes gesagt wird.
- *Text2command-Instanz* - Nummer der text2command Instanz auf dem Server. Im Normalfall 0.
- *Sprachlautstärke* - Lautstärke für Antworten und für text-to-speech Kommandos. Für die restliche Zeit wird die Lautstärke auf 0 gesetzt.
- *Default Raum* - Legt das Mobiltelefon auf einen spezifischen Raum fest. Wenn hier ein Raum angegeben wird ist es nicht mehr erforderlich, im Kommando den Raum anzugeben. in sleeping room.  Statt "Schalte das Licht im Schlafzimmer an" reicht es, "Schalte das Licht an" zu sagen. Wenn text2command keinen Raum im erkannten Text finden kann, wird der konfigurierte Default Raum verwendet.
- *Antworten mit TTS* - wenn diese Option aktiviert wurde werden Antworten mit Hilfe der text-to-speech engine ausgegeben. Hierfür muss im Mobiltelefon eine  TTS Engine eingerichtet sein.

### Visualisierung und Verhalten
- *Orientation* - Ausrichtung des Views: **auto**, **landscape** oder **portrait**. wenn **auto** ausgewählt ist, wird die Ausrichtung automatisch erkannt.
- *Prevent from sleep* - wenn aktiviert, wird das Gerät nie in den Ruhemodus gehen und das Display bleibt immer an. (Funktioniert nicht auf allen Geräten)
- *Allow Window Move* - wenn aktiviert, Schwenken und Zoomen auf den Views ist erlaubt.
- *Full screen* - Verwenden Sie den Vollbildmodus auf Geräte mit Software-Tasten (Home, Settings, Back).
- *Zoom Level Portrait* - Zoom in Prozent im Portrait-Modus. Nicht zu gering einstellen, sonst kann der Einstellungsdialog nicht mehr aufgerufen werden. Die Standardeinstellung ist 100% und kann nicht unter 20% festgelegt werden.
- *Zoom Level Landscape* - das gleiche wie *Zoom Level Portrait*, für die Landscape Ansicht.

### Zugriff auf Bilder und andere Ressourcen
Die App kopiert bei der Synchronisation die Views des ausgewählten Projekts und alle darin referenzierten Bilder lokal auf das Mobiltelefon (Gerätespeicher).
Folgende Inhalte werden kopiert:
- Alle Dateien im ausgewählten Projektverzeichnis mit den Dateiendungen ```.png .jpg .jpeg .gif```
- Alle Bilder mit den Dateiendungen ```.png .jpg .jpeg .gif``` sowie Dateien mit der Endung ```.wav .mp3 .bmp .svg```, welche sich ein einem Adapterverzeichnis unter [iobroker-Datenverzeichnis]/files/ befinden und im View angegeben sind und bei denen im ersten Unterverzeichnis unter [iobroker-Datenverzeichnis]/files/ ein "." im Verzeichnisnamen ist.

Damit die App die Pfade richtig ersetzt, müssen die Dateien mit einem absoluten lokalen Pfad angegeben werden (z.B. /vis.0/main/img/test.png). Relative Pfadangaben werden nicht unterstützt. Wenn Pfade in den Widgets in HTML eingebettet ist, muss die Schreibweise genau dem folgenden Muster entsprechen ```... src='/vis.0/main...'``` oder ```... src="/vis.0/main..."```. Andere Schreibweisen werden nicht erkannt.
Zusätzlich kann in den Einstellungen eine *Substitution URL* angegeben werden. Hierbei handelt es sich um die externe URL des Webservers von VIS. Alle URL, die mit der angegebenen Zeichenfolge anfangen, werden ebenfalls so behandelt, als ob es lokale Dateien sind (z.B. ```https://[meine Domain]/visweb```).

Die Ersetzung von Pfaden zur Laufzeit beschränkt sich zurzeit auf die folgenden Widgets:
- basic string (unescaped)
- basic string src
- basic json table

Da die Werte erst zur Laufzeit übermittelt werden, sind die Dateien nur dann lokal vorhanden, falls sie sich im Projektverzeichnis befinden oder bereits durch ein statisch konfiguriertes Widget referenziert wurden. Es findet kein Nachladen fehlender Bilder statt.

Die als separate Adapter angebotenen Icon-Sammlungen sind kein Bestandteil der App, aber die werden auch mit kopiert, wenn die Dateien in den View referenziert werden.

Auf andere Ressourcen kann innerhalb der App zugegriffen werden, wenn diese in den Views mit einem vollständigen Pfad beginnend mit http:// oder https:// angegeben werden. Diese Dateien werden nicht bei der Synchronsitation lokal auf das Gerät geladen, sondern erst bei der Anzeige der Views direkt vom jeweiligen Server.
Sollte der Zugriff auf die Datei mittels http-Authentifizierung gesichert sein, so können die Credentials in der folgenden Form in der URL eingebettet werden:
```https://[username]:[password]@[meine Domain]/vis.0/main/...```

### Verwendung von Web-Modulen anderer Adapter als VIS
Auch andere Adapter als VIS können Web-Inhalte bereitstellen. Diese Inhalte können innerhalb der VIS-Views in iFrames angezeigt werden. Dies trifft insbesondere auf die beiden Adapter Flot und Rickshaw Charts zu.

Zurzeit sind nur die Client-Bestandteile der folgenden Adapter in die App integriert:
- Flot
- Rickshaw

Um die lokale Version von Flot nutzen zu können, muss die Quelle des iFrame mit ```/flot/index.html?``` beginnen.

Andere Inhalte und auch die Inhalte anderer Server wie z.B. Webcams können ebenfalls angezeigt werden, wenn hierfür eine vollständige URL zum entsprechenden Server verwendet wird.

### Beenden der App
Die App kann wie bei Android üblich über die Home-Taste verlassen werden. In diesem Fall läuft sie jedoch im Hintergrund weiter und verbraucht weiterhin Datenvolumen und Akku.  Durch die Option *Schlafen, falls inaktiv* kann der Verbrauch reduziert werden. In diesem Fall wird die Socket.io-Verbindung jedoch jedes mal unterbrochen, wenn die App inaktiv wird.
Die App kann auch durch zweimaliges schnelles Drücken auf die Zurücktaste geschlossen werden. In diesem Fall wird die App vollständig geschlossen.
Zusätzlich bietet die App eine Möglichkeit, diese vollständig zu beenden. Hierfür ist in den Views ein basic static link-Widget einzufügen, welches als Link den folgenden Text enthält: ```javascript:logout ()```

Nachfolgend befindet sich ein entsprechendes Widget zum Import in VIS:

```
[{"tpl":"tplIconLink","data":{"href":"javascript:logout ();","target":"_self","text":"","views":null,"src":"/icons-material-png/action/ic_exit_to_app_black_48dp.png","name":"","class":""},"style":{"left":"10px","top":"10px","z-index":"106","background":"none","border-style":"none","color":"#000000","font-family":"Arial, Helvetica, sans-serif","font-size":"large","letter-spacing":"","font-weight":"bold","width":"34px","height":"32px"},"widgetSet":"jqui"}]
```

oder mit vis > 0.10.6

```
[{"tpl":"tplHtmlLogout","data":{"html":"<button>Schließen</button>","in_app_close":true},"style":{"left":"10px","top":"10px"},"widgetSet":"basic"}]
```

## Benutzerspezifische Anpassungen der App
Die in diesem Abschnitt beschriebenen Änderungen sind nur für fortgeschrittene Benutzer gedacht, die diese Änderungen auf eigene Gefahr durchführen.

Die Änderungen erfolgen ausschließlich über Javascript oder Anpassungen in der Projektdatei in VIS. Sollte die App aufgrund fehlerhafter Änderungen nicht mehr funktionieren, so können die lokalen Projektdateien durch Löschen der Anwendungsdaten in den Android Systemeinstellungen gelöscht und die Anwendung hierdurch wieder zurückgesetzt werden.

### Ausblenden des Menü-Button
Die App blendet oben links einen transparenten Schalter mit drei Punkten ein, um auf die Einstellungsseite zu gelangen.

Wenn die folgenden Zeilen im VIS-Editor unter **Skripte** eingetragen wird, wird die Fläche ausgeblendet, sobald die Views in der App geladen wurden:

```
// Menu ausblenden
if (typeof app !== 'undefined') $('#cordova_menu').hide();
```

Um auf die Einstellungsseite zu gelangen, muss das Drücken des Schalters nun direkt nach dem Start der App erfolgen, solange der Schalter angezeigt wird. Alternativ kann ein eigenes Widget zum Aufruf der Einstellungsseite in den Views platziert werden.

### Eigener Menü-Button
Das folgende Widget ruft die Einstellungsseite auf, wenn der View innerhalb der App angezeigt wird:

```
[{"tpl":"tplIconLink","data":{"href":"javascript:$('#cordova_menu').trigger('click');","target":"_self","text":"","src":"/icons-material-svg/action/ic_build_48px.svg","name":"","gestures-swiping-delta":"-1","class":""},"style":{"left":"1087px","top":"761px","z-index":"106","background":"none","border-style":"none","color":"#000000","font-family":"Arial, Helvetica, sans-serif","font-size":"large","letter-spacing":"","font-weight":"bold","width":"29px","height":"28px"},"widgetSet":"jqui"}]
```

### View-Wechsel durch horizontales Streichen über den aktuellen View (swipe)
Das nachfolgende Javascript ist im VIS-Editor unter **Skripte** eingetragen und im Array die eigenen Views in der Reihenfolge einzutragen, in der der Wechsel erfolgen soll.

Eine Streichbewegung über den View von rechts nach links wechselt zu dem View, der im Array hinter dem aktuellen View steht.
Eine Streichbewegung über den View von links nach rechts wechselt zu dem View, der im Array vor dem aktuellen View steht.
Wenn das Array-Ende bzw. der Anfang erreicht ist, wird wieder mit dem ersten bzw. letzen Eintrag fortgefahren.

```
var viewOrder = ['View 1','View 2','View 3','View 4','View 5','View 6'];

$(document).on('swipe', function (event){

  event.preventDefault();
  if (event.originalEvent.touch.delta.x < -200 && event.originalEvent.touch.delta.y > -30 && event.originalEvent.touch.delta.y < 30) {
    if (viewOrder.indexOf(vis.activeView) < viewOrder.length - 2)
      vis.changeView(viewOrder[viewOrder.indexOf(vis.activeView) + 1]);
     else
      vis.changeView(viewOrder[0]);
  } else
  if (event.originalEvent.touch.delta.x > 200 && event.originalEvent.touch.delta.y > -30 && event.originalEvent.touch.delta.y < 30) {
    if (viewOrder.indexOf(vis.activeView) > 0)
      vis.changeView(viewOrder[viewOrder.indexOf(vis.activeView) - 1]);
     else
      vis.changeView(viewOrder[viewOrder.length - 1]);
   }
});

```

Wichtig ist, mit der Streichbewegung nicht auf einem Widget sondern möglichst auf dem Hintergrund zu starten, um nicht versehentlich eine Änderung auszulösen.