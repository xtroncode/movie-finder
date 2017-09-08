const { serverCommon, PATHS } = require('./common.config');

const serverConfig = Object.assign({}, serverCommon,{
    entry: PATHS.SERVER,
    output:Object.assign({},serverCommon.output,{
        filename:'[name].js',
        libraryTarget:'commonjs2'
    })
});

module.exports = serverConfig;