const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(
  commonConfiguration,
  {
    output: {
      publicPath: "/ConnorBurns1993.github.io/",
    },
  },
  {
    mode: "production",
    plugins: [new CleanWebpackPlugin()],
  }
);
