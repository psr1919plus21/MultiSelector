var path = require('path');
var ENTRY = path.resolve(__dirname, 'src/app/index.js');
var APP_DIR = path.resolve(__dirname, 'src/app/components');

module.exports = {
  entry: ENTRY,
  output: {
    filename:'./dist/multiselecter.js'
  },
  watch: true,
  module: {
    loaders: [
        {
            test: /\.js?/,
            include: APP_DIR,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
        }
    ]
  }
}
