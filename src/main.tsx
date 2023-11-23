import ReactDOM from "react-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import './index.css'
import Cookie from 'cookie-universal';

const cookie = Cookie();
const userId = cookie.get('user')
ReactDOM.render(
  <CartProvider id={userId}>
    <App/>
  </CartProvider>,
  document.getElementById("root")
);
