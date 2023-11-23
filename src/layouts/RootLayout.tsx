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
        <NavLink to="/" className="font-medium text-md hover:brightness-75 flex items-end">
          <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" width="64px" height="64px" className="max-w-[42px] max-h-[42px]" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M263.93,52.781V15.862h87.074V0H248.069v52.781H131.951v427.55h36.947v31.668h174.204v-31.668h36.947V52.781H263.93z M263.93,68.643h100.256v141.112c-3.738-1.474-6.552-4.029-9.958-7.126c-6.184-5.621-13.88-12.619-28.558-12.619 c-14.739,0-22.459,7.004-28.664,12.63c-5.429,4.924-9.351,8.482-17.889,8.482c-7.072,0-10.976-2.444-15.187-6.08V68.643z M147.813,68.643h100.256V193.19c-4.146-1.898-9.132-3.18-15.398-3.18c-14.697,0-22.39,7.01-28.573,12.643 c-5.396,4.916-9.295,8.469-17.77,8.469c-8.546,0-12.465-3.563-17.889-8.494c-4.959-4.509-10.901-9.893-20.627-11.852V68.643z M364.187,464.47H327.24v31.667h-142.48v-15.806h92.352v-15.862H147.813V207.24c3.737,1.474,6.551,4.03,9.958,7.126 c6.184,5.621,13.88,12.619,28.559,12.619c14.617,0,22.288-6.99,28.452-12.606c5.419-4.938,9.335-8.506,17.889-8.506 c8.545,0,12.464,3.563,17.889,8.494c6.184,5.621,13.88,12.619,28.558,12.619c14.66,0,22.359-6.983,28.546-12.594 c5.451-4.945,9.39-8.518,18.006-8.518c8.545,0,12.464,3.563,17.889,8.494c4.96,4.509,10.901,9.893,20.628,11.852V464.47z"></path> </g> </g> <g> <g> <path d="M247.303,243.811l-75.155,27.641l27.509,75.155l75.287-27.509L247.303,243.811z M192.487,280.872l45.396-16.696 l16.695,45.476l-45.475,16.616L192.487,280.872z"></path> </g> </g> <g> <g> <path d="M259.208,348.696l-32.416,70.146l70.02,32.419l32.416-70.013L259.208,348.696z M289.081,430.202l-41.242-19.096 l19.098-41.326l41.242,19.174L289.081,430.202z"></path> </g> </g> <g> <g> <polygon points="168.898,89.728 168.898,139.882 184.759,139.882 184.759,105.59 213.775,105.59 213.775,89.728 "></polygon> </g> </g> <g> <g> <rect x="287.672" y="258.623" width="21.112" height="15.862"></rect> </g> </g> <g> <g> <rect x="308.778" y="290.294" width="21.112" height="15.862"></rect> </g> </g> <g> <g> <rect x="319.342" y="248.07" width="21.112" height="15.862"></rect> </g> </g> <g> <g> <rect x="171.552" y="427.521" width="21.112" height="15.862"></rect> </g> </g> <g> <g> <rect x="192.659" y="395.86" width="21.112" height="15.862"></rect> </g> </g> <g> <g> <rect x="160.998" y="374.743" width="21.112" height="15.862"></rect> </g> </g> </g></svg>
          The Iced Coffee Spot
        </NavLink>
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