/*jshint node:true*/
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      dist: {
        src: [
            'dist'
        ]
      }
    },

    browserify: {
      dist: {
        files: {
            'dist/openrosa-xpath-bundle.js': [ 'src/XPathJS.js' ]
        },
      },
    },

    karma: {
      options: {
        singleRun: true,
        reporters: ['dots'],
        configFile: 'test/karma.conf.js',
        customLaunchers: {
          ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: [ '--no-sandbox' ]
          }
        },
      },
      headless: {
        browsers: ['ChromeHeadlessNoSandbox']
      },
      browsers: {
        browsers: ['Chrome' , 'Firefox', 'Safari', 'Opera' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('dist', [
    'clean:dist',
    'browserify:dist'
  ]);

  grunt.registerTask('test-dev', ['dist', 'karma:headless']);
  grunt.registerTask('test-browsers-dev', ['dist', 'karma:browsers']);
};
