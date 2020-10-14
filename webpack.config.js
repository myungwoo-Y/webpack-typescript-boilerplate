const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/ts/main.ts', './src/styles/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '../css/style.css' }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        inject: true,
        filename: path.join(__dirname, './dist/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [
          path.resolve(__dirname, 'src/ts')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/proposal-object-rest-spread']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
          "css-loader",  
          "sass-loader"   
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};