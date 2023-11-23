import ReactDOM from "react-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import './index.css'
import { AuthContextProvider } from "./context/AuthContext";

const user = JSON.stringify(localStorage.getItem('user'))

ReactDOM.render(
  <AuthContextProvider>
  <CartProvider id={user}>
    <App/>
    </CartProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
