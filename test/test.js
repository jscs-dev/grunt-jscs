"use strict";

var grunt = require( "grunt" );

grunt.file.setBase( "test" );

exports.fail = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:fail" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/fail" ), result.stdout );

        test.done();
    });
};

exports.success = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:success" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/success" ), result.stdout );

        test.done();
    });
};

exports.exclude = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:exclude" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/exclude" ), result.stdout );

        test.done();
    });
};

exports.all = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/all" ), result.stdout );

        test.done();
    });
};

exports.config = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:config" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/config" ), result.stdout );

        test.done();
    });
};
