# grunt-jscs-checker
> Task for checking JavaScript Code Style with [jscs](https://github.com/mdevils/node-jscs).

[![Build Status](https://travis-ci.org/gustavohenke/grunt-jscs-checker.png?branch=master)](https://travis-ci.org/gustavohenke/grunt-jscs-checker)
[![Dependency Status](https://gemnasium.com/gustavohenke/grunt-jscs-checker.png)](https://gemnasium.com/gustavohenke/grunt-jscs-checker)
[![NPM version](https://badge.fury.io/js/grunt-jscs-checker.png)](http://badge.fury.io/js/grunt-jscs-checker)

## Getting started
This plugin requires Grunt `~0.4.2`

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
Any specified option will be passed through directly to JSCS, plust this plugin has additional options:

#### config
Type: `String`
Default value: `.jscs.json`

The path to the jscs configuration file.

*If both jscs settings and config option are specified, then they will merge together –*
```js
jscs: {
    src: "path/to/files/*.js",
    options: {
        config: ".jscs.json",
        requireCurlyBraces: [ "if" ]
    }
}
```

#### force
Type: `Boolean`
Default value: `false`

Set `force` to `true` to report JSCS errors but not fail the task.

#### reporter
Type: `String`
Default value: `null`

Allows you to modify the output. By default it will use a built-in `grunt` reporter. Set the path to your own custom reporter or to one of the built-in JSCS [reporters](https://github.com/mdevils/node-jscs/tree/dc174f19531cf32e835979b84be6e15f5592aad6/lib/reporters).

#### reporterOutput
Type: `String`
Default value: `null`

Specify a filepath to output the results of a reporter. If `reporterOutput` is specified then all output will be written to the given filepath instead of printed to stdout.

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
    },
    ternary: {
        options: {
            requireCurlyBraces: [ "if" ]
        },
        files: {
            src: "happy-hippo.js"
        }
    }
}
```
