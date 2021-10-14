import React from "react";
import { mount } from "CartModule/Cart";

function CartApp() {
  const root = React.useRef(undefined);

  React.useEffect(() => {
    if (root) {
      mount(root.current);
    }
  });

  return <div ref={root} id="cart-root"></div>;
}

export default CartApp;
