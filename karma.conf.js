/* eslint-env node */
module.exports = function(config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  process.env.TZ = 'America/Phoenix';
  config.set({
    frameworks: [
      'mocha'
    ],
    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless',
    ],
    files: [
      'node_modules/chai/chai.js',
      'node_modules/lodash/lodash.js',
      'src/**/*.js',
      'test/integration/**/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/helpers.js': ['webpack'],
      'test/integration/**/*.spec.js': ['webpack'],
    },
    reporters: [
      'mocha',
      'coverage'
    ],
    webpack: require('./webpack.test.config.js'),
    webpackMiddleware: {
      watchOptions: { poll: 100 }
    },
    coverageReporter: {
      type: 'lcov',
      subdir: '.'
    },
  });
};
