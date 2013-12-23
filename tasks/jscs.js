"use strict";

var Vow = require( "vow" );

module.exports = function( grunt ) {

    var filter = Array.prototype.filter,
        JSCS = require( "./lib/jscs" ).init( grunt );

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var done = this.async(),
            options = this.options(),

            // either if it was configured with that option or passed through cli command
            force = grunt.option( "force" ) || options.force,
            jscs = new JSCS( options ),
            checks = this.filesSrc.map(function( path ) {
                return jscs.check( path );
            });

        grunt.option( "force", force );

        Vow.allResolved( checks ).spread(function() {

            // Filter unsuccessful promises
            var results = filter.call( arguments, function( promise ) {
                return promise.isFulfilled();

            // Make array of errors
            }).map(function( promise ) {
                return promise.valueOf()[ 0 ];
            });

            jscs.setErrors( results ).report().notify();

            done( !jscs.count() );
        });
    });
};
