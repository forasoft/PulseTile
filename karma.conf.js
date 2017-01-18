module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    // frameworks: ['mocha', 'chai', 'jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/angular-mocks/angular-mocks.js',
      // 'karma.entry.js',
      'src/app/rippleui/**/**/*.js',
      'src/test/spec/pages/**/*.spec.js'
    ],

    preprocessors: {
      'src/app/rippleui/**/**/*.js': ['webpack', 'coverage'],
      'src/test/spec/pages/**/*.spec.js': ['webpack']
      // 'karma.entry.js': ['webpack']
    },

    webpack: require('./webpack.config'),

    browserify: {
      debug: true,
      transform: ['babelify', 'stringify']
    },

    webpackServer: {
      noInfo: true
    },
    autoWatch: true,

    browsers: ['Chrome'],

    junitReporter: {
      outputFile: 'tests/units.html',
      suite: 'unit'
    },

    // reporters: [ 'html', 'spec', 'coverage'],
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      // check: {
      //   global: {
      //     statements: 11,
      //     branches: 0,
      //     functions: 0,
      //     lines: 11
      //   }
      // },
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}]

    },

    webpackMiddleware: {
      noInfo: true
    },

    htmlReporter: {
      outputFile: 'tests/units.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },

    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
  },

    customDebugFile: 'tests/units.html',

    logLevel: config.LOG_INFO,

    singleRun: false,

    customLaunchers: {
      TRAVIS_CHROME: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
