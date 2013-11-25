module.exports = function( grunt ) {
    "use strict";

    var fs = require( "fs" );
    var path = require( "path" );
    var builder = require( "xmlbuilder" );
    var Checker = require( "jscs/lib/checker" );
    var defaults = {
        config: ".jscs.json"
    };

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var errorCount, i;
        var jscs = new Checker();
        var options = this.options( defaults );
        var cfgPath = options.config;
        var files = this.filesSrc;
        var done = this.async();
        var junitXML = options.junit ? builder.create( "testsuites" ) : null;

        if ( !grunt.file.isPathAbsolute( cfgPath ) ) {
            // Prepend the cwd, as jscs does via CLI
            cfgPath = process.cwd() + "/" + options.config;
        }

        if ( !fs.existsSync( cfgPath ) ) {
            // Can go further without an config file.
            // TODO: Accept all jscs configs in the options object.
            grunt.fail.fatal( "The config file " + options.config + " was not found!" );
        }

        jscs.registerDefaultRules();
        jscs.configure( require( cfgPath ) );

        errorCount = i = 0;

        if ( junitXML ) {
            junitXML.ele( "testsuite", {
                name: "JSCS",
                timestamp: ( new Date() ).toISOString().substr( 0, 19 )
            });
        }

        function update() {
            i++;

            // Does all promises have been run?
            if ( i === files.length ) {
                if ( junitXML ) {
                    junitXML.att( "tests", files.length );
                    junitXML.att( "errors", errorCount );

                    grunt.file.write( options.junit, junitXML.end() );
                }

                if ( errorCount > 0 ) {
                    grunt.log.ok( errorCount + " code style errors found!" );

                    done( false );
                } else {
                    // Shows the number of OK files, as per #5
                    grunt.log.ok( files.length + " files without code style errors." );

                    done( true );
                }
            }
        }

        files.map( jscs.checkFile, jscs ).forEach(function( promise ) {
            if ( !promise ) {
                update();
                return;
            }

            promise.then(function( errors ) {
                if ( junitXML ) {
                    var spec = junitXML.ele( "testcase", {
                      name: errors.getFilename()
                    });
                }

                if ( !errors.isEmpty() ) {
                    errors.getErrorList().forEach(function( error ) {
                        errorCount++;
                        grunt.log.writeln( errors.explainError( error, true ) );

                        if ( junitXML ) {
                            spec.ele( "failure", {}, errors.explainError( error ) );
                        }
                    });
                }

               update();
           });
        });
    });
};