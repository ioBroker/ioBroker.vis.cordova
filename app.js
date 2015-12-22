/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var socketUrl;
var socketSession;
systemLang = 'en';

$.extend(systemDictionary, {
    'Ok':           {'en': 'Ok',                'de': 'Ok',                 'ru': 'Ok'},
    'Cancel':       {'en': 'Cancel',            'de': 'Abbrechen',          'ru': 'Отмена'},
    'Settings':     {'en': 'Settings',          'de': 'Einstellungen',      'ru': 'Настройки'},
    'Language':     {'en': 'Language',          'de': 'Language/Sprache',   'ru': 'Language/Язык'},
    'Socket':       {'en': 'ioBroker socket',   'de': 'ioBroker socket',    'ru': 'ioBroker сокет'},
    'System':       {'en': 'system',            'de': 'System',             'ru': 'системный'},
    'Reload':       {'en': 'Reload',            'de': 'Neuladen',           'ru': 'Обновить'},
    'Re-sync':      {'en': 'Re-sync',           'de': 'Re-sync',            'ru': 'Синхр.'},
    'Instance':     {'en': 'Instance',          'de': 'Instanz',            'ru': 'Идентификатор'},
    'Not found':    {'en': 'Not found',         'de': 'Nicht gefunden',     'ru': 'не найден'},
    'Connected':    {'en': 'Connected',         'de': 'Verbunden',          'ru': 'Соединение'},
    "Project":      {"en": "Project",           "de": "Projekt",            "ru": "Проект"},
    "yes":          {"en": "yes",               "de": "ja",                 "ru": "есть"},
    "no":           {"en": "no",                "de": "nein",               "ru": "нет"},
    "Prevent from sleep": {
        "en": "Prevent from sleep",
        "de": "Nicht einschlaffen",
        "ru": "Не засыпать"
    }
});

var app = {
    settings: {
        socketUrl:  'http://localhost:8084',
        systemLang: navigator.language || navigator.userLanguage || 'en',
        noSleep:    false,
        project:    '',
        resync:     false,
        instance:   null
    },
    loaded: false,
    projects: [],
    localDir: null,
    getLocalDir: function (dir, create, cb, index) {
        if (typeof create === 'function') {
            index  = cb;
            cb     = create;
            create = true;
        }

        if (!app.localDir) {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirHandler) {
                app.localDir = dirHandler;
                app.getLocalDir(dir, create, cb);
            });
            return;
        }
        index = index || 0;
        var parts = dir.split('/');

        app.localDir.getDirectory(parts[index], {
                create:    create,
                exclusive: false
            }, function (dirHandler) {
                if (parts.length - 1 == index) {
                    cb(null, dirHandler);
                } else {
                    app.getLocalDir(dir, create, cb, index + 1);
                }
            }, function (error) {
                cb(error);
        });
    },
    writeLocalFile: function (fileName, data, cb) {
        var parts = fileName.split('/');
        var fileN = parts.pop();
        this.getLocalDir(parts.join('/'), true, function (error, dirHandler) {
            if (error) console.error(error);
            if (dirHandler) {
                dirHandler.getFile(fileN, {create: true}, function (fileHandler) {
                    fileHandler.createWriter(function (fileWriter) {
                        fileWriter.truncate(0);
                        fileWriter.write(new Blob([data], {type:'text/plain'}));
                        cb();
                    }, function (error) {
                        cb(error);
                        console.error('Cannot write file: ' + error);
                    });
                }, function (error) {
                    cb(error);
                    console.error('Cannot create file')
                });
            }
        });
    },
    readLocalFile: function (fileName, cb) {
        var parts = fileName.split('/');
        var fileN = parts.pop();

        this.getLocalDir(parts.join('/'), false, function (error, dir) {
            if (dir) {
                dir.getFile(fileN, {create: false}, function (fileEntry) {
                    fileEntry.file(function(file) {
                        var reader = new FileReader();

                        reader.onloadend = function(e) {
                            cb(null, this.result, fileName);
                        };

                        reader.readAsText(file);
                    });
                }, function (error) {
                    if (fileName.indexOf('vis-views.json') !== -1) {
                        cb(_('Not found'), '', fileName);
                    } else {
                        cb(error, null, fileName);
                        console.error('Cannot read file: ' + error);
                    }
                });
            } else {
                if (fileName.indexOf('vis-views.json') !== -1) {
                    cb(_('Not found'), '', fileName);
                } else {
                    cb(error, null, fileName);
                    console.error('Cannot read file: ' + error);
                }
            }
        });
    },
    loadSettings: function () {
        if (typeof(Storage) !== 'undefined') {
            var value = localStorage.getItem('cordova');
            if (value) {
                try {
                    value = JSON.parse(value);
                } catch (error) {
                    console.error('Cannot parse settings');
                    value = {};
                }
            } else {
                value = {};
            }
            this.settings = $.extend(this.settings, value);

            systemLang   = this.settings.systemLang || navigator.language || navigator.userLanguage;
            socketUrl    = this.settings.socketUrl;

            // generate new Instance
            if (!this.settings.instance) {
                this.settings.instance = (Math.random() * 4294967296).toString(16);
                this.settings.instance = '0000000' + this.settings.instance;
                this.settings.instance = this.settings.instance.substring(this.settings.instance.length - 8);
            }
        }
    },
    saveSettings: function () {
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('cordova', JSON.stringify(this.settings));
        }
    },
    // Application Constructor
    initialize: function() {
        if (this.settings.systemLang.indexOf('-') != -1) {
            this.settings.systemLang = this.settings.systemLang.split('-')[0];
            systemLang = this.settings.systemLang;
        }
        app.loadSettings();

        console.log(navigator.connection.type);

        if (window.plugins.insomnia) {
            if (this.settings.noSleep) {
                window.plugins.insomnia.keepAwake();
            } else {
                window.plugins.insomnia.allowSleepAgain();
            }
        }

        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.installMenu();
        if (app.settings.project) {
            app.readLocalFile(app.settings.project + '/vis-views.json', function (error, result) {
                if (error) console.error(error);
                if (!result || app.settings.resync) {
                    app.syncVis(app.settings.project, function (viewExists) {
                        app.settings.resync = false;
                        app.saveSettings();
                        if (!viewExists) {
                            window.alert(_('No views found in %s', app.settings.project));
                        } else {
                            window.location.reload();
                        }
                    });
                }
                app.readProjects();
            });
        } else {
            app.readProjects();
        }
        if (app.settings.socketUrl == 'http://localhost:8084') {
            $('#cordova_menu').trigger('click');
        }
    },
    readProjectsHelper: function (project, cb) {
        vis.conn.readFile(project + '/vis-views.json', function (error, data, filename) {
            cb && cb(data ? project : null);
        });
    },
    readProjects: function (cb) {
        if (vis.conn.getIsConnected()) {
            app.projects = [];
            vis.conn.readDir('/vis.0', function (error, files) {
                var text  = '';
                var count = 0;
                for (var f = 0; f < files.length; f++) {
                    if (files[f].isDir) {
                        count++;
                        app.readProjectsHelper(files[f].file, function (project) {
                            if (project) {
                                app.projects.push(project);
                                text += '<option value="' + project + '" ' + (project == app.settings.project ? 'selected' : '') + '>' + project + '</option>';
                            }
                            if (!--count) {
                                $('#cordova_project').html(text);
                                cb && cb();
                            }
                        });
                    }
                }
                if (!count) {
                    $('#cordova_project').html(text);
                    cb && cb();
                }
            });
        } else {
            setTimeout(function () {
                this.readProjects(cb);
            }.bind(this), 1000);
        }
    },
    syncVis: function (dir, cb, viewExists) {
        dir = dir || '';
        viewExists = viewExists || false;

        if (vis.conn.getIsConnected()) {
            vis.conn.readDir('/vis.0/' + dir, function (error, files) {
                if (files) {
                    var count = 0;
                    for (var f = 0; f < files.length; f++) {
                        if (files[f].isDir) {
                            count++;
                            app.syncVis(dir + '/' + files[f].file, function (_viewExists) {
                                if (!--count && cb) cb(_viewExists);
                            }, viewExists);
                        } else {
                            count++;
                            vis.conn.readFile(dir + '/' + files[f].file, function (error, data, filename) {
                                if (error) console.error(error);
                                if (filename && filename.indexOf('vis-views.json') != -1) {
                                    viewExists = true;
                                    var m = data.match(/"\/vis\.0\/.+"/g);
                                    if (m) {
                                        for (var mm = 0; mm < m.length; mm++) {
                                            //file:///data/data/net.iobroker.vis/files/main/vis-user.css
                                            //cdvfile://localhost/persistent
                                            data = data.replace(m[mm], '"file:///data/data/net.iobroker.vis/files' + m[mm].substring(7));
                                        }
                                    }

                                    m = data.match(/"\/vis\/.+"/g);
                                    if (m) {
                                        for (var mm = 0; mm < m.length; mm++) {
                                            data = data.replace(m[mm], '"' + m[mm].substring(6));
                                        }
                                    }
                                }
                                if (data) {
                                    app.writeLocalFile(filename.replace(/^\/vis\.0\//, ''), data, function (error) {
                                        if (error) console.error(error);
                                        if (!--count && cb) cb(viewExists);
                                    });
                                } else if (!--count && cb) {
                                    cb(viewExists);
                                }
                            }, true);
                        }
                    }
                    if (!count && cb) cb(viewExists);
                } else if (cb) {
                    cb(viewExists);
                }
            });
        } else {
            setTimeout(function () {
                this.syncVis(dir, cb, viewExists);
            }.bind(this), 1000);
        }
    },
    connectionChange: function (connected) {
        $('#cordova_connected').html('<span style="color:' + (connected ? 'green">' + _('yes') : 'red">' + _('no')) + '</span>');
    },
    installMenu: function () {
        // install menu button
        $('body').append('<div id="cordova_menu"   style="bottom: 0.5em; left: 0.5em; padding-left: 0.5em; padding-right: 0.5em; position: absolute; background: rgba(0,0,0,0.1); border-radius: 20px; z-index: 5001" id="cordova_menu">...</div>');
        $('body').append('<div id="cordova_dialog_bg" style="position: absolute; top:0; right: 0; left: 0; bottom: 0; background: black; opacitiy: 0.1;display: none; z-index: 5002"></div>' +
            '<div id="cordova_dialog" style="background: #d3d3d3; top: 1em; left: 1em; bottom: 1em; right: 1em; position: absolute; border-radius: 0.3em; border: 1px solid grey; display: none; z-index: 5003">' +
            '<h1 style="padding-left: 1em;">' + _('Settings') + '</h1>' +
            '<table style="width: 100%; padding: 1em">' +
            '<tr><td>' + _('Connected') + ':</td><td><div id="cordova_connected"></div></td></tr>'+
            '<tr><td>' + _('Language') + ':</td><td><select data-name="systemLang" class="cordova-setting" style="width: 100%">' +
            '<option value="">' + _('System') + '</option>' +
            '<option value="en">english</option>' +
            '<option value="de">deutsch</option>' +
            '<option value="ru">русский</option>' +
            '</select></td></tr>'+
            '<tr><td>' + _('Socket') + ':</td><td><input data-name="socketUrl"  class="cordova-setting" style="width: 100%"></td></tr>'+
            '<tr><td>' + _('Prevent from sleep') + ':</td><td><input type="checkbox" data-name="noSleep"  class="cordova-setting"></td></tr>'+
            '<tr><td>' + _('Project') + ':</td><td><select data-name="project" id="cordova_project" class="cordova-setting" style="width: 100%">' +
            '<tr><td>' + _('Instance') + ':</td><td><input data-name="instance" class="cordova-setting" style="width: 100%"></td></tr>'+
            '</select></td></tr>'+
            '</table>' +
            '<div style="position: absolute; bottom: 1em; right: 1em; display: inline-block">' +
            '<button id="cordova_reload">' + _('Reload') + '</button>' +
            '<button id="cordova_resync">' + _('Re-sync') + '</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<button id="cordova_ok">' + _('Ok') + '</button>&nbsp;' +
            '<button id="cordova_cancel">' + _('Cancel') + '</button></div>' +
            '</div>');

        $('#cordova_menu').click(function () {
            // load settings
            $('#cordova_dialog .cordova-setting').each(function() {
                if ($(this).attr('type') === 'checkbox') {
                    $(this).prop('checked', app.settings[$(this).data('name')]);
                } else {
                    $(this).val(app.settings[$(this).data('name')]);
                }
            });
            app.connectionChange(vis.conn.getIsConnected());
            $('#cordova_dialog_bg').show();
            $('#cordova_dialog').show();
        });
        $('#cordova_cancel').click(function () {
            $('#cordova_dialog_bg').hide();
            $('#cordova_dialog').hide();
        }).css({height: '2em'});

        $('#cordova_reload').click(function () {
            var changed = false;
            // save settings
            $('#cordova_dialog .cordova-setting').each(function() {
                if ($(this).attr('type') === 'checkbox') {
                    if (app.settings[$(this).data('name')] != $(this).prop('checked')) {
                        changed = true;
                        return false;
                    }
                } else {
                    if (app.settings[$(this).data('name')] != $(this).val()) {
                        changed = true;
                        return false;
                    }
                }
            });

            if (changed && !window.confirm(_('Discard changes?'))) return;

            $('#cordova_dialog_bg').hide();
            $('#cordova_dialog').hide();
            window.location.reload();
        }).css({height: '2em'});

        $('#cordova_resync').click(function () {
            var changed = false;

            // save settings
            $('#cordova_dialog .cordova-setting').each(function() {
                if ($(this).attr('type') === 'checkbox') {
                    if (app.settings[$(this).data('name')] != $(this).prop('checked')) {
                        changed = true;
                        return false;
                    }
                } else {
                    if (app.settings[$(this).data('name')] != $(this).val()) {
                        changed = true;
                        return false;
                    }
                }
            });

            if (changed && !window.confirm(_('Discard changes?'))) return;

            $('#cordova_dialog_bg').hide();
            $('#cordova_dialog').hide();
            app.settings.resync = true;
            app.saveSettings();
            window.location.reload();
        }).css({height: '2em'});

        $('#cordova_ok').click(function () {
            $('#cordova_dialog_bg').hide();
            $('#cordova_dialog').hide();
            var changed = false;
            var projectChanged = false;

            // save settings
            $('#cordova_dialog .cordova-setting').each(function() {
                if ($(this).attr('type') === 'checkbox') {
                    if (app.settings[$(this).data('name')] != $(this).prop('checked')) {
                        app.settings[$(this).data('name')] = $(this).prop('checked');
                        changed = true;
                    }
                } else {
                    if (app.settings[$(this).data('name')] != $(this).val()) {
                        app.settings[$(this).data('name')] = $(this).val();
                        changed = true;
                        if ($(this).data('name') === 'project') projectChanged = true;
                    }
                }
            });

            if (changed) {
                // If project name changed
                if (projectChanged && vis.conn.getIsConnected()) {
                    // try to load all files
                    app.syncVis(app.settings.project, function (viewExists) {
                        app.settings.resync = false;
                        app.saveSettings();
                        if (!viewExists) {
                            window.alert(_('No views found in %s', app.settings.project));
                        } else {
                            window.location.reload();
                        }
                    });
                } else {
                    app.saveSettings();
                    window.location.reload();
                }
            }
        }).css({height: '2em'});
    },
    receivedEvent: function(event) {
        console.log('Received Event: ' + event);
    }
};

app.initialize();