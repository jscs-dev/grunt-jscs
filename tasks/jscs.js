"use strict";

var Vow = require( "vow" );

module.exports = function( grunt ) {

    var filter = Array.prototype.filter,
        JSCS = require( "./lib/jscs" ).init( grunt );

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var done = this.async(),
            options = this.options({

                // `null` is a default value, but its equivalent to `true`,
                // With this way it's easy to distinguish specified value
                config: null
            }),

            jscs = new JSCS( options ),
            runs = this.filesSrc.map( jscs.checker.execute, jscs.checker );

        Vow.allResolved( runs ).spread(function() {
            var results = [];

            // Filter unsuccessful promises
            filter.call( arguments, function( promise ) {
                return promise.isFulfilled();

            // Make array of errors
            }).forEach(function( promise ) {
                results.push.apply( results, promise.valueOf() );
            });

            jscs.setErrors( results ).report().notify();

            done( options.force || !jscs.count() );
        });
    });
};
