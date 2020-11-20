const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        keep_fnames: true,
                    },
                },
            }),
            new CompressionPlugin({
                test: /\.(css|js|html|svg)$/,
            }),
        ],
        splitChunks: { chunks: 'all' }
    }
};
