const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  mode: "development",
  entry: "./src/js/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    // writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src",
          globOptions: {
            dot: true,
            ignore: ["**/*.js", "/js", "**/*.html"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "head",
    }),
    new ScriptExtHtmlWebpackPlugin({
      defer: "bundle.js",
    }),
  ],
};
