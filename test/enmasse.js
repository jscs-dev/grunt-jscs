"use strict";

var grunt = require( "grunt" );

grunt.file.setBase( "test/enmasse" );

exports.fail = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:fail" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/fail" ), result.stdout );

        test.done();
    });
};

exports.broken = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:broken" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/broken" ), result.stdout );

        test.done();
    });
};

exports.force = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:force" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/force" ), result.stdout );

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

exports.all = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs" ]
    }, function( error, result ) {
        test.equal( grunt.file.read( "expectations/all" ), result.stdout );

        test.done();
    });
};
