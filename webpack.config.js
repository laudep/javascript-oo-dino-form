const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [],
};
