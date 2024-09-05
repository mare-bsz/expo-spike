import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve('dist'),
    },
    port: 4200,
    proxy: [
      {
        context: ['/sbspike'],
        target: 'https://expotest.bsz-bw.de',
        changeOrigin: true,
      },
      {
        context: ['/kc'],
        target: 'https://authtest.bsz-bw.de',
        changeOrigin: true,
        pathRewrite: { '^/kc': '' },
      },
    ],
  },
};
