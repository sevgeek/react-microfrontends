import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

/**
 * Функция монтирования приложения
 * в корневой DOM-элемент
 * @param {DOMElement} element Корневой элемент
 * @returns {void}
 */
function mount(element) {
  ReactDOM.render(<App />, element);
}

/* Если находимся в режиме разработки */
if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("root");

  if (root) mount(root);
}

export { mount };
