const path = require('path');

module.exports = () => {
  return {
    entry: path.resolve(__dirname, './client/index.jsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss']
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }]
    },
    devServer: {
      publicPath: '/build',
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
        },
      }
    },
  }
}