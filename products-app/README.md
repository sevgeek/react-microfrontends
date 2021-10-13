# ReactJS Environment

## 1. Начальная установка

1.1 Инициализация каталога

```bash
npm init -y
```

2.1 Установка ReactJS

```bash
npm install react react-dom
```

## 2. Создание файлов проекта

2.1 Создание каталога `./public` и файла `./public/index.html` со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

2.2 Создание каталога `./src` и файла `./src/index.js` со следующим содержимым:

```javascript
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return <h1>Header</h1>;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

## 3. Настройка Webpack

3.1 Установка основных модулей

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
```

3.2 Установка дополнительных модулей/лоадеров/плагинов:

Компилятор Babel:

```bash
npm install --save-dev babel-env babel-loader babel-preset-react @babel/core @babel/preset-react @babel/plugin-proposal-class-properties
```

Работа с CSS:

```bash
npm install --save-dev css-loader style-loader
```

Плагины:

```bash
npm install --save-dev html-webpack-plugin mini-css-extract-plugin terser-webpack-plugin clean-webpack-plugin
```

3.2 Создание конфигурационного файла `./webpack.config.js` со следующим содержимым:

```javascript
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
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
  ],
};
```

## 4. Настройка Babel

4.1 Создание конфигурационного файла Babel `./babel.config.json` со следующим содержимым:

```json
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

## 5. Добавление NPM-скриптов

Добавление следующих скриптов в файл `package.json`:

```json
  "scripts": {
    "start": "webpack serve",
    "build": "webpack build",
  },
```
