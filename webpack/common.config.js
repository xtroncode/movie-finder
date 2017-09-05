const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

var commonLoaders = [
    {
      test: /\.json$/,
      loader: 'json-loader'
    }
];

module.exports = [
    {
        entry : path.resolve(__dirname, '../src/server/server.js'),
        output:{
            path:path.resolve(__dirname, '../dist'),
            filename: '[name].js'
        },
        target:'node',
        node: {
            __dirname: false,
        },
        module: {
            loaders: [
              {
                test: /\.js$/,
                loader: 'babel-loader'
              }
            ].concat(commonLoaders)
          }
    },
    {
        entry:path.resolve(__dirname, '../src/client/index.js'),
        output:{
            path:path.resolve(__dirname, '../dist/assets'),
            publicPath:'/',
            filename: 'bundle.js',
        },
        target:'web',
        module: {
            loaders: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
              }
            ]
          },
          resolve: {
            extensions: ['.js', '.jsx']
          }

    }
];
