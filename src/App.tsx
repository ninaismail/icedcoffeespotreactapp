import {
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import IcedCoffeeList from "./componenets/IcedCoffeeList"
import RootLayout from './layouts/RootLayout';
import CartPage from './cart';
import CheckoutPage from './checkout';
import Profile from './profile';
import Register from './register';
import Login from './login';

const router = createBrowserRouter(
  createRoutesFromElements(
    // route / is wrapping the other routes because we want them to start with /, we can also do nested routes by making another layout with new navlinks
    <Route path="/" element={<RootLayout />}>
      <Route index element={<IcedCoffeeList />} />
      <Route path='mycart' element={<CartPage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='profile' element={<Profile />} />
    </Route>
  )
)
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
