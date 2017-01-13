var context = require.context('./src/test/spec', true, /\.spec\.js$/);
context.keys().forEach(context);
