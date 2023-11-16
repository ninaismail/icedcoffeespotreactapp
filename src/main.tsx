import ReactDOM from "react-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import './index.css'
import CartPage from "./cart";
ReactDOM.render(
  <CartProvider><App/><CartPage /></CartProvider>,
  document.getElementById("root")
);
