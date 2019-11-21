const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.join(__dirname, '/styles'),
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
      test: /\.(jp?g|gif|png|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
        ]
      }
    ]
  },
  plugins: [htmlPlugin],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  }
};
