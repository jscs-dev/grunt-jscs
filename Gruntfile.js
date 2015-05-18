module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig( {
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [ "Gruntfile.js", "tasks/**/*.js", "test/*.js", "test/enmasse/Gruntfile.js" ]
        },
        jscs: {
            src: "<%= jshint.all %>"
        },
        nodeunit: {
            methods: "test/methods.js",
            enmasse: "test/enmasse.js"
        }
    } );

    // Load grunt tasks from NPM packages
    require( "load-grunt-tasks" )( grunt );
    require( "time-grunt" )( grunt );

    grunt.loadTasks( "tasks" );

    grunt.registerTask( "lint", [ "jshint", "jscs" ] );
    grunt.registerTask( "test", [ "lint", "nodeunit" ] );
    grunt.registerTask( "default", "test" );
};
