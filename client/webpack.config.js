'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (function makeConfig() {
  const config = {};
  config.entry = __dirname + '/src/app/app.tsx';
  config.output = {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  };
  config.resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
  };

  config.devtool = 'eval-source-map';

  config.module = {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'awesome-typescript-loader' },
        exclude: /node_modules/
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('postcss-cssnext')(),
                  require('cssnano')(),
                  require('postcss-reporter')({ clearReportedMessages: true })
                ]
              }
            }
          ]
        })
      }
    ]
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/public/index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/public'
      }
    ]),
    new ExtractTextPlugin({ filename: 'css/[name].css' })
  ];

  config.devServer = {
    contentBase: './src/public',
    open: true,
    overlay: true,
    stats: 'minimal'
  };
  return config;
})();
