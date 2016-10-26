const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client',
      './src/client.js'
    ]
  },
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        APIHOST: '"localhost"',
        APIPORT: '"2001"'
      },

      __DEVELOPMENT__: true
    })
  ],
  progress: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['react', 'es2015', 'stage-2', 'react-hmre']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules&sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=image/svg+xml'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
