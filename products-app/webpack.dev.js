const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

const packageDependencies = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  devServer: {
    port: 9001,
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "auto",
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
      name: "ProductsModule",
      library: { type: "var", name: "ProductsModule" },
      filename: "remoteEntry.js",
      exposes: {
        "./Products": "./src/bootstrap.js",
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
