module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/lodash/lodash.js',
      'node_modules/chai/chai.js',
      'src/**/*.js',
      'test/*.spec.js',
      'test/integration/*.spec.js',
      'test/integration/openrosa-xpath/*.spec.js',
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    // browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    singleRun: false,
    concurrency: Infinity
  })
}
