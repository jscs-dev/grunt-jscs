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

    "getConfig – error with empty object": function( test ) {
        hooker.hook( grunt, "fatal", {
            pre: function( message ) {
                test.equal( message, "Nor config file nor inline options weren't found" );

                test.done();
                return hooker.preempt();
            },

            once: true
        });

        try {
            new JSCS({});
        } catch( _ ) {}
    },

    "getConfig – error with incorrect config": function( test ) {
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

    "getConfig – with empty config": function( test ) {
        hooker.hook( grunt, "fatal", {
            pre: function( message ) {
                test.equal( message, "\"test/configs/empty.json\" config is empty" );

                test.done();
                return hooker.preempt();
            },

            once: true
        });

        try {
            new JSCS({
                config: "test/configs/empty.json"
            });
        } catch( _ ) {}
    },

    "getConfig – with inline options": function( test ) {
        var config = new JSCS({
            requireCurlyBraces: [ "if" ],
            config: "config",
            force: true,
            reporterOutput: "reporterOutput",
            reporter: ""
        }).getConfig();

        test.ok( !config.config, "config option should be removed" );
        test.ok( !config.force, "force option should be removed" );
        test.ok( !config.reporterOuput, "reporterOuput option should be removed" );
        test.ok( !config.reporter, "reporter option should be removed" );
        test.ok( !!config.requireCurlyBraces, "requireCurlyBraces should stay" );

        test.done();
    },

    "getConfig – merge inline and config options": function( test ) {
        var config = new JSCS({
            requireCurlyBraces: [ "if" ],
            config: "merge.json",
            disallowMultipleVarDecl: true
        }).getConfig();

        test.equal( config.requireCurlyBraces[ 0 ], "if",
            "inline option should rewrite config one" );
        test.ok( config.disallowMultipleVarDecl,
            "\"disallowMultipleVarDecl\" option should be present" );

        test.done();
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

    setErrors: function( test ) {
        var filteredErrors;

        errors.push( undefined );
        fixture.setErrors( errors );

        filteredErrors = fixture.getErrors();

        test.ok( filteredErrors.pop(), "should filter undefined values" );
        test.done();
    },

    count: function( test ) {
        fixture.setErrors( errors );

        test.equal( fixture.count(), 1, "should correctly count errors" );

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
            test.equal( jscs.setErrors( errors ).count(), 0,
                "should not find any errors in excluded file" );
            test.done();
        });
    },

    additional: function( test ) {
         var jscs = new JSCS({
            "additionalRules": [ "test/rules/*.js" ],
            "testAdditionalRules": true,
            config: "empty"
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
            jscs.setErrors( errorsCollection ).report();

            test.ok( grunt.file.exists( "test.xml" ), "test.xml should exist" );
            grunt.file.delete( "test.xml" );

            test.done();
        });
    },

    "Don't break on syntax error": function( test ) {
        hooker.hook( grunt, "warn", {
            pre: function( message ) {
                test.ok( message.toString().length, "error message should not be empty" );

                test.done();
                return hooker.preempt();
            },

            once: true
        });

        var jscs = new JSCS({
            "requireCurlyBraces": [ "while" ],
        });

        jscs.check( "test/fixtures/broken.js" );
    }
};
