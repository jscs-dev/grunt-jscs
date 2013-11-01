# grunt-jscs-checker 
> Task for checking JavaScript Code Style with [jscs](https://github.com/mdevils/node-jscs).

[![Build Status](https://travis-ci.org/gustavohenke/grunt-jscs-checker.png?branch=master)](https://travis-ci.org/gustavohenke/grunt-jscs-checker)
[![Dependency Status](https://gemnasium.com/gustavohenke/grunt-jscs-checker.png)](https://gemnasium.com/gustavohenke/grunt-jscs-checker)
[![NPM version](https://badge.fury.io/js/grunt-jscs-checker.png)](http://badge.fury.io/js/grunt-jscs-checker)
[![Stories in Ready](https://badge.waffle.io/gustavohenke/grunt-jscs-checker.png?label=ready)](http://waffle.io/gustavohenke/grunt-jscs-checker)

## Getting started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jscs-checker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-jscs-checker");
```

## jscs task
_Run this task with the `grunt jscs` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### config
Type: `String`
Default: .jscs.json

The path to the jscs configuration file.


### Usage examples
```js
jscs: {
    main: [ "path/to/files/*.js" ],
    secondary: {
        options: {
            config: ".jscs-secondary.json",
        },
        files: {
            src: [ "path/to/more/files/**/*.js", "my-plugin.js" ]
        }
    }
}
```
