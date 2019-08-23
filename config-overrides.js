const { override, addBabelPlugins, disableEsLint } = require('customize-cra');

module.exports = override(...addBabelPlugins('babel-plugin-styled-components'), disableEsLint());
