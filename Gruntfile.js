// To use this file in WebStorm, right click on the file name in the Project Panel (normally left) and select "Open Grunt Console"

/** @namespace __dirname */
/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

// ## How to build
//
// ```
// npm install
// grunt release
// or
// grunt build
// ```
//
// Output is in ```ioBroker.vis.cordova\platforms\android\build\outputs\apk```
//
// To test it on android Handy:
// ```
// cordova run android
// ```

// How to create release:
// extend platforms/android/release-signing.properties with
//      keyPassword=xxx
//      storePassword=xxx
//
// Copy ioBroker.vis.keystore into platforms/android/ and
// run "grunt release"

module.exports = function (grunt) {

    var srcDir    = __dirname + '/';
    var pkg       = grunt.file.readJSON('package.json');
    var version   = pkg.version;

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        clean: {
            all: ['www/**/*']
        },
        replace: {
            core: {
                options: {
                    patterns: [
                        {
                            match: /var version = *'[\.0-9]*';/g,
                            replacement: "var version = '" + version + "';"
                        },
                        {
                            match: /version="[\.0-9]*"/g,
                            replacement: 'version="' + version + '"'
                        },
                        {
                            match: /"version": *"[\.0-9]*",/g,
                            replacement: '"version": "' + version + '",'
                        },
                        {
                            match: /version: *"[\.0-9]*",/,
                            replacement: 'version: "' + version + '",'
                        },
                        {
                            match: /version: *'[\.0-9]*',/,
                            replacement: "version: '" + version + "',"
                        },                        {
                            match: /<!-- ioBroker\.vis Version [\.0-9]+ -->/,
                            replacement: '<!-- ioBroker.vis Version ' + version + ' -->'
                        },
                        {
                            match: /# ioBroker\.vis Version [\.0-9]+/,
                            replacement: '# ioBroker.vis Version ' + version
                        },
                        {
                            match: /# ioBroker\.flot version = *'[\.0-9]*';/g,
                            replacement: "ioBroker.flot version = '" + version + "';"
                        },
                        {
                            match: /# ioBroker\.rickshaw version = *'[\.0-9]*';/g,
                            replacement: "ioBroker.rickshaw version = '" + version + "';"
                        },
                        {
                            match: /# dev build [\.0-9]+/g,
                            replacement: '# dev build 0'
                        }
                    ]
                },
                files: [
                    {
                        expand:  true,
                        flatten: true,
                        src:     [
                            srcDir + 'config.xml',
                            srcDir + 'package.json',
                            srcDir + 'io-package.json'
                        ],
                        dest:    srcDir
                    }
                ]
            },
            index: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/\.\.\//g,
                            replacement: ''
                        },
                        {
                            match: /<script type="text\/javascript" src="_socket\/info\.js"><\/script>/,
                            replacement: ''
                        },
						{
                            match: /<script type="text\/javascript" src="\/_socket\/info\.js"><\/script>/,
                            replacement: ''
                        },
                        /*{
                            match: /<script type="text\/javascript" src="lib\/js\/quo\.standalone\.js"><\/script>/,
                            replacement: ''
                        },*/
                        {
                            match: /<link rel="stylesheet" type="text\/css" href="css\/vis-common-user\.css" \/>/,
                            replacement: '<link rel="stylesheet" type="text/css" href="file:///data/data/net.iobroker.vis/files/vis-common-user.css" />'
                        },
						{
                            match: /<script type="text\/javascript" src="\/lib\//g,
                            replacement: '<script type="text/javascript" src="file:///android_asset/www/lib/'
                        }
                    ]
                },
                files: [
                    {
                        expand:  true,
                        flatten: true,
                        src:     [
                                'www/index.html'
                        ],
                        dest:    'www'
                    },
					{
                        expand:  true,
                        flatten: true,
                        src:     [
                                'www/flot/index.html'
                        ],
                        dest:    'www/flot'
                    },
                    {
                        expand:  true,
                        flatten: true,
                        src:     [
                            'www/rickshaw/index.html'
                        ],
                        dest:    'www/rickshaw'
                    }
                ]
            }
        },
        // Javascript code styler
        jscs:   require(__dirname + '/tasks/jscs.js'),
        // Lint
        jshint: require(__dirname + '/tasks/jshint.js'),
        http: {
            get_jscsRules: {
                options: {
                    url: 'https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/tasks/jscsRules.js'
                },
                dest: 'tasks/jscsRules.js'
            }
        },
        copy: {
            vis: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'node_modules/iobroker.vis/www/',
                        src: [
                            '**',
                            '!edit.html',
                            '!offline.html',
                            '!cahce.manifest',
                            '!js/visEdit.js',
                            '!js/visEditExt.js',
                            '!js/visEditInspect.js',
                            '!js/visEditWelcome.js',
                            '!js/visWizard.js',
                            '!js/connSignalR.js',
                            '!js/visLang.js',
                            '!js/fm/*/**',
                            '!css/vis_editor.css',
                            '!icon/*',
                            '!offline.html',
                            '!cache.manifest',
                            '!cordova.js',
                            '!js/app.js',
                            '!lib/ace/*/**',
                            '!lib/css/fancytree/*/**',
                            '!lib/css/superfish/*/**',
                            '!lib/img/*',
                            '!lib/js/add2home-2.0.8.js',
                            '!lib/js/colResizable-1.5.min.js',
                            '!lib/js/dropzone.js',
                            '!lib/js/farbtastic.js',
                            '!lib/js/html2canvas.min.js',
                            '!lib/js/jquery-1.11.2.min.js',
                            '!lib/js/jquery-1.11.2.min.map',
                            '!lib/js/jquery-ui-1.10.3.dragdropsort.min.js',
                            '!lib/js/jquery-ui-1.11.4.full.min.js',
                            '!lib/js/jquery.ba-resize.min.js',
                            '!lib/js/jquery.base64.min.js',
                            '!lib/js/jquery.fancytree-all.min.js',
                            '!lib/js/jquery.inputmask.bundle.min.js',
                            '!lib/js/jquery.jgrowl.map',
                            '!lib/js/jquery.jgrowl.min.js',
                            '!lib/js/jquery.multiselect.filter-1.5pre.js',
                            '!lib/js/jquery.ui.datepicker.min.js',
                            '!lib/js/jquery.wakeup.js',
                            '!lib/js/jqueryui.selectmenu.js',
                            '!lib/js/superclick.js'
                        ],
                        dest: 'www'
                    }
                ]
            },
		    flot: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'node_modules/iobroker.flot/www/',
                        src: [
                            '**',
                            '!edit.html'
                        ],
                        dest: 'www/flot'
                    }
                ]
            },
            rickshaw: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'node_modules/iobroker.rickshaw/www/',
                        src: [
                            '**',
                            '!edit.html'
                        ],
                        dest: 'www/rickshaw'
                    }
                ]
            },

            web: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/iobroker.web/www/',
                        src: ['lib/css/themes/**', 'lib/js/jquery-1.11.2.min.*', 'lib/js/jquery-ui-1.11.4.full.min.js', 'lib/js/socket.io.js'],
                        dest: 'www'
                    }
                ]
            },
            app: {
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: ['app.js'],
                        dest: 'www/js'
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: ['app.css'],
                        dest: 'www/css'
                    }
                ]
            }
        },
        exec: {
            build: {
                cwd: '.',
                cmd: 'cordova.cmd build android'
            },
            run: {
                cwd: '.',
                cmd: 'cordova.cmd run android'
            },
            release: {
                cwd: '.',
                cmd: 'cordova.cmd build android --release'
            }
        }
    });

    grunt.registerTask('updateReadme', function () {
        var readme = grunt.file.read('README.md');
        var pos = readme.indexOf('## Changelog');
        if (pos !== -1) {
            var readmeStart = readme.substring(0, pos + '## Changelog\r'.length);
            var readmeEnd   = readme.substring(pos + '## Changelog\r'.length);

            if (iopackage.common && readme.indexOf(iopackage.common.version) === -1) {
                var timestamp = new Date();
                var date = timestamp.getFullYear() + '-' +
                    ("0" + (timestamp.getMonth() + 1).toString(10)).slice(-2) + '-' +
                    ("0" + (timestamp.getDate()).toString(10)).slice(-2);

                var news = "";
                if (iopackage.common.whatsNew) {
                    for (var i = 0; i < iopackage.common.whatsNew.length; i++) {
                        if (typeof iopackage.common.whatsNew[i] === 'string') {
                            news += '* ' + iopackage.common.whatsNew[i] + '\r\n';
                        } else {
                            news += '* ' + iopackage.common.whatsNew[i].en + '\r\n';
                        }
                    }
                }

                grunt.file.write('README.md', readmeStart + '### ' + iopackage.common.version + ' (' + date + ')\r\n' + (news ? news + '\r\n\r\n' : '\r\n') + readmeEnd);
            }
        }
    });

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build-vis', function () {
        var syncWidgetSets = require(__dirname + '/node_modules/iobroker.vis/lib/install');
        syncWidgetSets();
    });

    grunt.registerTask('default', [
        'replace:core',
        'updateReadme',
        'jshint',
        'jscs'
    ]);
	
	grunt.registerTask('prepublish', ['replace', 'updateReadme']);
	grunt.registerTask('p', ['prepublish']);
    grunt.registerTask('build',     ['build-vis', 'copy', 'replace', 'exec:build']);
    grunt.registerTask('run',       ['build-vis', 'copy', 'replace', 'exec:run']);
    grunt.registerTask('release',   ['build-vis', 'copy', 'replace', 'exec:release']);
};
