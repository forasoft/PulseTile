// import angular from 'angular';
// import mocks from 'angular-mocks';
//
// import './src/index';

let context = require.context('./src', true, /\.spec\.js/);
context.keys().forEach(context);