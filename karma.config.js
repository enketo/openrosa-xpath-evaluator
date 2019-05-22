module.exports = function(config) {
  process.env.TZ = 'America/Phoenix';
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/lodash/lodash.js',
      'node_modules/chai/chai.js',
      'src/**/*.js',
      'test/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    // browsers: ['ChromeHeadless', 'FirefoxHeadless', 'Opera'],
    singleRun: false,
    concurrency: Infinity
  })
}
