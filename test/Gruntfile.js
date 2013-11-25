"use strict";

module.exports = function( grunt ) {
    grunt.initConfig({
        jscs: {
            fail: {
                files: {
                    src: "fixtures/fixture.js"
                },
                options: {
                    config: "configs/fail.json",
                    junit: "jscs-output.xml"
                }
            },
            success: {
                files: {
                    src: "fixtures/fixture.js"
                },
                options: {
                    config: "configs/success.json",
                    junit: "jscs-output.xml"
                }
            },
            exclude: {
                files: {
                    src: "fixtures/exclude.js"
                },
                options: {
                    config: "configs/exclude.json",
                    junit: "jscs-output.xml"
                }
            },
            config: "fixtures/fixture.js"
        }
    });

    grunt.loadTasks( "../tasks" );
    grunt.registerTask( "default", "jscs" );
};
