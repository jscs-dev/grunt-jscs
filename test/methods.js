"use strict";

var grunt = require( "grunt" ),
    jscs = require( "../tasks/lib/jscs" ).init( grunt );

module.exports = {
    getConfig: function( test ) {
        var result,
            config = {
                config: "test/configs/example.json"
            };

        result = jscs.getConfig( config );
        test.equal( result.example, "test", "should find config at local path" );

        config.config = process.cwd() + "/" + config.config;
        result = jscs.getConfig( config );
        test.equal( result.example, "test", "should find config at absolute path" );

        config = {
            requireCurlyBraces: [ "if" ],
            config: "test.js"
        };

        result = jscs.getConfig( config );

        test.ok( !result.example, "should have find config file with inline option" );
        test.ok( !result.config, "config option should have been removed" );
        test.ok( Array.isArray( result.requireCurlyBraces ),
                "\"requireCurlyBraces\" option should have been preserved" );

        config = {
            requireCurlyBraces: [ "if" ],
        };

        test.ok( Array.isArray( result.requireCurlyBraces ),
                "\"requireCurlyBraces\" option should have been preserved" );

        test.done();
    },

    findConfig: function( test ) {
        var result;

        result = jscs.findConfig( "test/configs/example.json" );

        test.equal( result.example, "test", "should find config at local path" );

        result = jscs.findConfig( process.cwd() + "/" + "test/configs/example.json" );
        test.equal( result.example, "test", "should find config at absolute path" );

        test.done();
    },

    getOptions: function( test ) {
        var options = jscs.getOptions({
            requireCurlyBraces: [ "if" ],
            config: "test.js"
        });

        test.ok( !options.config, "should remove task option" );
        test.ok( !jscs.getOptions({}), "should return false if empty object was passed" );

        test.done();
    }
}
