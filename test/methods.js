"use strict";

var fixture, errors,
    grunt = require( "grunt" ),
    JSCS = require( "../tasks/lib/jscs" ).init( grunt ),

    path = require( "path" ),

    hooker = require( "hooker" );

module.exports = {
    setUp: function( done ) {
        fixture = new JSCS({
            config: "test/configs/fail.json"
        });

        fixture.check( "test/fixtures/fixture.js" ).then(function( collection ) {
            fixture.setErrors( errors = collection );
            done();
        });
    },

    getConfig: function( test ) {
        var jscs;

        try {
            new JSCS({
                config: "test/configs/example.json"
            });
        } catch ( error ) {
            test.equal( error.toString(), "Error: Unsupported rules: example",
                "should find config at local path" );
        }

        try {
            new JSCS({
                config: path.resolve( process.cwd(), "test/configs/example.json" )
            });
        } catch ( error ) {
            test.equal( error.toString(), "Error: Unsupported rules: example",
                "should find config at absolute path" );
        }

        jscs = new JSCS({
            requireCurlyBraces: [ "if" ],
        }).getConfig();

        test.ok( Array.isArray( jscs.requireCurlyBraces ),
                "\"requireCurlyBraces\" option should have been preserved" );

        jscs = new JSCS({
            requireCurlyBraces: [ "if" ],
        }).getConfig();

        test.ok( !jscs.config, "config option should have been removed" );
        test.ok( Array.isArray( jscs.requireCurlyBraces ),
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

        try {
            new JSCS({});
        } catch( _ ) {}
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

        try {
            new JSCS({
                config: "not-existed"
            });
        } catch( _ ) {}
    },

    findConfig: function( test ) {
        var jscs;

        try {
            jscs = new JSCS({
                config: "test/configs/example.json"
            });
        } catch ( error ) {
            test.equal( error.toString(), "Error: Unsupported rules: example",
                "should find config at local path" );
        }

        try {
            jscs = new JSCS({
                config: path.resolve( process.cwd(), "test/configs/example.json" )
            });
        } catch ( error ) {
            test.equal( error.toString(), "Error: Unsupported rules: example",
                "should find config at absolute path"  );
        }

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
    },

    count: function( test ) {
        test.equal( fixture.count( errors ), 1, "should correctly count errors" );

        test.done();
    },

    report: function( test ) {
        hooker.hook( grunt.log, "writeln", {
            pre: function( message ) {
                test.ok( message, "Reporter report something" );
                test.done();

                return hooker.preempt();
            },

            once: true
        });

        fixture.report();
    },

    notify: function( test ) {
        hooker.hook( grunt.log, "error", {
            pre: function( message ) {
                test.ok( message, "1 code style errors found!" );
                test.done();

                return hooker.preempt();
            },

            once: true
        });

        fixture.notify();
    },

    excludes: function( test ) {
        var jscs = new JSCS({
            "requireCurlyBraces": [ "while" ],
            "excludeFiles": [ "test/fixtures/exclude.js" ]
        });

        jscs.check( "test/fixtures/exclude.js" ).then(function( errors ) {
            test.equal( jscs.count( errors ), 0, "should not find any errors in excluded file" );
            test.done();
        });
    },

    additional: function( test ) {
         var jscs = new JSCS({
            "additionalRules": [ "test/rules/*.js" ],
            "testAdditionalRules": true
        });

        jscs.check( "test/fixtures/fixture.js" ).then(function( errorsCollection ) {
            errorsCollection.forEach(function( errors ) {
                errors.getErrorList().forEach(function( error ) {
                    test.equal( error.message, "test", "should add additional rule");
                });
                test.done();
            });
        });
    },

    reporterOutput: function( test ) {
        var jscs = new JSCS({
            "requireCurlyBraces": [ "while" ],
            reporter: "checkstyle",
            reporterOutput: "test.xml"
        });

        jscs.check( "test/fixtures/fixture.js" ).then(function( errorsCollection ) {
            jscs.report( errorsCollection );

            test.ok( grunt.file.exists( "test.xml" ), "test.xml should exist" );
            grunt.file.delete( "test.xml" );

            test.done();
        });
    }
};
