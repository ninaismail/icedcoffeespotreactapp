import ReactDOM from "react-dom";
import { CartProvider } from "react-use-cart";
import App from "./App";
import './index.css'
import { AuthContextProvider } from "./context/AuthContext";

const userString = localStorage.getItem('user');
const user = userString !== null && JSON.parse(userString);

ReactDOM.render(
  <AuthContextProvider>
  <CartProvider id={user.user_id}>
    <App/>
    </CartProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
