import { Outlet, NavLink } from "react-router-dom";
import { useCart } from "react-use-cart";
import LoginButton from "../componenets/LoginButton";
import LogoutButton from "../componenets/LogoutButton";
import Profile from "../componenets/Profile";

export default function RootLayout() {

  const {totalItems} = useCart();

  return (
    <>
       <header className="flex justify-around items-center bg-[#d4846b] text-white p-4 mb-4">
        <NavLink to="/" className="font-bold text-lg hover:brightness-75">The Iced Coffee Spot</NavLink>
        <nav className="flex justify-between gap-4 text-md">
          <NavLink to="/mycart" className="relative">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
            <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div className="absolute -top-[4px] -right-[2px] flex justify-center items-center w-[20px] h-[20px] text-xs font-bold text-white bg-red-500 rounded-full">
          {totalItems}
          </div>
          </NavLink>
            <LoginButton />
            <LogoutButton />
            <Profile />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}