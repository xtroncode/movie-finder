const { join, sep } = require('path');
const nodeExternals = require('webpack-node-externals');

const joinPath = p => join(__dirname, '..', p);


// All the paths needed across the config
const PATHS = {
      NODE_MODULES: joinPath('node_modules'),
      SRC: joinPath('src'),
      APP: joinPath(`src${sep}app`),
      CLIENT: joinPath(`src${sep}client`),
      SERVER: joinPath(`src${sep}server`),
      WEBPACK: joinPath('webpack'),
      PUBLIC: joinPath('public'),
      BUILD: joinPath('build')
}
// common webpack config for [ client, server][ dev, prod]
const commonConfig = {
      context: PATHS.SRC,
      resolve:{
              extensions:['.js','.css','.jsx','.json'],
              modules: [ PATHS.APP, PATHS.CLIENT, PATHS.SERVER, PATHS.NODE_MODULES ]
      }
}

// common webpack loaders for [ client, server][ dev, prod]
const commonLoaders = [
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: Object.assign(babelConfig(true), {
          cacheDirectory: true
        })
      }
    }
];

// common webpack config for [ client ][ dev, prod]
const clientCommon = Object.assign( {}, commonConfig, {
      name:'client',
      target:'web',
      devtool:'eval',
      output:{
          path: PATHS.PUBLIC,
          publicPath: '/assets/'
      },
      module:{
          rules:commonLoaders.concat([
            {
              
            }
          ])
      }
})

// common webpack config for [ server ][ dev, prod]
const serverCommon = Object.assign( {}, commonConfig, {

})

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
