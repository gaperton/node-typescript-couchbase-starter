'use strict'

const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin' );
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = ( env, argv ) => ({
	context: path.resolve(__dirname, '.'),

	entry: {
		index : ['./index.tsx']
	},

	output: {
		path: path.resolve(__dirname, '../www'),
		filename: '[name]-[chunkhash].bundle.js'
	},

    //mode : NODE_ENV || 'development',
	watch: argv.mode === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

	devtool: argv.mode === 'development' ? 'source-map' : false,

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
        new CleanWebpackPlugin(['../www'], { allowExternal : true }),
        new HtmlWebpackPlugin({
            title : 'Your app'
        })
    ],

    resolve: {
	    modules: [
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
});