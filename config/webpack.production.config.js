const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const optimizationConfig = require('./webpack.optimization.config');

const productionConfiguration = function () {
    return {
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                noSources: true,
            })
        ]
    };
};

module.exports = (_, argv) => merge(baseConfig(_, argv), optimizationConfig, productionConfiguration());
