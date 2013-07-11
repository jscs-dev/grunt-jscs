module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig({
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
    grunt.loadTasks( "tasks" );

    grunt.registerTask( "default", [ "jshint", "jscs" ] );
};