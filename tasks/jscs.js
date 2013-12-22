"use strict";

var Vow = require( "vow" );

module.exports = function( grunt ) {

    var concat = Array.prototype.concat,
        JSCS = require( "./lib/jscs" ).init( grunt );

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var done = this.async(),
            options = this.options(),
            jscs = new JSCS( options ),
            checks = this.filesSrc.map(function( path ) {
                return jscs.check( path );
            });

        Vow.any( checks ).then(function( results ) {
            jscs.setErrors( concat.apply( [], results ) ).report().notify();

            done( options.force ? true : !jscs.count() );
        });
    });
};
