const { clientCommon, PATHS } = require('./common.config');

const clientConfig = Object.assign({},clientCommon,{
    entry: PATHS.CLIENT,
    output: Object.assign({},clientCommon.output,{
        filename:'[name].js',
    })
});


module.exports = clientConfig;