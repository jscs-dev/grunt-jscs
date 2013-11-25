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
            all: [ "Gruntfile.js", "tasks/*.js", "test/*.js" ]
        },
        jscs: {
            all: {
                files: {
                    src: "<%= jshint.all %>"
                },
                options: {
                    junit: "jscs-output.xml"
                }
            }
        },
        nodeunit: {
            test: "test/test.js"
        }
    });

    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-nodeunit" );
    grunt.loadNpmTasks( "grunt-bump" );
    grunt.loadTasks( "tasks" );

    grunt.registerTask( "default", [ "jshint", "jscs", "nodeunit" ] );
};