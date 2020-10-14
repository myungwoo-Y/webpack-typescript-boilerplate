const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

const plugins = [
  new MiniCssExtractPlugin({ 
    filename: 'styles/[name].css' 
  }),
  new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      inject: true,
      filename: path.join(__dirname, './public/index.html')
  })
]

if (devMode) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
}


module.exports = {
  entry: ['@babel/polyfill', './src/ts/main.ts', './src/styles/main.scss'],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'js/bundle.js'
  },
  plugins,
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    publicPath: "/",
    host: "localhost",
    overlay: true,
    port: 8080,
    stats: "errors-only",
    historyApiFallback: true,
    watchContentBase: true,
  },
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