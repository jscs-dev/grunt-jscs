"use strict";

module.exports = function( grunt ) {
    grunt.initConfig({
        jscs: {
            fail: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    config: "../configs/fail.json",
                }
            },
            success: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    config: "../configs/success.json",
                }
            },
            inline: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    "requireCurlyBraces": [ "while" ]
                }
            },
            exclude: {
                files: {
                    src: "../fixtures/exclude.js"
                },
                options: {
                    config: "../configs/exclude.json",
                }
            },
            additional: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    config: "../configs/additional.json"
                }
            },
            config: "../fixtures/fixture.js"
        }
    });

    grunt.loadTasks( "../../tasks" );
    grunt.registerTask( "default", "jscs" );
};
