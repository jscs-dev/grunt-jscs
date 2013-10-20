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
            all: [ "Gruntfile.js", "tasks/*.js" ]
        },
        jscs: {
            all: "<%= jshint.all %>"
        }
    });

    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-bump" );
    grunt.loadTasks( "tasks" );

    grunt.registerTask( "default", [ "jshint", "jscs" ] );
};