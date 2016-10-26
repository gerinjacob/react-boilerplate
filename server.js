const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const config = require('./webpack/dev.config.js');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

const root = `${__dirname}/public`;
app.use(express.static(root));
app.use(fallback('index.html', { root }));

const port = process.env.PORT;

app.listen(port, error => {
  if (error) throw error;
  console.log('Sample React App listening on port %s', port);
});
