const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

const packageDependencies = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "products.bundle.[contenthash].js",
    publicPath: "http://localhost:9001/",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
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
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: "products.style.[name].[contenthash].css",
    }),
    new ModuleFederationPlugin({
      name: "ProductsModule",
      filename: "remoteEntry.js",
      exposes: {
        "./Products": "./src/index.js",
      },
      shared: packageDependencies,
    }),
  ],
};
