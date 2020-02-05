const { override,
    fixBabelImports,
    addLessLoader,
    disableEsLint,
    addBabelPlugin,
    addDecoratorsLegacy,
    babelInclude } = require('customize-cra');
const path = require('path');
const addOutPut = () => config => {
    let output = {
        path: path.resolve(__dirname, 'build')
    }
    config.output = output;
    return config
}
module.exports = override(
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#000' },
    }),
    // addBabelPlugin(["@babel/plugin-proposal-decorators", { "legacy": true }]),
    // babelInclude([path.resolve("babel-polyfill")]),
    addDecoratorsLegacy(),
    // addOutPut()
);