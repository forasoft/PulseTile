module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/sinon/pkg/sinon.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'karma.entry.js',
      // './src/app/rippleui/pages/**/*.js',
      // './src/app/index.js',
      './src/test/spec/**/*.js'
    ],

    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    },

    autoWatch: true,

    browsers: ['Chrome'],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

    // reporters: ['dots'],
    //
    // logLevel: config.LOG_INFO,
    //
    // autoWatch: true,
    //
    // singleRun: false,
    //
    // customLaunchers: {
    //   TRAVIS_CHROME: {
    //     base: 'Chrome',
    //     flags: ['--no-sandbox']
    //   }
    // },
    //
    // browsers: process.env.TRAVIS ? ['TRAVIS_CHROME'] : ['Chrome']
  });
};
