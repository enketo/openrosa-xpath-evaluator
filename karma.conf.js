/* eslint-env node */
module.exports = function(config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
  process.env.TZ = 'America/Phoenix';
  config.set({
    frameworks: [
      'mocha',
    ],
    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless',
    ],
    files: [
      'test/integration/**/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/integration/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: false,
    },
  });
};
