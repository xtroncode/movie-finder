const { clientCommon, PATHS } = require('./common.config');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const clientConfig = Object.assign({},clientCommon,{
    entry: {
        app:PATHS.CLIENT,
        vendor:['react','react-dom']
    },
    output: Object.assign({},clientCommon.output,{
        filename:'[name].js',
        chunkFilename: "[name].js"
    }),
    devServer: {
		contentBase: clientCommon.output.path,
		compress: true,
		port: 8081,
		color: true,
		disableHostCheck: true,
		host: "0.0.0.0",
		hot: true,
		noInfo: true,
		overlay: true
	},
    plugins: [
        new CleanWebpackPlugin([ PATHS.PUBLIC, PATHS.BUILD],{ root: PATHS.ROOT}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
            minChunks: m => m.context &&
            m.context.includes('node_modules'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),        

        new webpack.DefinePlugin({
			__DEV__: true,
			__PROD__: false,
			__SERVER__: false,
			__CLIENT__: true,
			"process.env.NODE_ENV": JSON.stringify("development")
		})
      ]
});


module.exports = clientConfig;