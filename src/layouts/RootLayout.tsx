import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
       <header className="flex justify-around items-center bg-[#d4846b] text-white p-4 mb-4">
        <NavLink to="/" className="font-bold text-lg hover:brightness-75">The Iced Coffee Spot</NavLink>
        <nav className="flex justify-between gap-4 text-md">
        <NavLink to="/mycart" className=" hover:brightness-75">My Cart</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}