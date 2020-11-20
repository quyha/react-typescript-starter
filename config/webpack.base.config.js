const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (_, argv) => {
    const isDev = argv.mode === 'development';

    const currentPath = path.join(__dirname, '..');
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + argv.mode;
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        entry: './src/index.tsx',
        output: {
            publicPath: '/',
            filename: '[name].[hash].js',
            environment: {
                arrowFunction: false,
                bigIntLiteral: false,
                const: false,
                destructuring: false,
                dynamicImport: false,
                forOf: false,
                module: false,
            },
        },
        devtool: isDev ? 'source-map' : false,
        devServer: {
            port: 9001,
            hot: true,
            open: true,
            watchContentBase: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js', '.scss' ],
            plugins: [ new TsconfigPathsPlugin({}) ],
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.(s[ac]ss|css)$/,
                    use: [
                        {
                            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: isDev ? '[name]_[local]_[hash:base64:8]' : '[hash:base64:8]',
                                    exportLocalsConvention: 'camelCaseOnly',
                                },
                                url: false,
                                sourceMap: isDev,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDev,
                            }
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: {
                        loader: 'file-loader',
                    }
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: {
                        loader: 'file-loader',
                    }
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/public/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/public/assets', to: './assets' }
                ]
            }),
            new webpack.DefinePlugin(envKeys),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: [
                        './src/**/*.{ts,tsx}',
                        './src/**/**/*.{ts,tsx}',
                        './src/**/**/**/*.{ts,tsx}',
                    ],
                    enabled: isDev,
                },
            }),
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
        ],
    }
};
