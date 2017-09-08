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
      exclude: /node_modules/,
      loader: 'json-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: Object.assign({}, {
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
              test: /\.css$/,
              use:[
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    localIdentName:"[name]__[local]--[hash:base64:5]"
                  }
                }
              ]
            }
          ])
      }
})

// common webpack config for [ server ][ dev, prod]
const serverCommon = Object.assign( {}, commonConfig, {
      target:'node',
      name:'server',
      externals:nodeExternals(),
      output:{
        path: PATHS.BUILD
      },
      node:{
        __dirname:true
      },
      module:{
        rules:commonLoaders.concat([
          {
            test: /\.css$/,
						use:[
              {
                loader: "css-loader/locals",
                options: {
                  modules: true,
                  localIdentName: "[name]__[local]--[hash:base64:5]"
                }
              }
            ]
					}
        ])
      }
})
module.exports = { clientCommon, serverCommon, PATHS }