var path = require('path');
var ENTRY = path.resolve(__dirname, 'src/app/index.js');
var APP_DIR = path.resolve(__dirname, 'src/app/components');
var SCSS_DIR = path.resolve(__dirname, 'src/scss');

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
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
        },
        {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
    ]
  }
}
