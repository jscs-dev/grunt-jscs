"use strict";

module.exports = function( grunt ) {
    grunt.initConfig( {
        jscs: {
            fail: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    config: "../configs/fail.json"
                }
            },
            broken: {
                files: {
                    src: [ "../fixtures/broken.js", "../fixtures/fixture.js" ]
                },
                options: {
                    config: "../configs/fail.json"
                }
            },
            force: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    config: "../configs/fail.json",
                    force: true
                }
            },
            success: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    config: "../configs/success.json"
                }
            },
            inline: {
                files: {
                    src: "../fixtures/fixture.js"
                },
                options: {
                    "requireCurlyBraces": [ "while" ],
                    force: true
                }
            },
            "only-inline": {
                files: {
                    src: "../fixtures/only-inline.js"
                },
                options: {
                    "requireCurlyBraces": [ "while" ]
                }
            },
            merge: {
                files: {
                    src: "../fixtures/merge.js"
                },
                options: {
                    config: true,
                    "requireCurlyBraces": [ "while" ]
                }
            },

            dot: {
                files: {
                    src: ".",
                    cwd: "../fixtures/dot"
                },

                options: {
                    "disallowKeywords": [ "with" ]
                }
            },

            fix: {
                files: {
                    src: "../fixtures/fixable.js"
                },

                options: {
                    fix: true,
                    validateIndentation: 4
                }
            },

            "fix-fail": {
                files: {
                    src: "../fixtures/fixable.js"
                },

                options: {
                    fix: false,
                    validateIndentation: 4
                }
            }
        }
    } );

    grunt.loadTasks( "../../tasks" );
    grunt.registerTask( "default", "jscs" );
    grunt.registerTask( "fatal", function() {
        grunt.fatal( "test" );
    } );
};
