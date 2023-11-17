import ReactDOM from "react-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import './index.css'

ReactDOM.render(
    <CartProvider>
      <App/>
    </CartProvider>,
  document.getElementById("root")
);
