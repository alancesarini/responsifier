const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/responsifier.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'responsifier.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } }
              ]
            ]
          }
        }
      }
    ]
  }
}
