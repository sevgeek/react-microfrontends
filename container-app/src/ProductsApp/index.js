import React from "react";
import { mount } from "ProductsModule/Products";

function ProductsApp() {
  const root = React.useRef(undefined);

  React.useEffect(() => {
    if (root) {
      mount(root.current);
    }
  });

  return <div ref={root} id="products-root"></div>;
};

export default ProductsApp;