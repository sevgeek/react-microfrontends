const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

const packageDependencies = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 9002,
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:9002/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "CartModule",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/index.js",
      },
      shared: packageDependencies,
    }),
  ],
};
