const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/admin/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'private/js/admin'),
    //sourceMapFilename: '[name].js.map',
  },
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    alias: {
      markjs: 'mark.js/dist/jquery.mark.js',
    },
  },
  watch: true,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new BundleAnalyzerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
