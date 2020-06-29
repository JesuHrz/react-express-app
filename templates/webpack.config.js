const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
  const plugins = [ new MiniCssExtractPlugin('css/style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    })
  ]

  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'js/bundle.js'
    },
    devServer: {
      publicPath: '/dist',
      host: '0.0.0.0',
      port: 9000,
      historyApiFallback: true
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
              'plugins': [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-import-meta',
                ['@babel/plugin-proposal-class-properties', { 'loose': false }],
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
    plugins
  }
}
