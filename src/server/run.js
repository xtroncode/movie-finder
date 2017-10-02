const express = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const clientConfigDev = require('../../webpack/client.dev');
const serverConfigDev = require('../../webpack/server.dev')
const compiler = webpack([clientConfigDev, serverConfigDev]);
const clientCompiler = compiler.compilers[0]

const server = express();

let isBuilt = false;

const done = () =>
	!isBuilt &&
	server.listen(3000, () => {
		isBuilt = true
		// eslint-disable-next-line no-console
		console.log(
			"Build complete -- Listening @ localhost:",
			3000,
			"\nNODE_ENV: ",
			process.env.NODE_ENV
		)
	})
if (process.env.NODE_ENV === "development") {
    console.log("inside dev") // eslint-disable-line no-console
    server.use(webpackDevMiddleware(compiler, {
        publicPath: clientConfigDev.output.publicPath
    }));
    server.use(webpackHotMiddleware(clientCompiler))
    server.use(webpackHotServerMiddleware(compiler))
    compiler.plugin('done',done);
}