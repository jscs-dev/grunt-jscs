module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig({
        bump: {
            options: {
                files: [ "package.json" ],

                // Commit
                commit: true,
                commitMessage: "Release v%VERSION%",
                commitFiles: [ "package.json" ],

                // Tag
                createTag: true,
                tagName: "%VERSION%",
                tagMessage: "Version %VERSION%",

                // Push
                push: true,
                pushTo: "origin"
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [ "Gruntfile.js", "tasks/**/*.js", "test/*.js", "test/enmasse/Gruntfile.js" ]
        },
        jscs: {
            src: "<%= jshint.all %>",
            options: {
                preset: "jquery"
            }
        },
        nodeunit: {
            methods: "test/methods.js",
            enmasse: "test/enmasse.js"
        }
    });

    // Load grunt tasks from NPM packages
    require( "load-grunt-tasks" )( grunt );

    grunt.loadTasks( "tasks" );

    grunt.registerTask( "test", "nodeunit" );
    grunt.registerTask( "default", [ "jshint", "jscs", "nodeunit" ] );
};
