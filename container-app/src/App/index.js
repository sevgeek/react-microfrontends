import React from "react";

import ProductsApp from "../ProductsApp";
import CartApp from "../CartApp";

function App() {
  return (
    <React.Fragment>
      <h1>Container</h1>
      <ProductsApp />
      <CartApp />
    </React.Fragment>
  );
}

export default App;
