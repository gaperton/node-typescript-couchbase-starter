'use strict'

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin' );

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	context: path.resolve(__dirname, 'client'),

	entry: {
		client : ['./index.tsx']
	},

	output: {
		path: path.resolve(__dirname, 'htdocs'),
		filename: '[name].bundle.js'
	},

    mode : NODE_ENV || 'development',
	watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

	devtool: NODE_ENV === 'development' ? 'source-map' : null,

	module: {
		rules: [
            {
                // creates style nodes from JS strings
                test:/\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css',
                      options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                        context: path.resolve(process.cwd(), 'src'),
                        sourceMap: true
                      }
                    },
                    { loader: 'postcss', options: { sourceMap: true } }
                  ]
            },
            {
                test: /\.(tsx|jsx|ts|js)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
		]
	},

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin()
    ],

    resolve: {
	    modules: [
            path.join(__dirname, 'client'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      }
}

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            // don't show unreachable variables etc
            warnings:     false,
            drop_console: true,
            unsafe:       true
          }
        })
    );
}