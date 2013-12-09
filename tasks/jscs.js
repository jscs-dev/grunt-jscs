module.exports = function( grunt ) {
    "use strict";

    var fs = require( "fs" ),
        jscs = require( "./lib/jscs" ).init( grunt ),
        builder = require( "xmlbuilder" ),
        Checker = require( "jscs/lib/checker" ),
        defaults = {
            config: ".jscs.json"
        };

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var errorCount, i,
            checker = new Checker(),
            options = this.options( defaults ),
            config = jscs.getConfig( options ),
            files = this.filesSrc,
            done = this.async(),
            junitXML = options.junit ? builder.create( "testsuites" ) : null;

        checker.registerDefaultRules();
        checker.configure( config );

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
                    grunt.log.error( errorCount + " code style errors found!" );

                    done( false );
                } else {
                    // Shows the number of OK files, as per #5
                    grunt.log.ok( files.length + " files without code style errors." );

                    done();
                }
            }
        }

        files.map( checker.checkFile, checker ).forEach(function( promise ) {
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
