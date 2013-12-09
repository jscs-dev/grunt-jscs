module.exports = function( grunt ) {
    "use strict";

    var jscs = require( "./lib/jscs" ).init( grunt ),
        defaults = {
            config: ".jscs.json"
        };

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var errorCount, i,
            options = this.options( defaults ),
            checker = jscs.checker( options ),
            files = this.filesSrc,
            done = this.async();

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
