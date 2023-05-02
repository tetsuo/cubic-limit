const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const config = {
  entry: './src/index.ts',
  output: {
    filename: './bundle.js',
    path: __dirname + '/public',
    library: 'cubiclimit',
    libraryTarget: 'window',
    libraryExport: 'default',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { silent: true },
      },
    ],
  },
  performance: {
    hints: false,
  },
}

if (process.env.NODE_ENV === 'production') {
  config.output.filename = './bundle.min.js'
  config.mode = 'production'
  config.devtool = false
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  }
} else {
  config.mode = 'development'
  config.devtool = 'source-map'
}

module.exports = config
