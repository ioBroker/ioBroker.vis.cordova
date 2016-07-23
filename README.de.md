WEB-Visualisierung für ioBroker Plattform als Android-App.

Diese Die App ist konzipiert für Smartphone und Tablet. Das vis-Projekt und alle Bilder werden auf dem Smartphone gespeichert um den mobilen Datenverkehr zu verringern.

## Verwendung
Diese App benötigt einen installierten, aktivierten Web-Adapter oder socket-io-Adapter und einen installierten vis-Adapter. Bei aktiviertem Web-Server, muss das interne Socket-IO-Interface aktiviert sein.
In Vis sollte ein Projekt vorhanden sein, z.B. "Main".

Die Ports und der ioBroker Server muss vom Mobiltelefon erreichbar sein.

Installiere die App über App Store. Nachdem die Anwendung zum ersten Mal starten sollte der Einstellungsdialog automatisch geöffnet werden. Um die Arbeit mit der App zu starten öffne die Einstellungen.

Um die Einstellungen anzuzeigen, drücke die halbtransparenten Schaltfläche in der linken oberen Ecke.
! [Settings] (img / menu.png)

## Einstellungen
Fast alle Einstellungen sind optional mit Ausnahme von "WIFI Socket" und "Project".

### Buttons
- *Reload* - Läd die Web-Engine neu, als würde man die Schaltfläche "Aktualisieren" im Browser drücken.
- *Re-Sync* - Wenn einige Änderungen an dem vis-Projekt vorgenommen wurden, wird es **nicht** automatisch in die App geladen. Dazu, muss die "Re-Sync" Taste gedrückt werden. Alle Projektdateien und Bilder werden auf dem Smartphone neu geladen. Das wird gemacht, um den mobilen Datenverkehr zu verringern und den Start der Anwendung zu beschleunigen. Das lesen der Dateien von der internen SD-Card ist viel schneller, als vom ioBroker Server.
Wenn die Option *Schlafen, falls inaktiv* aktiviert ist, darf während der Synchronisation das Telefon nicht inaktiv werden, da ansonsten die Socket.io-Verbindung unterbrochen und die Synchronisation abgebrochen wird.
- *OK* - Alle Änderungen speichern und die WEB-Engine neu starten. Es wird keine Synchronisation durchgeführt, wenn das Projekt noch nicht definiert wurde. Um Änderungen vom ioBroker vis-Projekt neu zu laden benutze die "Re-Sync" -Taste.
- *Cancel* - Alle Änderungen verwerfen und Dialog schließen.

### Konnektivität
App kann über SSID-Namen erkennen, ob das Smartphone im Heimnetzwerk oder außerhalb des Heimnetzwerkes ist und benutzt für das Heimnetzwerk und für Außerhalb verschiedenen Socket-URLs und Login-Daten.

Normalerweise gibt es im Heimnetzwerk keine Authentifizierung und die Verbindung läuft über HTTP (unsicher). Im externen Netzwerk geht die Verbindung über https (verschlüsselt) und mit Login / Passwort.

- *Connected* - zeigt an, ob die App mit ioBroker Server verbunden ist.
- *WIFI SSID* - Namen oder die Namen (geteilt durch Komma) der Heimnetzwerk SSID. Es wird für die Verbindung die Anmeldeinformationen und die Home-URL des Heimnetzwerks verwendet.
- *WIFI-Socket* - URL wie ```http://192.168.0.5:8082```. Es ist wichtig, http oder https zu Beginn zu haben, dadurch kann die App zwischen sicheren und unsicheren Verbindungen unterscheiden. Port ist auch wichtig. Normalerweise 8082 für *Web* oder 8084 für *socketio*.
- *WIFI User* - wenn für die Socket-Kommunikation die Authentifizierung aktiviert ist, tragen Sie hier den Benutzernamen von iobroker ein. Benutzer müssen zunächst über die "admin" Schnittstelle erstellt werden. Der Benutzer "admin" existiert immer und kann nicht gelöscht werden.
- *WIFI Password* - Benutzer-Passwort, wie in ioBroker gesetzt
- *WIFI Password repeat* - Wiederholung des Benutzer-Passworts

Folgende Einstellungen sind nur aktiv, wenn einige SSID angegeben sind und das Gerät sich derzeit außerhalb dieser SSID befindet.
- *Cell Socket* - das gleiche wie *WIFI Socket*, wird aber außerhalb des Heimnetzes verwendet.
- *Cell User* - das gleiche wie *WIFI User*, wird aber außerhalb des Heimnetzes verwendet.
- *Cell Password* - das gleiche wie *WIFI Password*, wird aber außerhalb des Heimnetzes verwendet.
- *Cell Password repeat* - das gleiche wie *WIFI Password repeat*, wird aber außerhalb des Heimnetzes verwendet.

### Projektname und Spracheinstellungen
- *Language* - Sprache der Einstellungs-Dialog. Englisch, Deutsch und Russisch werden unterstützt. Um die Änderungen zu aktivieren, * OK * Taste drücken.
- *Project* - Projektname von ioBroker. Wenn kein Projektname angezeigt wird, besteht keine Verbindung mit iobroker oder es existiert kein Projekt.

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
- Alle Bilder mit den Dateiendungen ```.png .jpg .jpeg .gif``` sowie Dateien mit der Endung ```.wav .mp3 .bmp .svg```, welche sich ein einem Adapterverzeichnis unter [iobroker-datenverzeichnis]/files/ befinden und im View angegeben sind und bei denen im ersten Unterverzeichnis unter [iobroker-datenverzeichnis]/files/ ein "." im Verzeichnisnamen ist.

Damit die App die Pfade richtig ersetzt, müssen die Dateien mit einem absoluten lokalen Pfad angegeben werden (z.B. /vis./main/img/test.png). Relative Pfadangaben werden nicht unterstützt. Wenn Pfade in den Widgets in HTML eingebettet ist, muss die Schreibweise genau dem folgenden Muster entsprechen ```<img src='/vis.0/main...'``` oder ```<img src="/vis.0/main..."```. Andere Schreibweisen werden nicht erkannt. 
Zusätzlich kann in den Einstellungen eine *Substitution URL* angegben werden. Hierbei handelt es sich um die externe URL des Webservers von VIS. Alle URL, die mit der angegebenen Zeichenfolge anfangen, werden ebenfalls so behandelt, als ob es lokale Dateien sind (z.B. ```https://[meine Domain]/visweb```).

Die Ersetzung von Pfaden zur Laufzeit beschränkt sich zurzeit auf die folgenden Widgets:
- basic string (unescaped)
- basic string src
- basic json table

Da die Werte erst zur Laufzeit übermittelt werden, sind die Dateien nur dann lokal vohanden, falls sie sich im Projektverzeichnis befinden oder bereits durch ein statisch konfiguriertes Widget referenziert wurden. Es findet kein Nachladen fehlender Bilder statt.
Die als separate Adapter angebotenen Icon-Sammlungen sind kein Bestandteil der App. Falls Bilder aus diesen Sammlungen in der App angezeigt werden sollen, so müssen diese zuvor in das Projektverzeichnis kopiert werden.

Auf andere Ressourcen kann innerhalb der App zugegriffen werden, wenn diese in den Views mit einem vollständigen Pfad beginnend mit http:// oder https:// angegeben werden. Diese Dateien werden nicht bei der Synchronsitation lokal auf das Gerät geladen sondern erst bei der Anzeige der Views direkt vom jeweiligen Server.
Sollte der Zugriff auf die Datei mittels http-Authentifizierung gesichert sein, so können die Credentials in der folgenden Form in der URL eingebettet werden:
```https://[username]:[password]@[meine Domain]/vis.0/main/...```

### Verwendung von Web-Modulen anderer Adapter als VIS
Auch andere Adapter als VIS können Web-Inhalte bereitstellen. Diese Inhalte können innerhalb der VIS-Views in iFrames angezeigt werden. Dies trifft insbesondere auf die beiden Adapter Flot und Rickshaw Charts zu. 

Zurzeit sind nur die Client-Bestandteile der folgenden Adapter in die App integriert:
- Flot

Um die lokale Version von Flot nutzen zu können, muss die Quelle des iFrame mit ```/lot/index.html?``` beginnen. 

Andere Inhalte und auch die Inhalte anderer Server wie z.B. Webcams können ebenfalls angezeigt werden, wenn hierfür eine vollständige URL zum entsprechenden Server verwendet wird.

### Beenden der App
Die App kann wie bei Android überlich über die Home-Taste verlassen werden. In diesem Fall läuft sie jedoch im Hintergrund weiter und verbraucht weiterhin Datenvolumen und Akku.  Durch die Option *Schlafen, falls inaktiv* kann der Verbrauch reduziert werden. In diesem Fall wird die Socket.io-Verbindung jedoch jedes mal unterbrochen, wenn die App inaktiv wird.
Zusätzlich bietet die App eine Möglichkeit, diese vollständig zu beenden. Hierfür ist in den Views ein basic static link-Widget einzufügen, welches als Link den folgenden Text enthält: ```javascript:logout ()```



