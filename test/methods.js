"use strict";

var grunt = require( "grunt" ),
    JSCS = require( "../tasks/lib/jscs" ).init( grunt ),

    proto = JSCS.prototype,

    hooker = require( "hooker" );

module.exports = {
    getConfig: function( test ) {
        var result,
            config = {
                config: "test/configs/example.json"
            };

        result = proto.getConfig( config );
        test.equal( result.example, "test", "should find config at local path" );

        config.config = process.cwd() + "/" + config.config;
        result = proto.getConfig( config );
        test.equal( result.example, "test", "should find config at absolute path" );

        config = {
            requireCurlyBraces: [ "if" ],
            config: "test.js"
        };

        result = proto.getConfig( config );

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

    "getConfig error with empty object": function( test ) {
        hooker.hook( grunt, "fatal", {
            pre: function( message ) {
                test.equal( message, "Nor config file nor inline options was found" );

                test.done();
                return hooker.preempt();
            },

            once: true
        });

        proto.getConfig({});
    },

    "getConfig error with incorrect config": function( test ) {
        hooker.hook( grunt, "fatal", {
            pre: function( message ) {
                test.equal( message, "The config file \"not-existed\" was not found" );

                test.done();
                return hooker.preempt();
            },

            once: true
        });

        proto.getConfig({
            config: "not-existed"
        });
    },

    findConfig: function( test ) {
        var result;

        result = proto.findConfig( "test/configs/example.json" );

        test.equal( result.example, "test", "should find config at local path" );

        result = proto.findConfig( process.cwd() + "/" + "test/configs/example.json" );
        test.equal( result.example, "test", "should find config at absolute path" );

        test.done();
    },

    getOptions: function( test ) {
        var options = proto.getOptions({
            requireCurlyBraces: [ "if" ],
            config: "test.js"
        });

        test.ok( !options.config, "should remove task option" );
        test.ok( !proto.getOptions({}), "should return false if empty object was passed" );

        test.done();
    },

    registerReporter: function( test ) {
        var jscs = new JSCS({
            requireCurlyBraces: [],
        });

        test.equal( typeof jscs.getReporter(), "function", "should register default reporter" );


        jscs = new JSCS({
            requireCurlyBraces: [],
            reporter: "checkstyle"
        });

        test.equal( typeof jscs.getReporter(), "function",
            "should register reporter from jscs package" );

        jscs = new JSCS({
            requireCurlyBraces: [],
            reporter: "test/test-reporter.js"
        });

        test.equal( jscs.getReporter()(), "test", "should register reporter as npm module" );

        test.done();
    }
};
