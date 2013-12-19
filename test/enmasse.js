"use strict";

var grunt = require( "grunt" ),
    read = function( file, options ) {
        var contents = grunt.file.read( file, options );
        return contents.split( "\r\n" ).join( "\n" );
    };

grunt.file.setBase( "test/enmasse" );

exports.fail = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:fail" ]
    }, function( error, result ) {
        test.equal( read( "expectations/fail" ), result.stdout );

        test.done();
    });
};

exports.force = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:force" ]
    }, function( error, result ) {
        test.equal( read( "expectations/force" ), result.stdout );

        test.done();
    });
};

exports.success = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:success" ]
    }, function( error, result ) {
        test.equal( read( "expectations/success" ), result.stdout );

        test.done();
    });
};

exports.all = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs" ]
    }, function( error, result ) {
        test.equal( read( "expectations/all" ), result.stdout );

        test.done();
    });
};

exports.config = function( test ) {
    grunt.util.spawn({
        cmd: "grunt",
        args: [ "jscs:config" ]
    }, function( error, result ) {
        test.equal( read( "expectations/config" ), result.stdout );

        test.done();
    });
};
