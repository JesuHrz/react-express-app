'use strict'

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = env => {
  const minimizer = []
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    })
  ]

  if (env.NODE_ENV === 'production') {
    plugins.push(new CleanWebpackPlugin())
    minimizer.push(new TerserJSPlugin({}))
    minimizer.push(new OptimizeCSSAssetsPlugin({}))
  }

  return {
    mode: env.NODE_ENV,
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'js/bundle.js'
    },
    devServer: {
      publicPath: '/dist',
      host: '0.0.0.0',
      port: 8080,
      historyApiFallback: true
    },
    resolve: {
      alias: {
        pages: path.resolve(__dirname, 'src/pages'),
        components: path.resolve(__dirname, 'src/components'),
        actions: path.resolve(__dirname, 'src/actions'),
        lib: path.resolve(__dirname, 'src/lib'),
        assets: path.resolve(__dirname, 'assets')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-import-meta',
                ['@babel/plugin-proposal-class-properties', { loose: false }],
                '@babel/plugin-proposal-json-strings',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '../../assets/images/[name].[ext]'
            }
          }
        },
        {
          test: /\.(woff|eot|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '../../assets/fonts/[name].[ext]'
            }
          }
        }
      ]
    },
    optimization: {
      minimizer
    },
    plugins: [...plugins, new HtmlWebpackPlugin({ template: './index.html' })]
  }
}
