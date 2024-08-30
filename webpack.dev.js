const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const config = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
});

module.exports = config;
