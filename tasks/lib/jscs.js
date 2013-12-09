exports.init = function( grunt ) {

    // Task specific options
    var taskOptions = [ "config" ];

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
     * Get config
     * @param {Object} options
     * @return {Object}
     */
    exports.getConfig = function( options ) {
        var config = options.config && this.findConfig( options.config ) ||
                this.getOptions( options );

        if ( !config ) {
            if ( options.config ) {
                grunt.fail.fatal( "The config file " + options.config + " was not found" );

            } else {
                grunt.fail.fatal( "Nor config file nor inline options was found" );
            }
        }

        return config;
    }

    /**
     * Read config file
     * @param {String} path
     * @return {Boolean|Object}
     */
    exports.findConfig = function( path ) {
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
    exports.getOptions = function( options ) {
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

    return exports;
}
