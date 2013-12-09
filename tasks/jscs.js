"use strict";

var Vow = require( "vow" );

module.exports = function( grunt ) {

    var JSCS = require( "./lib/jscs" ).init( grunt ),
        defaults = {
            config: ".jscs.json"
        };

    grunt.registerMultiTask( "jscs", "JavaScript Code Style checker", function() {
        var options = this.options( defaults ),
            jscs = new JSCS( options ),
            checks = this.filesSrc.map(function( path ) {
                return jscs.check( path );
            }),
            done = this.async();

        Vow.all( checks ).then(function( results ) {
            var errors = [].concat.apply( [], results );

            jscs.report( errors ).notify( errors );

            done( !jscs.count( errors ) );
        });
    });
};
