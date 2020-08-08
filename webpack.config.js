const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
  },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         exclude: /(node_modules)/,
  //         use: {
  //           loader: "babel-loader",
  //           options: {
  //             presets: ["@babel/preset-env"],
  //           },
  //         },
  //       },
  //     ],
  //   },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src",
          globOptions: {
            dot: true,
            // gitignore: true,
            ignore: ["**/*.js"],
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
