// Karma configuration

module.exports = function( config ) {

    // Force timezone without DST for tests, so that datetime conversion results are predictable
    process.env.TZ = 'America/Phoenix'; //UTC-07:00

    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'mocha', 'chai' ],

        // list of files / patterns to load in the browser
        files: [ {
            pattern: 'test/**/*.spec.js',
            included: true
        }, {
            pattern: 'dist/**/*.js',
            included: false
        }, {
            pattern: 'test/**/*.xml',
            watched: true,
            served: true,
            included: false
        }, {
            pattern: 'test/helpers.js',
            included: false
        }, {
            pattern: 'test/docwin.js',
            included: false
        } ],


        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.spec.js': [ 'rollup' ],
        },

        rollupPreprocessor: {
            output: {
                format: 'iife',
                name: 'test'
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'progress' ],


        // web server port
        port: 9877,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    } );
};
