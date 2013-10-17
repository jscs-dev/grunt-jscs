module.exports = function( grunt ) {
    "use strict";

    var fs = require( "fs" );
    var path = require( "path" );
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

        function update() {
            i++;

            // Does all promises have been run?
            if ( i === files.length ) {
                if ( errorCount > 0 ) {
                    grunt.log.error( errorCount + " code style errors found!" );
                    done( false );
                } else {
                    // Shows the number of OK files, as per #5
                    grunt.log.ok( files.length + " without code style errors." );
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
                if ( !errors.isEmpty() ) {
                    errors.getErrorList().forEach(function( error ) {
                        errorCount++;
                        grunt.log.writeln( errors.explainError( error, true ) );
                    });
                }

               update();
           });
        });
    });
};