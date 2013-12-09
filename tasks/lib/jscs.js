"use stirct";

var Checker = require( "jscs/lib/checker" ),
    path = require( "path" ),
    utils = require( "util" );

exports.init = function( grunt ) {

    // Task specific options
    var taskOptions = [ "config", "reporter" ];

    /**
     * @see jQuery.isEmptyObject
     * @private
     */
    function isEmptyObject( obj ) {
      var name;

      for ( name in obj ) {
        return false;
      }

      return true;
    }

    /**
     * Default reporter
     * @private
     * @param {errorsCollection} errorsCollection
     */
    function defaultReporter( errorsCollection ) {
        errorsCollection.forEach(function( errors ) {
            if ( !errors.isEmpty() ) {
                errors.getErrorList().forEach(function( error ) {
                    grunt.log.writeln( errors.explainError( error, true ) );
                });
            }
        });
    }

    /**
     * Create new instance of jscs Checker module
     * @constructor
     * @param {Object} options
     * @return {JSCS}
     */
    function JSCS( options ) {
        this.checker = new Checker();

        this.checker.registerDefaultRules();
        this.checker.configure( this.getConfig( options ) );

        this._reporter = this.registerReporter( options.reporter );
    }

    /**
     * @see Checker#checkPath
     */
    JSCS.prototype.check = function( path ) {
        return this.checker.checkPath( path );
    }

    /**
     * Get config
     * @param {Object} options
     * @return {Object}
     */
    JSCS.prototype.getConfig = function( options ) {
        var config = options.config && this.findConfig( options.config ) ||
                this.getOptions( options );

        if ( !config ) {
            if ( options.config ) {
                grunt.fatal( "The config file \"" + options.config + "\" was not found" );

            } else {
                grunt.fatal( "Nor config file nor inline options was found" );
            }
        }

        return config;
    }

    /**
     * Read config file
     * @param {String} path
     * @return {Boolean|Object}
     */
    JSCS.prototype.findConfig = function( path ) {
        if ( !grunt.file.isPathAbsolute( path ) ) {

            // Prepend the cwd, as jscs does via CLI
            path = process.cwd() + "/" + path;
        }

        if ( grunt.file.exists( path ) ) {
            return grunt.file.readJSON( path );
        }

        return false;
    }

    /**
     * Get inline options
     * @param {Object} options
     * @return {Boolean|Object}
     */
    JSCS.prototype.getOptions = function( options ) {
        var _options = {};

        // Copy options to another object so this method would not be destructive
        for ( var option in options ) {

            // If to jscs would be given a grunt task option
            // that not defined in jscs it would throw
            if ( !~taskOptions.indexOf( option ) ) {
                _options[ option ] = options[ option ]
            }
        }

        return isEmptyObject( _options ) ? false : _options;
    }

    /**
     * Register reporter
     * @param {String} name - name or path to the reporter
     * @return {Reporter}
     */
    JSCS.prototype.registerReporter = function( name ) {
        if ( !name ) {
            return defaultReporter;
        }

        var module;

        try {
            module = require( "jscs/lib/reporters/" + name );
        } catch ( _ ) {
            try {
                module = require( path.resolve( process.cwd(), name ) );
            } catch ( _ ) {}
        }

        if ( module ) {
            return module;
        }

        grunt.fatal( "Reporter \"" + name + "\" does not exist" );
    },

    /**
     * Return reporter
     * @return {Reporter}
     */
    JSCS.prototype.getReporter = function() {
        return this._reporter;
    }

    /**
     * Count and return errors
     * @param {errorsCollection} errorsCollection
     * @return {Number}
     */
    JSCS.prototype.count = function( errorsCollection ) {
        var result = 0;

        errorsCollection.forEach(function( errors ) {
            result += errors.getErrorCount();
        });

        return result;
    }

    /**
     * Send errors to the reporter
     * @param {errorsCollection} errorsCollection
     * @return {JSCS}
     */
    JSCS.prototype.report = function( errorsCollection ) {
        this._result = this._reporter( errorsCollection );

        return this;
    }

    /**
     * Print number of found errors
     * @param {errorsCollection} errorsCollection
     * @return {JSCS}
     */
    JSCS.prototype.notify = function( errorsCollection ) {
        var errorCount = this.count( errorsCollection );

        if ( errorCount ) {
            grunt.log.error( errorCount + " code style errors found!" );

        } else {
            grunt.log.ok( errorsCollection.length + " files without code style errors." );
        }

        return this;
    }

    return JSCS;
}
