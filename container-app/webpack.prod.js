const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

const packageDependencies = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "container.[name].[contenthash].js",
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
        options: {
          presets: ["@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.(scss|css)/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCSSExtractPlugin({
      filename: "container.[name].[contenthash].css",
    }),
    new ModuleFederationPlugin({
      remotes: {
        ProductsModule: "ProductsModule@http://localhost:9001/remoteEntry.js",
        CartModule: "CartModule@http://localhost:9002/remoteEntry.js",
      },
      shared: {
        react: {
          version: packageDependencies.react,
          singleton: true,
        },
        "react-dom": {
          version: packageDependencies["react-dom"],
          singleton: true,
        },
      },
    }),
  ],
};
