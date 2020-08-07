const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app.js",
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [],
};
